import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import { getUser } from './util.js';
import resolvers from './resolvers/resolvers.js';
import typeDefs from './typeDefs/typeDefs.js';
import config from './config.js'

// Database connection
await mongoose.connect(config.MONGO_URL); // TODO: eslint error but await is fine in a module?
console.log('db connected');

// Start server:
const app = express();

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
    context: ({req, res}) => {
    // authenticate user:
    const token = req.headers?.authorization || '';
    return getUser(token.split(' ')[1]);
  },
  introspection: true,
});
await server.start();
server.applyMiddleware({ app, path: '/graphql' });

await app.listen({port: 4000});
console.log(`Server listening`);
