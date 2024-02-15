const User = require('../models/Users')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res) => {
  const { email, password, isAdmin } = req.body
  try {
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

    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    user = new User({ email, password: hashedPassword, isAdmin })
    await user.save()
    return res.status(201).json({ message: 'User registered successfully!' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
