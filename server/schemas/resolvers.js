const { User } = require('../models');
const { signToken } = require('../utils/auth');
const {AuthenticationError} = require('apollo-server-express')
const resolvers = {
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
      
              return userData;
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
        createUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password})
            const token = signToken(user);
            return {user, token}
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