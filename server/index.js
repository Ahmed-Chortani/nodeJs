const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create connection

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'nodemysql',
});

// Connect
db.connect(err => {
    if(err)
       console.log(err);
    console.log('My sql connected...')
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('database created...');
    });
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Posts table created...');
    });
});

// Insert post 1
app.get('/addPost1', (req, res) => {
    let post = {title: 'Post One', body:'This is post number one'};
    let sql = 'Insert into posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Post 1 added...');
    });
});

// Update post

app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Post updated');
    });
});

// Delete post

app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Post deleted...');
    });
});

// Selects posts 
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log(err);
        console.log(result);
        res.send('Post fetched...');
    });
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));