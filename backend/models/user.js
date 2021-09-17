var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  password: {type: String, required: true
    // match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            },
  email: {type: String, required: true, unique: true,
          match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
          },
  role: {type: String, required: true}

});

module.exports = mongoose.model('User', UserSchema);
