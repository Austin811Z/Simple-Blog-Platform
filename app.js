const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory data (replace with database later)
let posts = [
    {
        id: 1,
        title: "Getting Started with Express.js",
        content: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It's fast, unopinionated, and perfect for building APIs and web apps.",
        author: "Sboniso",
        date: "2026-05-18"
    },
    {
        id: 2,
        title: "Why EJS is Great for Beginners",
        content: "EJS (Embedded JavaScript) is a simple templating language that lets you generate HTML markup with plain JavaScript. It's very beginner-friendly because it feels like writing HTML with some JavaScript mixed in.",
        author: "Sboniso",
        date: "2026-05-17"
    }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// View All Posts
app.get('/posts', (req, res) => {
    res.render('posts/index', { posts });
});



// Show Create Post Form
app.get('/posts/new', (req, res) => {
    res.render('posts/create');
});

// Create New Post
app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    
    if (title && content) {
        const newPost = {
            id: Date.now(),
            title: title.trim(),
            content: content.trim(),
            author: "You",
            date: new Date().toISOString().split('T')[0]
        };
        posts.unshift(newPost); // Add to beginning
    }
    
    res.redirect('/posts');
});

// View Single Post
app.get('/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    
    if (post) {
        res.render('posts/show', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});