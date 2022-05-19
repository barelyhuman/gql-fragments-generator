const {readFileSync} = require('fs')
const {buildSchema, Source} = require('graphql')

function readSchema(schemaFile) {
	const typeDef = readFileSync(schemaFile, 'utf-8')
	const source = new Source(typeDef)
	return buildSchema(source)
}

module.exports = {
	readSchema,
}
