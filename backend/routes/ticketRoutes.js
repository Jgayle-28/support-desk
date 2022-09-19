const express = require("express")
const {
  createTicket,
  getTickets,
  getTicketById,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController")
const { protectRoute } = require("../middleware/authMiddleware")
const router = express.Router()

router.post("/", protectRoute, createTicket)
router.get("/", protectRoute, getTickets)
router.get("/:id", protectRoute, getTicketById)
router.delete("/:id", protectRoute, deleteTicket)
router.put("/:id", protectRoute, updateTicket)

module.exports = router
