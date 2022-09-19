const express = require("express")
const { createTicketNote, getNotes } = require("../controllers/noteController")
const { protectRoute } = require("../middleware/authMiddleware")

const router = express.Router({ mergeParams: true })

router.post("/", protectRoute, createTicketNote)
router.get("/", protectRoute, getNotes)

module.exports = router
