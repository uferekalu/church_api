const Church = require('../models/Church');

exports.createUser = async (req, res) => {
  const {
    firstname,
    surname,
    email,
    phone,
    kit,
    medium,
    address,
    city,
    state,
    country
  } = req.body;
  
  try {
    if (!firstname) {
      return res.status(400).json({ error: 'First name cannot be empty' });
    }
    if (!surname) {
      return res.status(400).json({ error: 'Surname cannot be empty' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email cannot be empty' });
    }
    if (!kit) {
      return res.status(400).json({ error: 'Kit cannot be empty' });
    }
    if (!medium) {
      return res.status(400).json({ error: 'Medium of doing the program cannot be empty' });
    }
    if (!address) {
      return res.status(400).json({ error: 'Address cannot be empty' });
    }
    if (!city) {
      return res.status(400).json({ error: 'City cannot be empty' });
    }
    if (!state) {
      return res.status(400).json({ error: 'State cannot be empty' });
    }
    if (!country) {
      return res.status(400).json({ error: 'Country cannot be empty' });
    }

    // Check if the email is already registered for the same diet
    const existingUser = await Church.findOne({
      email: email.toLowerCase(),
      diet: 'August 2024', // Assuming default diet is 'August 2024'
    });
    
    if (existingUser) {
      return res.status(400).json({ error: `User with email ${email} is already registered for the ${existingUser.diet} diet.` });
    }

    const newUser = new Church({
      firstname,
      surname,
      email: email.toLowerCase(), 
      phone,
      kit,
      medium,
      address,
      city,
      state,
      country,
      diet: 'August 2024', // Use provided diet or default to 'August 2024'
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'You have been registered successfully!',
      user: savedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
