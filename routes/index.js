var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentDB',{useMongoClient:true});

var request = require('request');
var parseString = require('xml2js').parseString;
var BookSchema = new mongoose.Schema({
    title:String,
    imageURL:String,
    author:String,
    reviews: [{text:String, userID:String}]
});

var Book = mongoose.model('Book', BookSchema);


router.get('/books', function(req,res,next) {
  Book.find(function(err,books){
    if(err){return next(err);}
    res.json(books);
  });
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
