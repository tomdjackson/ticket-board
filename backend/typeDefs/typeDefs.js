import gql from 'graphql-tag';

const typeDefs = gql`
  enum TicketStatus {
    TODO
    INPROGRESS
    DONE
  }

  type Ticket {
    _id: ID!,
    boardId: ID!
    name: String!
    description: String
    status: TicketStatus!
    visible: Boolean
  }

  type Board {
    _id: ID!
    userId: ID!
    name: String!
    tickets: [Ticket]
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String!
    boards: [Board]
  }

  type Query {
    me: User
    boards: [Board] # return array of boards for a user
    board (boardId: ID): Board # returns a board by id
  }

  type Mutation {
    # Auth: 
    register(firstName: String, lastName: String, email: String, password: String!): User
    login(email: String!, password: String!): User

    # Boards:
    createBoard (name: String): Board

    # Tickets:
    createTicket(boardId: ID, name: String, status: String): Ticket
    updateTicket(ticketId: ID, name: String, description: String, status: String): Ticket
    deleteTicket(ticketId: ID): Ticket
  }
`;

export default typeDefs;
