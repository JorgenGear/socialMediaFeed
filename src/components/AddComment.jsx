import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { addBlogComment } from './api';

export default function AddComment() {
    const [content, setContent] = useState('');
    const { postId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBlogComment(postId, {content});
        navigate(`/posts/${postId}/comments`);
    };

    return (
        <div>
            <h1>Add Comment to Post: {postId}</h1>
            <form onSubmit={handleSubmit}>
            <TextField label="Comment" value={content} onChange={(e) => setContent(e.target.value)} fullWidth margin="normal" multiline rows={4}/>
            <Button type="submit" variant="contained" color="primary">Add Comment</Button>
            </form>
        </div>
    );

}

