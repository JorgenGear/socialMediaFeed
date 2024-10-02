import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { getBlogComment, updateBlogComment } from './api';

export default function EditComment() {
    const [content, setContent] = useState('');
    const {postId, id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadComment();
    }, [postId, id]);

    const loadComment = async () => {
        const comment = await getBlogComment(postId, id);
        setContent(comment.content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBlogComment(postId, id, {content});
        navigate(`/posts/${postId}/comments`);
    };

    return (
        <div>
            <h1>Edit Comment</h1>
            <form onSubmit={handleSubmit}>
                <TextField label="Comment" value={content} onChange={(e) => setContent(e.target.value)} fullWidth margin="normal" multiline rows={4}/>
                <Button type="submit" variant="contained" color="primary">Update Comment</Button>
            </form>
        </div>
    );

}