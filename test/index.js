const cp = require('child_process')
const {readFileSync, writeFileSync} = require('fs')
require('should')

test('should generate from types', async () => {
	cp.execSync(
		'node src/cli.js --schema ./example/schema.gql --out ./example/output --clean',
		{
			stdio: 'inherit',
		},
	)
})

test('should generated from types and ignore items from csv', async () => {
	const toIgnore = ['AccessTokenOutput', 'Activity', 'ActivityCountAggregate']
	// create an ignore file
	writeFileSync('./example/ignore.csv', toIgnore.join(','))

	cp.execSync(
		'node src/cli.js --schema ./example/schema.gql --out ./example/output --clean --ignore ./example/ignore.csv',
		{
			stdio: 'inherit',
		},
	)

	const fragmentData = readFileSync('./example/output/fragments.gql', 'utf-8')

	toIgnore.forEach(ignoredType => {
		should(fragmentData).not.containDeep([ignoredType])
	})
})

test('should generated from types and ignore items from csv, multilined', async () => {
	const toIgnore = [
		'AccessTokenOutput',
		'Activity',
		'ActivityCountAggregate',
		'ActivityAvgAggregate',
	]
	// create an ignore file
	writeFileSync('./example/ignore.csv', toIgnore.join('\n'))

	cp.execSync(
		'node src/cli.js --schema ./example/schema.gql --out ./example/output --clean --ignore ./example/ignore.csv',
		{
			stdio: 'inherit',
		},
	)

	const fragmentData = readFileSync('./example/output/fragments.gql', 'utf-8')

	toIgnore.forEach(ignoredType => {
		should(fragmentData).not.containDeep([ignoredType])
	})
})
