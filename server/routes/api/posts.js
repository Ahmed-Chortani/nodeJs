const express = require('express');

const router = express.Router();

// Get posts
router.get('/', (req, res) => {
    res.send('hello');
});

// Add Post

// Delete Post

module.exports = router;