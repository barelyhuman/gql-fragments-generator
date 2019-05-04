# gql-fragment-generator

Generate fragments from graphql schema

## Example
```gql
# Sample schema
type Query {
  user(id: Int!): User!
}

type User {
  id: Int!
  username: String!
  email: String!
  createdAt: String!
}
```

```gql
# Sample fragment generated
  fragment user on user{
    id
    username
    email
    createdAt
  }

```

## Usage
```bash
# Install
npm install gql-fragment-generator -g

# see the usage
gqlgfrag --help

# Generate sample fragments from schema file
gqlgfrag --schemaFilePath ./example/sampleTypeDef.graphql --destDirPath ./example/output
```

Now the fragments are generated from the [`sampleTypeDef.graphql`](./example/sampleTypeDef.graphql) can be found in the destDir: [`./example/output`](./example/output).

This tool generate 1 folder holding the fragments. 

You can require the fragment like this:

```js
const userFragment = require('graphql-tag/loader!./generated/fragments/user.gql');

/
// sample content
console.log(userFragment);


```
