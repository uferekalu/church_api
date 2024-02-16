const Church = require('../models/Church')

exports.createUser = async (req, res) => {
  const {
    firstname,
    surname,
    email,
    phone,
    kit,
    address,
    city,
    state,
    country,
  } = req.body
  try {
    const existingEmail = await Church.findOne({ email })
    if (!firstname) {
      return res.status(400).json({ message: 'First name cannot be empty' })
    }
    if (!surname) {
      return res.status(400).json({ message: 'Surname cannot be empty' })
    }
    if (!email) {
      return res.status(400).json({ message: 'Email cannot be empty' })
    }
    if (!kit) {
      return res.status(400).json({ message: 'Kit cannot be empty' })
    }
    if (!address) {
      return res.status(400).json({ message: 'Address cannot be empty' })
    }
    if (!city) {
      return res.status(400).json({ message: 'City cannot be empty' })
    }
    if (!state) {
      return res.status(400).json({ message: 'State cannot be empty' })
    }
    if (!country) {
      return res.status(400).json({ message: 'Country cannot be empty' })
    }

    if (existingEmail) {
      return res.status(400).json({
        message: 'User is already registered',
      })
    }
    const newUser = new Church({
      firstname,
      surname,
      email,
      phone,
      kit,
      address,
      city,
      state,
      country
    })
    const savedUser = await newUser.save()
    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser,
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
