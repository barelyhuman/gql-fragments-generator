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
# Sample query generated
query user($id: Int!) {
  user(id: $id){
    id
    username
    email
    createdAt
  }
}
```

## Usage
```bash
# Install
npm install gql-fragment-generator -g

# see the usage
gqlgfrag --help

# Generate sample queries from schema file
gqlgfrag --schemaFilePath ./example/sampleTypeDef.graphql --destDirPath ./example/output
```

Now the queries generated from the [`sampleTypeDef.graphql`](./example/sampleTypeDef.graphql) can be found in the destDir: [`./example/output`](./example/output).

This tool generate 3 folders holding the queries: mutations, queries and subscriptions. And also `index.js` files to export the queries in each folder.

You can require the queries like this:

```js
// require all the queries
const queries = require('./example/output');
// require mutations only
const mutations = require('./example/output/mutations');

// sample content
console.log(queries.mutations.signup);
console.log(mutations.signup);
/*
mutation signup($username: String!, email: String!, password: String!){
  signup(username: $username, email: $email, password: $password){
    token
    user {
      id
      username
      email
      createdAt
    }
  }
}
*/

```
