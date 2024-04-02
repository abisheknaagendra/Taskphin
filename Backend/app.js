// server.js

const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('bson');

const app = express();
const PORT = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

app.use('/home', express.static('build'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://abisheknaagendra01:msMOXXSlYBuf8P56@taskphinnotes.42ruowl.mongodb.net/taskphin?retryWrites=true&w=majority&appName=TaskphinNotes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define note schema
const noteSchema = new mongoose.Schema({
    _id: String,
    content: String,
});

// Define Note model
const Note = mongoose.model('notes', noteSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Routes

// Get all notes
app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        console.log(notes);
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single note
app.get('/notes/:id', getNote, (req, res) => {
    res.json(res.note);
});

// Create a note
app.post('/notes', async (req, res) => {
    const note = new Note({
        _id: new ObjectId(),
        content: req.body.content,
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a note
app.patch('/notes/:id', getNote, async (req, res) => {
    if (req.body.content != null) {
        res.note.content = req.body.content;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a note
app.delete('/notes/:id', getNote, async (req, res) => {
    try {
        const _id = res.note._id;
        await Note.findByIdAndDelete(_id);
        console.log('success')
        res.json({ _id, message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a single note by ID
async function getNote(req, res, next) {
    try {
        const note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.note = note;
        console.log(note);
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});