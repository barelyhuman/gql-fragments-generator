#!/usr/bin/env node
const program = require('commander')

const {generateFragments} = require('./generate-fragments')

/**
 * Returns a parsed GrapqhlSchema definition from the given file path
 * @param {string} schemaFilePath
 * @returns
 */

function cli() {
	program
		.option('--schema [value]', 'path of your graphql schema')
		.option('--out [value]', 'folder to store the generated fragments in')
		.option('--clean', 'create a clean build')
		.parse()

	const {schema, out, clean} = program.opts()

	generateFragments({schema, out, clean})
}

cli()
