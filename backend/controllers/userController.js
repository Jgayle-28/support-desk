const asyncHandler = require('express-async-handler')

// @desc Register new user
// @route /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  // validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

})
// @desc Register new user
// @route /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  res.send('LOGIN ROUTE FROM CONTROLLER')
})

module.exports = {
  registerUser,
  loginUser
}