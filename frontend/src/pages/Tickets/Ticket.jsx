import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import BackButton from "../../components/shared/BackButton"
import Spinner from "../../components/shared/Spinner"
import { getTicket, closeTicket } from "../../features/tickets/ticketSlice"
import { toast } from "react-toastify"

function Ticket() {
  const { ticketId } = useParams()
  const { ticket } = useSelector((state) => state.tickets)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
    // eslint-disable-next-line
  }, [])

  const handleTicketClose = () => {
    dispatch(closeTicket(ticketId))
      .unwrap()
      .then(() => {
        toast.success("Ticket Closed")
        navigate("/tickets")
      })
      .catch(toast.error)
  }

  if (!ticket) return <Spinner />
  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>
      {ticket.status !== "closed" && (
        <button
          className='btn btn-block btn-danger'
          onClick={handleTicketClose}
        >
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
