const {mkdirSync, writeFileSync} = require('fs')
const {join} = require('path')
const del = require('del')

const {cleanName} = require('./lib/clean-name')
const {readSchema} = require('./lib/read-schema')
const {toTitleCase} = require('./lib/to-title-case')
const {format} = require('./lib/format')

const {definitionTypesToIgnore, genericGraphQLTypes} = require('./constants')

function generateFragments({schema, out, clean} = {}) {
	const gqlSchema = readSchema(schema)

	const userScalars = Object.keys(gqlSchema.getTypeMap()).filter(
		x => genericGraphQLTypes.indexOf(x) === -1,
	)

	const fragmentStrings = userScalars
		.map(scalar => {
			if (!gqlSchema.getType(scalar)) {
				return
			}
			const typeDefintion = gqlSchema.getType(scalar)
			const fragmentName = toTitleCase(cleanName(scalar))

			if (!typeDefintion._fields) {
				return
			}

			let scalarFields = Object.keys(typeDefintion._fields)
			const toRemove = []
			scalarFields.forEach((field, index) => {
				const fields = typeDefintion._fields

				if (
					fields[field].type &&
					fields[field].type.astNode &&
					definitionTypesToIgnore.indexOf(fields[field].type.astNode.kind) > -1
				) {
					toRemove.push(index)
				}

				if (
					fields[field].type.ofType &&
					fields[field].type.ofType.astNode &&
					definitionTypesToIgnore.indexOf(
						fields[field].type.ofType.astNode.kind,
					) > -1
				) {
					toRemove.push(index)
				}

				if (
					fields[field].type.ofType &&
					fields[field].type.ofType.ofType &&
					fields[field].type.ofType.ofType.astNode &&
					definitionTypesToIgnore.indexOf(
						fields[field].type.ofType.ofType.astNode.kind,
					) > -1
				) {
					toRemove.push(index)
				}
			})

			const filteredScalarFields = scalarFields.filter(
				(_, i) => toRemove.indexOf(i) == -1,
			)

			if (filteredScalarFields.length === 0) {
				return null
			}

			return {
				name: fragmentName,
				fragment: `
fragment ${fragmentName}Fields on ${fragmentName}
{
	${filteredScalarFields.sort((a, b) => a.length - b.length).join('\n')}
}`,
			}
		})
		.filter(x => x)

	const outFile = join(out, 'fragments.gql')

	if (clean) {
		del.sync(outFile)
	}

	const framentOutput = format(
		fragmentStrings.map(x => x.fragment).join('\n\n'),
	)

	mkdirSync(out, {recursive: true})
	writeFileSync(outFile, framentOutput)
}

module.exports = {
	generateFragments,
}
