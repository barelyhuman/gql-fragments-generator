const {mkdirSync, writeFileSync} = require('fs')
const {join} = require('path')
const del = require('del')

const {cleanName} = require('./lib/clean-name')
const {readSchema} = require('./lib/read-schema')
const {toTitleCase} = require('./lib/to-title-case')
const {format} = require('./lib/format')

const {genericGraphQLTypes} = require('./constants')
const {checkNestedDefinitions} = require('./lib/check-nested')

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

			if (typeDefintion.astNode.kind === 'InputObjectTypeDefinition') return

			let scalarFields = Object.keys(typeDefintion._fields)
			const toRemove = []
			scalarFields.forEach((field, index) => {
				const fields = typeDefintion._fields

				if (checkNestedDefinitions(fields[field])) {
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
