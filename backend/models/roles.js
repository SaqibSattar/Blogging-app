const mongoose = require('mongoose');

const rolesSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  slug: {
    type: String,
    enum : ['admin','user'],
    default: 'user'
},
});

module.exports = mongoose.model('Roles', rolesSchema);
