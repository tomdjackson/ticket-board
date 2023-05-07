import React from 'react';
import { useMutation, gql } from '@apollo/client';

const PUT_TICKET_MUTATION = gql`
mutation createTicket($boardId: ID!, $name: String!) {
  createTicket(boardId: $boardId, name: $name) {
    _id
    boardId
    name
  }
}
`;

export default function CreateTicket({ boardId, refetchQueries }: { boardId:string, refetchQueries:any }) {
  const [createTicket, { loading, error }] = useMutation(PUT_TICKET_MUTATION, { refetchQueries });

  if (loading) { return <p>Submitting...</p>; }
  if (error) {
    return (
      <p>
        Error: $
        {error.message}
      </p>
    );
  }

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    createTicket({
      variables: {
        boardId,
        name: event.target.createTicketName.value,
      },
    });
  };

  return (
    <div>
      <h2>Create New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" id="createTicketName" placeholder="New Ticket Name" required minLength={2} />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
