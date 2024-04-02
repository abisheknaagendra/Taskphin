import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Note from './models/note';

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb+srv://abisheknaagendra01:msMOXXSlYBuf8P56@taskphinnotes.42ruowl.mongodb.net/taskphin?retryWrites=true&w=majority&appName=TaskphinNotes';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/home', express.static('build'));

// Routes
app.get('/notes', async (_req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/notes', async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const note = new Note({ content });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.patch('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/notes/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ _id: id, message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});