const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server');

const resolvers = {
    Query: {
        books: async () => {
            return Book.find({});
        },
        book: async (parent, { bookId }) => {
            return Book.findOne({_id: bookId})
        },
        users: async () => {
            return User.find({});
        },
        User: async (parent, { profileId }) => {
            return User.findOne({_id: profileId})
        },
        login: async (parent, { email, password }) => {
            
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Invalid Email")
            };

            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError("Invalid password")

            }

            return user;
        }

    },
    Mutation: {
        createUser: async (parent, {username, email, password}) => {
            return User.create({username, email, password})
        },
        savedBook: async (parent, { userId, savedBooks }) => {
            return User.findOneAndUpdate(
                {_id: userId},
                {
                    $addToSet: { savedBooks: savedBook }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        deleteBook: async (parent, { userId, bookId }) => {
            return User.findOneAndUpdate(
                {_id: userId},
                { $pull: {savedBooks: {bookId: bookId }}},
                { new: true }
            )
        }
    }
};

module.exports = resolvers;