const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email) {
      return res.status(400).json({
        message: 'Email is required',
      })
    }
    if (!password) {
      return res.status(400).json({
        message: 'Password is required',
      })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({
        message: 'User not found!',
      })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: '1d',
      },
    )
    res.status(200).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
