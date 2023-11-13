import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login($email: String!, $password: String!) {
            _id
            username
            token
        }
    }

`


export const ADD_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            _id
            token
            user {
                email
                username
                savedBooks {
                    _id
                    authors
                    bookId
                    description
                    image
                    link
                    title
                }
            }
        }
    }
`

export const SAVE_BOOK = gql`
    mutation savedBook($data: BookInput) {
        savedBook(data: $data) {
            _id
            username
            email
            savedBooks{
                _id
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