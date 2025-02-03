const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: 'String',
      required: [true, 'Name of the user is required'],
    },
    email: {
      type: 'String',
      required: [true, 'Email of the user is required'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email address.'],
    },
    password: {
      type: 'String',
      required: [true, 'Password of the user is required'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  }
);

userSchema
  .virtual('confirmPassword')
  .get(function () {
    return this._confirmPassword;
  })
  .set(function (value) {
    this._confirmPassword = value;
  });

userSchema.pre('validate', function (next) {
  if (this.confirmPassword !== this.password)
    this.invalidate(
      'confirmPassword',
      'Password and confirm password do not match'
    );
  next();
});

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  hashedPassword,
  candidatePassword
) {
  const result = await bcrypt.compare(candidatePassword, hashedPassword);
  return result;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
