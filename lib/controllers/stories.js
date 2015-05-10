'use strict';

var mongoose = require('mongoose'),
  Story = mongoose.model('Story'),
  User = mongoose.model('User'),
  Words = require('./words'),
  _ = require('lodash'),
  Q = require('q'),
  TERMSDATA = require('../config/options').termsData;

/**
 * GET
 */

//returns a collection of stories
exports.getStories = function(req, res) {

  var kidId = req.params.kidId;
  console.log('getting stories of ' + kidId)
  User.findOne({role: 'kid', _id: kidId}, function(err, kid) {
    if (err || kid === null) return res.send(404);
      getStoriesHelper(kid).then(function(listOfStories) {
        return res.json(listOfStories);
      }, function(err) {
        console.log(err);
        return res.send(400);
      }).done();
  });
};

//returns a promise that resolves to a list of stories for a particular kid
function getStoriesHelper(kid) {
  if (typeof kid === 'undefined') throw new Error('kid not passed in');

  var deferred = Q.defer(),
    isNursery = kid.status === 'attending class' && kid.bookLevel === 'nursery',
    listOfStories = [],
    booksRecords = kid.publicBooksRecords,
    codes,
    storyId,
    difficulty,
    tempStory;

  //Q.nbind converts a node callback into a promise
  Q.all([Q.nbind(kid.getPurchasedInfo, kid)(), Words.meaningsChecker(), Story.find({}).exec()])
    .spread(function(purchasedInfo, meaningsChecker, stories) {

      //for every story
      _.map(stories, function(story) {
        storyId = story.termId + '_' + story.termIndex;
        console.log(story)
        //error checking
        if (!booksRecords.hasOwnProperty(storyId)) deferred.reject(new Error(storyId + ' not present in booksRecords object.'));
        //find the appropriate difficulty
        difficulty = isNursery ? 'nursery' : booksRecords[storyId].currLevel;
        //need to convert to json because we will be adding and remove properties
        tempStory = story.toJSON();
      
        //sets code and keywords
        tempStory.code = story.getCode(difficulty, kid.subtitles);

        if (!isNursery) {
          tempStory.keywordsTaught = meaningsChecker(story.keywordsTaught[difficulty]);    
        }
        tempStory.keywordsTaughtAcrossAllLevels = story.keywordsTaughtAcrossAllLevels;
        delete tempStory.codes;

        //sets availability for all the stories
        setAvailability(tempStory, purchasedInfo.booksSubscription, purchasedInfo.booksPaid, purchasedInfo.termsPaid, TERMSDATA);

        if (!isNursery || TERMSDATA[story.termId]['nursery'].indexOf(story.termIndex) !== -1) listOfStories.push(tempStory);
        // console.log(listOfStories)
      });      
      deferred.resolve(listOfStories);

    }).done();

  return deferred.promise;
};


//takes in a story object, and sets two variables for it (availableForPurchase and availableForViewing)
//does not return a new copy and instead modifies the story object directly
function setAvailability(story, booksSubscription, booksPaid, termsPaid, termsData) {
  //determines which books should be given as a free sample

  if (termsData.hasOwnProperty(story.termId) && termsData[story.termId].hasOwnProperty('free') && 
    termsData[story.termId]['free'].indexOf(story.termIndex) > -1) {
    story.availableForViewing = true;
    story.availableForPurchase = false;
    return;    
  };

  //if parents have complete access, they should be able to view all books and not be able to purchase any
  if (booksSubscription === 'completeAccess') {
    story.availableForViewing = true;
    story.availableForPurchase = false;
    return;
  }

  //for paid members
  //if already bought in booksPaid, book can be viewed
  if (booksPaid[story.termId] && booksPaid[story.termId].indexOf(story.termIndex) > -1) {
    story.availableForViewing = true;
    story.availableForPurchase = false;
  } 
  //if parent bought the whole term, book can be viewed
  else if (termsPaid && termsPaid.indexOf(story.termId) > -1) {
    story.availableForViewing = true;
    story.availableForPurchase = false;
  } 
  //otherwise the book is not viewable and can be purchased
  else {
    story.availableForViewing = false;
    story.availableForPurchase = true;
  }
}; //end setAvailability function

exports.getStoriesHelper = getStoriesHelper;
exports.setAvailability = setAvailability;
