import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                email
                username
                password
            }
        }
    }

`


export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                email
                username
                password
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation saveBook($userId: ID!, $book: BookInput!) {
        saveBook(userId: $userId, book: $book) {
            savedBooks{
                authors
                bookId
                description
                image
                title
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: ID!, $userId: ID!) {
        deleteBook(bookId: $bookId, userId: $userId) {
            savedBooks {
                authors
                bookId
                description
                image
                link
                title
            }
        }
    }
`