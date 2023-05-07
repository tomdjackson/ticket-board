import mongoose from 'mongoose';

const Board = mongoose.model('Board', {
  userId: String,
  name: String,
});

export default Board;
