const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const { connectDB } = require('./config/db')

const PORT = process.env.PORT || 8080

// Connect to database
connectDB()

const app = express()

// Allow server to accept json and urlencoded data
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Default route -> Can change it
app.get('/', (req, res) => {
    res.send('HOLA AMIGO')
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))