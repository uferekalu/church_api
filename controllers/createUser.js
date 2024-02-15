const Church = require('../models/Church')

exports.createUser = async (req, res) => {
  const { firstname, surname, email, phone, kit } = req.body
  try {
    const existingEmail = await Church.findOne({ email })
    if (!firstname) {
      return res.status(400).json({ error: 'First name cannot be empty' })
    }
    if (!surname) {
      return res.status(400).json({ error: 'Surname cannot be empty' })
    }
    if (!email) {
      return res.status(400).json({ error: 'Email cannot be empty' })
    }
    if (!kit) {
      return res.status(400).json({ error: 'Kit cannot be empty' })
    }

    if (existingEmail) {
      return res.status(400).json({
        error: 'User is already registered',
      })
    }
    const newUser = new Church({ firstname, surname, email, phone, kit })
    const savedUser = await newUser.save()
    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser,
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
