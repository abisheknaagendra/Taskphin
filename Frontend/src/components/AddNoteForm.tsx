// AddNoteForm.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../features/notesSlice';
import RichTextEditor from './RichTextEditor';
import './AddNoteForm.css';

const AddNoteForm: React.FC = () => {
    const [content, setContent] = useState('');
    const dispatch = useDispatch<any>();

    const handleUpdate = (newContent: string) => {
        setContent(newContent);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (content.trim() !== '') {
            dispatch(createNote(content));
            // dispatch(addNote(content));
            setContent('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='add-note-form'>
            <RichTextEditor onUpdate={handleUpdate} />
            <button type="submit" className='add-note-btn'>Add Note</button>
        </form>
    );
};

export default AddNoteForm;
