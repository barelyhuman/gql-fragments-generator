const {definitionTypesToIgnore} = require('../constants')

function checkNestedDefinitions(fieldDefs) {
	return isInDefsToIgnore(fieldDefs.type)
}

function isInDefsToIgnore(field) {
	if (
		field.astNode &&
		definitionTypesToIgnore.indexOf(field.astNode.kind) > -1
	) {
		return true
	}

	if (field.type) {
		if (
			field.type.astNode &&
			definitionTypesToIgnore.indexOf(field.type.astNode.kind) > -1
		) {
			return true
		} else if (field.type.ofType) {
			return isInDefsToIgnore(field.ofType)
		}
	}

	if (field.ofType) {
		if (
			field.ofType.astNode &&
			definitionTypesToIgnore.indexOf(field.ofType.astNode.kind) > -1
		) {
			return true
		} else if (field.ofType.ofType) {
			return isInDefsToIgnore(field.ofType)
		}
	}
}

module.exports = {
	checkNestedDefinitions,
}
