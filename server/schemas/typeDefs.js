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
    _id: ID
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
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook( userId: ID!, book: BookInput!): User
    deleteBook(bookId: ID!, userId: ID!): User
}

`

module.exports = typeDefs;
