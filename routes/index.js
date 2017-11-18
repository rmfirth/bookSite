var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var request = require('request');
var parseString = require('xml2js').parseString;

var Book = mongoose.model('Book');


router.get('/books', function(req,res,next) {
  Book.find(function(err,books){
    if(err){return next(err);}
    res.json(books);
  });
});

router.param('book',function(req,res,next,id) {
  var query = Book.findById(id);
  query.exec(function(err, book){
    if(err) {return next(err); }
    if(!book) {return next(new Error("can't find book")); }
    req.book = book;
    return next();
  });
});

router.put('/books/:book/addPost',function(req,res,next){
  console.log("HERE IT IS");
  console.log(req.body);
  console.log(req.book);
  var newReview = {
    text: req.body.text,
    userID: req.body.userID
  };
  req.book.reviews.push(newReview);
  req.book.save(function(err,book) {
    if(err) return console.error(err);
    res.json(book);
  });
  //console.log(req.book);
  //console.log(req.book);
  //res.json(req.book);
});

router.post('/books', function(req,res,next) {
  //console.log("HERE");
  var searchBook = req.body.text;
  var goodReads = "https://www.goodreads.com/search/?q=";
  var APIkey = "&key=kHFSG3T2ByzOJEZcpEw9vw";
  goodReads = goodReads + searchBook + APIkey;
  //console.log("HERE WE GO");
  var response = request(goodReads, function(err,resp,body){
    if(err){return console.error(err);}
    parseString(body, function(err,result) {
      if(err) return console.error(err);
      var bookTitle = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].title[0];
      //console.log(foundBook);
      var bookAuthor = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].author[0].name[0];
      //console.log(author);
      var imgURL = result.GoodreadsResponse.search[0].results[0].work[0].best_book[0].image_url[0];
      //console.log(imageURL);
      var newBook = new Book({
        title: bookTitle,
        imageURL: imgURL,
        author: bookAuthor,
        reviews: []
      });
      newBook.save(function(err,book){
        if(err) return next(err);
        res.json(book);
      });
    });
  });

});


module.exports = router;
