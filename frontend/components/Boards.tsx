import React from 'react';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';

import CreateBoard from './CreateBoard';
import SelectBoard from './SelectBoard';

import { BoardType } from '../types';

const BOARDS_QUERY = gql`
query boards {
  boards {
    _id
    name
  }
}`;

const BoardListStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`;

export default function Boards() {
  const { data, error, loading } = useQuery(
    BOARDS_QUERY,
  );

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error: {error.message}</p>; }

  return (
    <div>
      <CreateBoard refetchQueries={[BOARDS_QUERY, 'boards']} />
      <hr />
      <BoardListStyles>
        {data.boards.map((b: BoardType) => <SelectBoard key={b._id} board={b} />)}
      </BoardListStyles>
    </div>
  );
}
