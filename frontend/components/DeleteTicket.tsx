import React from 'react';
import { useMutation, gql } from '@apollo/client';

const DELETE_TICKET_MUTATION = gql`
mutation deleteTicket($ticketId: ID!) {
  deleteTicket(ticketId: $ticketId) {
    _id
  }
}
`;

export default function DeleteTicket({ ticketId, refetchQueries } : { ticketId:string, refetchQueries:any }) {
  const [deleteTicket, { loading, error }] = useMutation(DELETE_TICKET_MUTATION, { refetchQueries });

  if (error) {
    throw new Error(`Something went wrong ${error}`);
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteTicket({
        variables: {
          ticketId,
        },
      });
    }
  };

  return (
    <button type="button" disabled={loading} onClick={handleDelete}>Delete</button>
  );
}
