const cp = require('child_process')
require('should')

test('validate generated queries', async () => {
	cp.execSync(
		'node src/cli.js --schema ./example/schema.gql --out ./example/output --clean',
		{
			stdio: 'inherit',
		},
	)
})
