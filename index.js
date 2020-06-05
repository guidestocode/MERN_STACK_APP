const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose') //ODM 

const Genre = require('./models/genre')
const Book = require('./models/book')

const app = express();
app.use(bodyParser.json())

mongoose.connect("mongodb://localhost:27017/node_exp_mongo_rest",(err) =>{
    if(err) {
        throw err;
    }
    else console.log( "\n\n" + " you have been connected  to mongodb \n")
})

//let bd = mongoose.connection

app.get("/",(req,res) => {
    res.send("Welcome to Home page")
})

//get the genres
app.get("/api/genres", (req, res) => {
    Genre.getGenres( (err, genresData) => {
         if(err) {
             throw err
         }
         else {
             res.json(genresData);
         }
    })
})

//add the genre
app.post("/api/genres", (req, res) => {
    const genre = req.body;
    Genre.addGenre( genre, function(err, genre) {
         if(err) {
             throw err
         }
         else {
             res.json(genre);
         }
    
    })
})

//update the genre
app.put("/api/genres/:_id", (req, res) => {
    
    const id = req.params._id;
    const genre = req.body;
    Genre.updateGenre( id, genre,  {}, ((err, genre) => {
         if(err) {
             throw err
         }
         else {
             res.json(genre);
         }
    
    }))
})
//get the books
app.get("/api/books", (req, res) => {
    Book.getBooks( (err, booksData) => {
         
        if(err) { throw err }

         else { res.json(booksData) }
    })
})

//get the book by id
app.get("/api/books/:_id", (req, res) => {
    Book.getBookById( req.params._id, (err, book) => {  
       
        if(err) { throw err }

         else { res.json(book) }
    })
})

//add the book
app.post("/api/books", (req, res) => {
    const book = req.body;
    Book.addBook( book, function(err, book) {
         if(err) {
             throw err
         }
         else {
             res.json(book);
         }
    
    })
})

//update the book
app.put("/api/books/:_id", (req, res) => {
    
    const id = req.params._id;
    const book = req.body;
    Book.updateBook( id, book,  {}, ((err, book) => {
         if(err) {
             throw err
         }
         else {
             res.json(book);
         }
    
    }))
})

//delete the book
app.delete("/api/books/:_id", (req, res) => {
    
    const id = req.params._id;
    Book.deleteBook( id, ((err, book) => {
         if(err) {
             throw err
         }
         else {
             res.json(book);
         }
    
    }))
})

//delete the genre
app.delete("/api/genres/:_id", (req, res) => {
    
    const id = req.params._id;

    Genre.deleteGenre( id, ((err, genre) => {
         if(err) {
             throw err
         }
         else {
             res.json(genre);
         }
    
    }))
})




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("app is running at port " + PORT))

module.exports = mongoose;