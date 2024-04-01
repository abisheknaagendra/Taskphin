import React, { useState } from 'react';
import EditNoteForm from './EditNoteForm';
import './EditNoteButton.css';

interface Props {
    id: string;
    initialText: string;
}

const EditNoteButton: React.FC<Props> = ({ id, initialText }) => {
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div>
            <button onClick={toggleForm} className='edit-note-btn'>Edit</button>
            {showForm && <EditNoteForm id={id} initialText={initialText} onClose={toggleForm} />}
        </div>
    );
};

export default EditNoteButton;