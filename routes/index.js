var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');
//var parseString = require('xml2js').parseString;
/*var BookSchema = new mongoose.Schema({
    title:String,
    isbn:String,
    reviews: [{text:String, userID:String}]
});

//var Book = mongoose.model('Book', BookSchema);


router.get('/books', function(req,res,next) {
  //Book.find(function(err,books){
    if(err){return next(err);}
    //res.json(books);
  //});
});*/

router.post('/books', function(req,res,next) {
  console.log("HERE");
  var searchBook = req.body.text;
  var goodReads = "https://www.goodreads.com/search/?q=";
  var APIkey = "&key=kHFSG3T2ByzOJEZcpEw9vw";
  goodReads = goodReads + searchBook + APIkey;
  console.log("HERE WE GO");
  var response = request(goodReads);
  parseString(response, function(err,result) {
    console.log(JSON.stringify(result));
  });

});


module.exports = router;
