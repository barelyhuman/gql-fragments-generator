const genericGraphQLTypes = [
	'Subsciption',
	'Query',
	'Float',
	'Int',
	'String',
	'Mutation',
	'__Schema',
	'__Type',
	'__TypeKind',
	'Boolean',
	'__Field',
	'__InputValue',
	'__EnumValue',
	'__Directive',
	'__DirectiveLocation',
]

const definitionTypesToIgnore = [
	'ObjectTypeDefinition',
	'EnumTypeDefinition',
	'InputObjectTypeDefinition',
]

module.exports = {
	genericGraphQLTypes,
	definitionTypesToIgnore,
}
