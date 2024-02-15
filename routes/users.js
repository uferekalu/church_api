const express = require('express');
const router = express.Router();
const createUserController = require('../controllers/createUser.js');
const getUsersController = require('../controllers/getUsers.js')
const signUpController = require('../controllers/signup.js')
const signInController = require('../controllers/signin.js')

router.post('/auth/signup', signUpController.signUp);
router.post('/auth/signin', signInController.signIn);
router.post('/', createUserController.createUser);
router.get('/', getUsersController.getUsers)

module.exports = router;