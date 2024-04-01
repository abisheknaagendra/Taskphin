import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote } from '../features/notesSlice';
import './EditNoteForm.css';
import RichTextEditor from './RichTextEditor';

interface Props {
    id: string;
    initialText: string;
    onClose: () => void;
}

const EditNoteForm: React.FC<Props> = ({ id, initialText, onClose }) => {
    const [content, setContent] = useState(initialText);
    const dispatch = useDispatch<any>();
    console.log(content);

    const handleUpdate = (newContent: string) => {
        setContent(newContent);
    };

    const handleSubmit = () => {
        if (content.trim() !== '') {
            dispatch(updateNote({ id, content }));
            setContent('');
            onClose();
        }
    };

    return (
        <div className="edit-note-popup">
            <div className="edit-note-form-container">
                <RichTextEditor initialValue={initialText} onUpdate={handleUpdate} />
                <div className="button-container">
                    <button onClick={handleSubmit} className="update-note-btn">Update</button>
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditNoteForm;