'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('lodash'),
  Q = require('q'),
  NUMBER_OF_STARS_REQUIRED_TO_UNLOCK_INTERMEDIATE = require('../config/options').numberOfStarsRequiredToUnlockIntermediate,
  //object that stores all the helper functions, all of which that take kidId and an options object as arguments, 
  //and returns a promise
  helperFunctions = {};

exports.updateKid = function(req, res) {
  var options = req.body,
    field = req.params.field,
    kidId = req.params.kidId;

  //error checking
  if (!options || !field || !kidId || !helperFunctions.hasOwnProperty(field)) return res.send(400);

  //variant of the strategy pattern using functions rather than Strategy instances
  helperFunctions[field](kidId, req.body).done(function() {
    return res.send(200);
  }, function(err) {
    console.log(err);
    return res.send(400);
  });
};

/* 
 * helper functions
 * all helper functions take kidId and an options object as arguments and return a promise
*/

function updateSettings(kidId, options) {
  var deferred = Q.defer(),
    options = options || {},
    subtitles = options.subtitles;

  if (!kidId || !subtitles) {
    deferred.reject(new Error('Missing arguments'));
  } else if (subtitles !== 'englishSubtitles' && subtitles !== 'noSubtitles') {
    deferred.reject(new Error('Invalid arguments'));
  } else {
    User.update({role: 'kid', _id: kidId}, {$set: {subtitles: subtitles}}, function(err) {
      if (err) return deferred.reject(err);
      deferred.resolve(true);
    });
  }
  return deferred.promise;
};

function updateBooksMarkedRead(kidId, options) {
  var deferred = Q.defer(),
    options = options || {};

  //error checking
  //termIndex and markedRead can be false (0, false), so check using typeof xxx === 'undefined'
  if (!kidId || typeof options.markedRead === 'undefined' || !options.termId || 
    typeof options.termIndex === 'undefined') {
    deferred.reject(new Error('Missing arguments'));
  } else {
    User.findById(kidId, function(err, user) {
      if (err) return deferred.reject(err);

      user.updateBooksRecords(options.termId, options.termIndex, 'markedRead', options.markedRead, function(err) {
        if (err) return deferred.reject(err);
        deferred.resolve(true);
      });
    }); //end findById
  } 
  return deferred.promise;
};

function updateLevel(kidId, options) {
  var deferred = Q.defer(),
    options = options || {},
    bookRecords, bookId;

  if (!kidId || !options.newLevel || !options.termId || typeof options.termIndex === 'undefined') {
    deferred.reject(new Error('Missing arguments'));
  } 
  else if ((options.newLevel !== 'elementary' && options.newLevel !== 'intermediate') || options.termIndex < 0) {
    deferred.reject(new Error('Invalid arguments'));
  } 
  else {
    User.findById(kidId, function(err, user) {
      if (err) return deferred.reject(err);

      bookId = options.termId + '_' + options.termIndex;
      bookRecords = user.publicBooksRecords[bookId];

      if (bookRecords.currLevel === options.newLevel) return deferred.reject(new Error('currLevel and newLevel are the same'));
      
      if (options.newLevel === 'intermediate' && bookRecords.bestStarsScore.elementary < NUMBER_OF_STARS_REQUIRED_TO_UNLOCK_INTERMEDIATE) {
        return deferred.reject(new Error('Insufficient amount of stars required to switch to intermediate'));
      };

      user.updateBooksRecords(options.termId, options.termIndex, 'currLevel', options.newLevel, function(err) {
        if (err) return deferred.reject(err);
        deferred.resolve(true);
      });

      deferred.resolve(true);
    });
  }

  return deferred.promise;
};

helperFunctions['settings'] = updateSettings;
helperFunctions['booksmarkedread'] = updateBooksMarkedRead;
helperFunctions['level'] = updateLevel;

//expose helper functions during testing
if (process.env.NODE_ENV === 'test') {
  exports.helperFunctions = helperFunctions;
};