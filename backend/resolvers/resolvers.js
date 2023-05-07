import { GraphQLError } from 'graphql';
import { getToken, comparePassword, encryptPassword } from '../util.js';
import User from '../models/User.js';
import Board from '../models/Board.js';
import Ticket from '../models/Ticket.js';

const resolvers = {
  Query: {
    me: (parent, args, context) => {
      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return context.user;
    },

    boards: async (parent, args, context) => {
      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return Board.find({ userId: context.userId });
    },

    board: async (parent, args, context) => {
      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      return Board.findOne({ userId: context.userId, _id: args.boardId });
    },
  },

  Mutation: {
    register: async (parent, args) => {
      if (await User.findOne({ email: args.email })) {
        throw new Error('User Already Exists!');
      }

      const user = new User({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        password: await encryptPassword(args.password),
      });

      const regUser = await user.save();

      const token = getToken(regUser.toJSON());

      return { ...regUser.toObject(), token };
    },

    login: async (parent, args) => {
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new Error('User or password incorrect!');
      }

      const isMatch = await comparePassword(args.password, user.password);

      if (!isMatch) {
        throw new Error('User or password incorrect!');
      }

      const token = getToken(user.toJSON());

      return { ...user.toObject(), token };
    },

    createBoard: async (parent, args, context) => {
      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      const newBoard = new Board({
        userId: context.userId,
        name: args.name,
      });

      return newBoard.save();
    },

    createTicket: async (parent, args, context) => {
      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      const { boardId, name } = args;

      const newTicket = new Ticket({
        boardId,
        name,
        status: 'TODO',
        visible: true,
      });

      return newTicket.save();
    },

    updateTicket: async (parent, args, context) => {
      const {
        ticketId, name, description, status,
      } = args;

      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      const updatedTicket = Ticket.findByIdAndUpdate(
        ticketId,
        { name, description, status },
        { new: true },
      );

      return updatedTicket;
    },

    deleteTicket: async (parent, args, context) => {
      const { ticketId } = args;

      if (!context.loggedIn) {
        throw new GraphQLError('Please log in again.', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }

      // soft delete
      const deletedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        { visible: false },
        { new: true },
      );

      return deletedTicket;
    },
  },

  User: {
    boards: async ({ _id }) => User.find({ userId: _id }),
  },
  Board: {
    tickets: async ({ _id }) => Ticket.find({ boardId: _id, visible: true }),
  },
};

export default resolvers;
