import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../features/notesSlice';
import './DeleteNoteButton.css';

interface Props {
    id: string;
}

const DeleteNoteButton: React.FC<Props> = ({ id }) => {
    const dispatch = useDispatch<any>();

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            dispatch(deleteNote(id));
        }
    };

    return (
        <button onClick={handleDelete} className='delete-note-btn'>Delete</button>
    );
};

export default DeleteNoteButton;