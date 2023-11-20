const { User } = require('../models');
const { signToken } = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express')
const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
             return User.findOne({ _id: context.user._id }).select('-__v -password');
      
            }
      
          },


    },
    Mutation: {
        login: async (parent, { email, password }) => {
            
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },
         addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return {user, token}
        },
        saveBook: async (parent, { userId, book }) => {
            console.log(book)
            return User.findOneAndUpdate(
                {_id: userId},
                {
                    $addToSet: { savedBooks: book }
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