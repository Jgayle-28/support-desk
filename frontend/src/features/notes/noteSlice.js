import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { extractErrorMessage } from "../../utils"
import noteService from "./noteService"

const initialState = {
  notes: null,
}

// Get Ticket Notes
export const createNote = createAsyncThunk(
  "notes/create",
  async (noteData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get Ticket Notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(ticketId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.notes = null
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  },
})

export default noteSlice.reducer
