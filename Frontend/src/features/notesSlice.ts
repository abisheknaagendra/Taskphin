// notesSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
    try {
        const response = await axios.get('/notes');
        return response.data;
    } catch (e) {
        console.error(e);
    }
});

export const createNote = createAsyncThunk<Note, string>(
    'notes/createNote',
    async (content: string) => {
        const response = await axios.post<Note>('/notes', { content });
        return response.data;
    }
);

export const updateNote = createAsyncThunk<Note, { id: string; content: string }>(
    'notes/updateNote',
    async ({ id, content }: { id: string; content: string }) => {
        const response = await axios.patch<Note>(`/notes/${id}`, { content });
        return response.data;
    }
);

export const deleteNote = createAsyncThunk<{ _id: string, message: string }, string>(
    'notes/deleteNote',
    async (id: string) => {
        const response = await axios.delete(`/notes/${id}`);
        return response.data;
    }
);

interface Note {
    _id: string;
    content: string;
}

interface NotesState {
    notes: Note[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    status: 'idle',
    error: null,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        /* addNote: (state, action: PayloadAction<string>) => {
            const newNote: Note = {
                _id: Math.random().toString(),
                content: action.payload,
            };
            state.notes.push(newNote);
        }, */
        /* deleteNote: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note._id !== action.payload);
        },
        updateNote: (state, action: PayloadAction<{ id: string; newText: string }>) => {
            const index = state.notes.findIndex(note => note._id === action.payload.id);
            if (index !== -1) {
                state.notes[index].content = action.payload.newText;
            }
        }, */
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(createNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notes = [...state.notes, action.payload];
            })
            .addCase(createNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(updateNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notes = state.notes.map(note => {
                    if (note._id === action.payload._id) return action.payload;
                    else return note;
                });
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(deleteNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.notes = state.notes.filter(note => note._id !== action.payload._id);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            });
    },
});

// export const { addNote, deleteNote, updateNote } = notesSlice.actions;

export default notesSlice.reducer;