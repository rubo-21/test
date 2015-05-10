'use strict';

var mongoose = require('mongoose'),
  Word = mongoose.model('Word'),
  Q = require('q'),
  _ = require('lodash'),
  deepcopy = require('deepcopy');

/**
 * GET
 */
exports.getWords = function(req, res) {
  return Word.find(function (err, words) {
    if (!err) {
      return res.json(words);
    } else {
      return res.send(err);
    }
  });
};

//returns a promise that resolves to a function that given an array of objects containing a simplified chinese char and meaning index, 
//returns the corresponding entry from Words database
exports.meaningsChecker = function() {
  var deferred = Q.defer(),
    fn,
    wordsDict;

  Word.find(function(err, words) {
    if (err) throw new Error('cannot pull from database');

    //creates a dictionary for faster reference
    wordsDict = _.indexBy(words, 'simplifiedChar');

    //this function only takes an array of objects containing the chinese char and meaning index
    //access wordDict via closure
    fn = function(arr) {
      if (!(arr instanceof Array)) throw new Error('invalid argument');

      //hydrates each keyword with the meanings from wordDict
      //ensures that we use a deep copy of both the words passed into the function as well as the entries
      //taken from wordsDict
      return _.map(deepcopy(arr), function(keyword) {
        if (typeof wordsDict[keyword.simplifiedChar] === 'undefined') {
          throw new Error(keyword.simplifiedChar + ' not found');
        }
        keyword.meaning = deepcopy(wordsDict[keyword.simplifiedChar].heteronyms[keyword.meaningIndex]);

        return keyword;
      });
    };
    deferred.resolve(fn);
  });

  return deferred.promise;
};