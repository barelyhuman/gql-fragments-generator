# gqlfragments

Generate fragments from your graphql schema's custom scalars

The base concept was forked from [Hasan-git/gql-fragments-generator](https://github.com/Hasan-git/gql-fragments-generator) and was modified to match my use case.

## Example

```gql
# Sample schema
type User {
	id: Int!
	username: String!
	email: String!
	createdAt: String!
	projects: [Project!]
}
```

```gql
# fragment generated
# - fields are sorted by their lengths
# - subsets are not added to fragments , eg `projects` is missing here
fragment UserFields on User {
	id
	email
	username
	createdAt
}
```

## Usage

```bash
# Install
npm install @barelyhuman/gqlfragments -g

# see the usage
gqlfragments --help

# Generate fragments from schema file
gqlfragments --schema ./example/schema.gql --out ./example/output
```

```bash
Usage: gqlfragments [options]

Options:
  --schema [value]  path of your graphql schema
  --out [value]     folder to store the generated fragments in
  --ignore [value]  path to csv containing types to be ignored
  --clean           create a clean build
  -h, --help        display help for command
```

## License

[MIT](/LICENSE) 2022 [Reaper](github.com/barelyhuman)  
[ISC](/LICENSE) [Hasan-git](github.com/Hasan-git)
