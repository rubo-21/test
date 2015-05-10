'use strict';

var path = require('path'),
  request = require('request'),
  wistia = require('../config/env/' + process.env.NODE_ENV).wistia.apiPassword,
  querystring = require('querystring'),
  Q = require('q'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('lodash'),
  termsData = require('../config/options').termsData;

/**
 * Send our single page app
 */

exports.index = function(req, res) {
  res.render('admin-index');
};

exports.updateBooksRecords = function(req, res) {
  console.log('updating');
  var bookId;

  User.find({role: 'kid'}, function(err, kids) {
    if (err) return res.send(404);

    _.each(kids, function(kid) {
      for (var key in termsData) {
        for (var i = 0; i < termsData[key].uploaded; i++) {        
          bookId = key + '_' + i;

          if (!kid.booksRecords.hasOwnProperty(bookId)) {
            console.log('creating - ' + bookId)
            kid.booksRecords[bookId] = {
              currLevel: kid.bookLevel && kid.bookLevel !== 'nursery' ? kid.bookLevel : 'elementary',
              bestStarsScore: {
                elementary: 0,
                intermediate: 0
              },
              markedRead: false
            };
          };

          //KIV -> shouldn't have any nursery currLevel; meant to modify legacy code
          if (kid.booksRecords[bookId].currLevel === 'nursery') kid.booksRecords[bookId].currLevel = 'elementary';

        }; //end inner for loop
      }; //end outer for loop

      kid.markModified('booksRecords');
      kid.save(function(err) {
        if (err) throw err;
      });

    }); //end each block
  }); //end User block

  return res.send(200);
};

exports.getWistiaEvents = function(req, res) {
  pollWistia('2014-04-16', '2014-04-18').then(function(data) {
    res.send(data);
  });
};

//returns a promise that is resolved once all the entries are obtained
//takes start and end date in form 'yyyy-mm-dd'; for mm, 01 refers to Jan not Feb
function pollWistia(start_date, end_date) {
  var deferred = Q.defer(), 
    pageLimit = 10,
    results = [],
    params = {
      api_password: wistia,
      per_page: pageLimit,
      start_date: start_date,
      end_date: end_date
    },
    qs,
    startTimer;

  //recursive helper function
  //wistia only allows 100 calls per minute, but since we make each request only after the last request has been obtained
  //will not hit rate limit  
  function pollWistiaHelper(page) {
    //updates querystring based on page
    params.page = page;
    qs = querystring.stringify(params);

    request('https://api.wistia.com/v1/stats/events.json?' + qs, function(error, response, body) {
      if(!error && response.statusCode === 200) {
        var data = JSON.parse(body);
        results = results.concat(data);
        //if entries returned are less than pageLimit, implies that no more further entries
        if (data.length < pageLimit) {
          deferred.resolve(results);
        } else {
          pollWistiaHelper(page + 1);
        }; // end if-else block
      };
    });    
  }

  pollWistiaHelper(1);
  return deferred.promise;
}