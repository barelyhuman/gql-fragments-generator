#!/usr/bin/env node
const program = require('commander')
const {readFileSync} = require('fs')

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
		.option('--ignore [value]', 'path to csv containing types to be ignored')
		.option('--clean', 'create a clean build')
		.parse()

	const {schema, out, clean, ignore} = program.opts()

	let ignoreList = []

	if (ignore) {
		const fileData = readFileSync(ignore, 'utf-8')

		fileData.split('\n').forEach(line => {
			const items = line.split(',').filter(x => x)
			ignoreList = ignoreList.concat(items)
		})
	}

	generateFragments({schema, out, clean, ignoreList})
}

cli()
