const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId,
  ref : 'User', required: true},
  status: {
    type: String,
    enum : ['approved','rejected', 'pending'],
    default: 'pending'
},
});

module.exports = mongoose.model('Post', postSchema);
