const Church = require('../models/Church')

exports.getUsers = async (req, res) => {
  try {
    const users = await Church.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
