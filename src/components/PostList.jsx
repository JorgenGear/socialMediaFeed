import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getBlogPosts, deleteBlogPost } from './api';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        const data = await getBlogPosts();
        setPosts(data);
    };

    const handleDelete = async (id) => {
        await deleteBlogPost(id);
        loadPosts();
    };

    const handleSortChange = (event) => {
        setSortField(event.target.value);
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        { field: 'content', headerName: 'Content', width: 300 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Link to={`/posts/edit/${params.row.id}`}>
                        <Button variant="contained" color="primary" size="small" style={{ marginRight: 16 }}>
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <h1>All Posts</h1>
            <br></br>
            <FormControl style={{ marginBottom: 16, minWidth: 120 }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortField} onChange={handleSortChange}>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="id">ID</MenuItem>
                </Select>
            </FormControl>
            <Link to="/posts/add">
                <Button variant="contained" color="primary" style={{ marginBottom: 16, marginLeft: 16 }}>
                    Add New Post
                </Button>
            </Link>
            <DataGrid
                rows={sortedPosts}
                columns={columns}
                pageSize={5}
                checkboxSelection
                sortModel={[
                    {
                        field: sortField,
                        sort: sortDirection,
                    },
                ]}
                onSortModelChange={(model) => setSortDirection(model[0]?.sort)}
            />
        </div>
    );
}
