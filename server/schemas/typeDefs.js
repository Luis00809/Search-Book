const typeDefs = `
type Book {
    _id: ID
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
}

type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
}

type Auth {
    token: ID!
    user: User
}

input BookInput {
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
}


type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    savedBook(data: BookInput): User
    deleteBook(bookId: ID!, userId: ID!): User
}

`

module.exports = typeDefs;
