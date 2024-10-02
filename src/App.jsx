import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './Home';
import PostView from './components/PostView';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import AddComment from './components/AddComment';
import CommentsList from './components/CommentsList';
import EditComment from './components/EditComment';
import PostList from './components/PostList';


const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0',
    },
    },
  });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw' }} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Social Media Feed
            </Typography>
            <Button color="inherit" component={RouterLink} to="/">Home</Button>
            <Button color="inherit" component={RouterLink} to="/posts">Posts</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, width: '100%', p: 3 }}>
          <Routes>
          <Route path="/" element={<Home />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/add" element={<AddPost />} />
              <Route path="/posts/edit/:id" element={<EditPost />} />
              <Route path="/posts/:id" element={<PostView />} />
              <Route path="/posts/:postId/comments" element={<CommentsList />} />
              <Route path="/posts/:postId/comments/add" element={<AddComment />} />
              <Route path="/posts/:postId/comments/edit/:id" element={<EditComment />} />
          </Routes>
        </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;