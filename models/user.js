const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const StatusDenied = require('../utils/errors/StatusDenied');

const userSchema = new Schema({
  email: {
    type: 'string',
    required: true,
    unique: true,
    match: [/^[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]{2,4}$/img, 'Неверный формат email'],
  },
  password: {
    type: 'string',
    required: true,
    minLength: 4,
    select: false,
  },
  name: {
    type: 'string',
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new StatusDenied('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new StatusDenied('Неправильные почта или пароль'));
          }
          return (user);
        });
    });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.plugin(uniqueValidator);

module.exports = model('user', userSchema);
