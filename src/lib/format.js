function format(code) {
	try {
		const prettier = require('prettier')
		return prettier.format(code, {
			parser: 'graphql',
		})
	} catch (err) {
		if (err.code === 'MODULE_NOT_FOUND') {
			console.log("`prettier` isn't installed, continuing without formatting")
		}
		return code
	}
}

module.exports = {format}
