import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, IconButton, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getBlogPosts } from './components/api';
import { getBlogComments, likeBlogComment } from './components/api';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const postsData = await getBlogPosts();
        const postsWithComments = await Promise.all(
            postsData.map(async (post) => {
                const comments = await getBlogComments(post.id);
                return { ...post, comments };
            })
        );
        setPosts(postsWithComments);
    };

    const handleCommentLike = async ( postId, commentId) => {
        await likeBlogComment(postId, commentId);
        loadPosts();
    };
    const handlePostLike = async (postId) => {
        await likeBlogComment(postId);
        loadPosts();
    };

    return (
        <Box sx={{width: '100%'}}>
            <Typography variant="h4" gutterBottom align="center"> Sample Social Media Feed</Typography>
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center'}}>
                {posts.map((post) => (
                    // Creating a card to display the post title, content, and comments
                    <Card key={post.id} sx={{width: {xs: '100%', sm: '45%', md: '30%'}, display: 'flex', flexDirection: 'column', mb: 2}}>
                        <CardContent sx={{flexGrow: 1}}>
                            <Typography variant="h6" gutterBottom>{post.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{post.content.substring(0,100)}...</Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={Link} to={`/posts/${post.id}`}>View Post</Button>
                            <IconButton onClick={() => handlePostLike(post.id)} size='small'>
                                <ThumbUpIcon fontSize='small'/>
                            </IconButton>
                            <Typography variant='caption'>{post.likes || 0} likes</Typography>
                        </CardActions>
                        <CardContent>
                            {/* Displaying comments and shortening them to 50 characters */}
                            <Typography variant='subtitle2'>
                                Comments: ({post.comments.length})
                            </Typography>
                            {post.comments.slice(0,2).map((comment) => (
                                <Box key={comment.id} sx={{mt: 1}}>
                                    <Typography variant="body2">
                                        {comment.content.substring(0, 50)}...
                                    </Typography>
                                    
                                    <Box sx={{display: 'flex', alignItems: 'center' }}>
                                        {/* Adding a like button with number of likes */}
                                        <IconButton onClick={() => handleCommentLike(post.id, comment.id)} size='small'>
                                            <ThumbUpIcon fontSize='small'/>
                                        </IconButton>
                                        <Typography variant='caption'>{comment.likes || 0} likes</Typography>
                                        {/* Viewing/adding a comment to a post */}
                                        {/* <Button size='small' component={Link} to={`/posts/${post.id}`}>Add Comment</Button> */}
                                    </Box>
                                </Box>
                            ))}
                            {post.comments.length > 2 && (
                                <Button size='small' component={Link} to={`/posts/${post.id}`}>View All Comments</Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
