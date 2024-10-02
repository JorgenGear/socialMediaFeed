import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Box,
    Divider,
    IconButton,
    TextField
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getBlogPost, getBlogComments, likeBlogComment, addBlogComment } from './api';

export default function PostView() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();

    useEffect(() => {
        loadPost();
        loadComments();
    }, [id]);

    const loadPost = async () => {
        const postData = await getBlogPost(id);
        setPost(postData);
    };

    const loadComments = async () => {
        const commentsData = await getBlogComments(id);
        setComments(commentsData);
    };

    const handleLike = async (commentId) => {
        await likeBlogComment(id, commentId);
        loadComments();
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        await addBlogComment(id, { content: newComment });
        setNewComment('');
        loadComments();
    };

    if (!post) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {post.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" component={Link} to="/">
                        Back to Home
                    </Button>
                </CardActions>
            </Card>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                {comments.map((comment) => (
                    <Card key={comment.id} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="body1">
                                {comment.content}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <IconButton onClick={() => handleLike(comment.id)} size="small">
                                    <ThumbUpIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">
                                    {comment.likes || 0} likes
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Box component="form" onSubmit={handleAddComment} sx={{ mt: 4 }}>
                <TextField
                    fullWidth
                    label="Add a comment"
                    variant="outlined"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Post Comment
                </Button>
            </Box>
        </Box>
    );
}