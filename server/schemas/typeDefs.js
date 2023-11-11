const typeDefs = `
type Book {
    _id: ID
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type User {
    username: String
    email: String
    password: String
    savedBooks: [Book]!
}

type Auth {
    token: Number
    user: User
}


type Query {
    books: [Book]!
    book(bookId: ID!): Book
    users: [User]!
    user(userId: ID!): User
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    SavedBook(userId: ID! ): User
    deleteBook(bookId: ID!): User
}

`

module.exports = typeDefs;
