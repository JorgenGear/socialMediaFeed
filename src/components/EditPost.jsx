import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { getBlogPost, updateBlogPost } from './api';

export default function EditPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadPost();
    }, [id]);

    const loadPost = async () => {
        const post = await getBlogPost(id);
        setTitle(post.title);
        setContent(post.content);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBlogPost(id, { title, content });
        navigate('/posts');
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
                <Button type="submit" variant="contained" color="primary">
                    Update Post
                </Button>
            </form>
        </div>
    );
}
