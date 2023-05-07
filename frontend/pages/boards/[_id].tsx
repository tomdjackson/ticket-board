import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import Ticket from '../../components/Ticket';
import CreateTicket from '../../components/CreateTicket';
import { TicketType } from '../../types';

const BOARD_QUERY = gql`
query board($boardId: ID!) {
  board(boardId: $boardId) {
    _id
    name

    tickets {
      _id
      name
      description
      status
    }
  }
}`;

const refetchQueries = [BOARD_QUERY, 'board'];

const TicketListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

interface Query {
  _id: string
}

export default function Board({ query }:{ query : Query }) {
  const { data, loading, error } = useQuery(
    BOARD_QUERY,
    {
      variables: {
        boardId: query._id,
      },
    },
  );

  if (loading) return <p>Loading...</p>;
  if (error) return (<p>Error: {error.message}</p>);

  if (!data) throw new Error('No Data to update!');

  return (
    <div>
      <h1>{data.board.name}</h1>
      <CreateTicket boardId={query._id} refetchQueries={refetchQueries} />
      <TicketListStyles>
        {data.board.tickets.map(
          (t:TicketType) => <Ticket key={t._id} ticket={t} refetchQueries={refetchQueries} />,
        )}
      </TicketListStyles>
    </div>
  );
}
