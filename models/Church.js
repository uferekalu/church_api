const mongoose = require('mongoose')

const ChurchSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
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
    phone: {
      type: String,
      required: true,
    },
    kit: {
      type: String,
      required: true,
    },
    diet: {
      type: String,
      default: 'February 2024',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Church', ChurchSchema)
