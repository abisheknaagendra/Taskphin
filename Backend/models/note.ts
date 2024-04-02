import mongoose, { Schema, Document } from 'mongoose';

interface INote extends Document {
    content: string;
}

const NoteSchema: Schema = new Schema({
    content: { type: String, required: true }
});

const Note = mongoose.model<INote>('Note', NoteSchema);

export default Note;
