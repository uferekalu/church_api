const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v)
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
        type: String,
        required: true,
      },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Users', UserSchema)
