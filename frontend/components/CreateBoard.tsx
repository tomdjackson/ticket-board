import React from 'react';
import { useMutation, gql } from '@apollo/client';

const PUT_BOARD_MUTATION = gql`
mutation createBoard($name: String!) {
  createBoard(name: $name) {
    _id
    name
  }
}
`;

export default function CreateBoard({ refetchQueries } : { refetchQueries:any }) {
  const [createBoard, { loading, error }] = useMutation(PUT_BOARD_MUTATION, { refetchQueries });

  if (loading) { return <p>Submitting...</p>; }
  if (error) { return <p>Submission error: {error.message}</p>; }

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    await createBoard({
      variables: {
        name: event.target.createBoardName.value,
      },
    });
  };

  return (
    <div>
      <h2>Create New Board</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" id="createBoardName" placeholder="New Board Name" required minLength={2} />
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}
