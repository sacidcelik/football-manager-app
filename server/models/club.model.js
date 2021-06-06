import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  name: String,
  stadium: String,
  coach: String,
  budget: Number,
});

const Club = mongoose.model('club', clubSchema);

export default Club;
