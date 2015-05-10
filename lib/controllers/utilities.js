'use strict';

var request = require('request');

exports.meanings = function(req, res) {
  res.render('utilities/meanings');
}

exports.getCharacterMeanings = function(req, res) {
  var char = req.params.char;
  request('https://www.moedict.tw/raw/' + char, function(error, response, body) {
    if(!error && response.statusCode === 200) {
      res.send(body);
    }
  })
}