import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { getBlogComments, deleteBlogComment } from './api';


export default function CommentsList() {
    const [comments, setComments] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        const commentsData = await getBlogComments(postId);
        setComments(commentsData);
    };

    const handleDelete = async (id) => {
        await deleteBlogComment(postId, id);
        loadComments();
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'content', headerName: 'Content', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <Link to={`/posts/${postId}/comments/${params.id}`}>
                    <Button variant="contained" color="primary" size="small" style={{marginRight: 16}} >Edit</Button>
                    </Link>
                    <Button variant="contained" size="small" onClick={() => handleDelete(params.id)} color="error">
                        Delete
                    </Button>
                </strong>
            ),
        },
    ];

    return (
        <div style={{height: 400, width: '100%'}}>
            <h1>Post Comments</h1>
            <Link to={`/posts/${postId}/comments/add`}>
                <Button variant="contained" color="primary" style={{marginBottom: 16}}>Add Comment</Button>
            </Link>
            <DataGrid rows={comments} columns={columns} pageSize={5} checkboxSelection/>
        </div>
    );
}