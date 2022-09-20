import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import BackButton from "../../components/shared/BackButton"
import Spinner from "../../components/shared/Spinner"
import NoteItem from "../../components/NoteItem"
import { getTicket, closeTicket } from "../../features/tickets/ticketSlice"
import { getNotes, createNote } from "../../features/notes/noteSlice"
import { toast } from "react-toastify"
import Modal from "react-modal"
import { FaPlus } from "react-icons/fa"

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
}

Modal.setAppElement("#root")

function Ticket() {
  const { ticketId } = useParams()
  const { ticket } = useSelector((state) => state.tickets)
  const { notes } = useSelector((state) => state.notes)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState("")

  useEffect(() => {
    dispatch(getTicket(ticketId)).unwrap().catch(toast.error)
    dispatch(getNotes(ticketId)).unwrap().catch(toast.error)
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

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, ticketId }))
      .unwrap()
      .then(() => {
        setNoteText("")
        closeModal()
      })
      .catch(toast.error)
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

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
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button className='btn' onClick={openModal}>
          <FaPlus /> Add Note
        </button>
      )}
      {/* Notes */}
      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}
      {/* Close ticket */}
      {ticket.status !== "closed" && (
        <button
          className='btn btn-block btn-danger'
          onClick={handleTicketClose}
        >
          Close Ticket
        </button>
      )}
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note Text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
            <div className='form-group'>
              <button className='btn' type='submit'>
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Ticket
