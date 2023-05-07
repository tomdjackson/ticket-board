import mongoose from 'mongoose';

const Ticket = mongoose.model('Ticket', {
  boardId: String,
  name: String,
  description: String,
  status: String,
  visible: Boolean,
});

export default Ticket;
