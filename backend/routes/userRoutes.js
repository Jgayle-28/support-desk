const express = require('express')
const { registerUser, loginUser, getMe } = require('../controllers/userController')
const { protectRoute } = require('../middleware/authMiddleware')

const router = express.Router()

// Register
router.post('/', registerUser)
// Log in
router.post('/login', loginUser)
// Get current user
router.get('/me', protectRoute, getMe)
// Get all users
router.get('/', (req, res) => {
  res.send('Get all users')
})
// Get all userby id
router.get('/id', (req, res) => {
  res.send('Get all user by id')
})

module.exports = router