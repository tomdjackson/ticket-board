import React from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import DeleteTicket from './DeleteTicket';
import { Status, TicketType } from '../types';

const TicketStyles = styled.form`
  border: 2px solid white;
  display: grid;
  gap: 10px
`;

const UPDATE_TICKET_MUTATION = gql`
mutation udpateTicket($ticketId: ID! $name: String $description: String $status: String) {
  updateTicket(ticketId: $ticketId name: $name description: $description status: $status) {
    name
    status
    visible
  }
}
`;

export default function Ticket(
  { ticket, refetchQueries }: { ticket:TicketType, refetchQueries:any },
) {
  const [updateTicket, { loading, error }] = useMutation(UPDATE_TICKET_MUTATION, { refetchQueries });

  if (error) {
    throw new Error(`Something went wrong ${error}`);
  }

  const handleSubmit = function handleSubmit(event:any) {
    event.preventDefault();

    updateTicket({
      variables: {
        ticketId: ticket._id,
        name: event.target?.name.value,
        description: event.target?.description?.value,
        status: event.target?.status?.value,
      },
    });
  };

  return (
    <TicketStyles onSubmit={handleSubmit}>
      <DeleteTicket ticketId={ticket._id} refetchQueries={refetchQueries} />
      <input id="name" type="text" defaultValue={ticket.name} required />

      <select id="status" defaultValue={ticket.status}>
        {Object.values(Status).map((s: string) => <option key={s} defaultValue={s}>{s}</option>)}
      </select>

      <textarea id="description" defaultValue={ticket.description} />

      <input disabled={loading} type="submit" value="Update" />
    </TicketStyles>
  );
}
