import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BoardType } from '../types';

const SelectBoardStyles = styled.div`
border: 2px solid white;
display: grid;
`;

export default function SelectBoard({ board }: { board:BoardType }) {
  return (
    <SelectBoardStyles>
      <Link href={`boards/${board._id}`}><h4>{board.name}</h4></Link>
    </SelectBoardStyles>
  );
}
