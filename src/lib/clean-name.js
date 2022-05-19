function cleanName(name) {
	return name.replace(/[[\]!]/g, '')
}

module.exports = {
	cleanName,
}
