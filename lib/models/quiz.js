'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , _ = require('lodash');

/**
 * Quiz Schema
 */

//
var QuizSchema = new Schema({
  quizId: String,
  completed: Boolean,
  kidId: Schema.Types.ObjectId,
  termId: String,
  termIndex: Number,
  quizType: String,
  level: String,
  // term: String,
  // title: String,
  // bookLevel: String,
  // bookId: String,
  numberOfQuestionsAnsweredCorrectly: Number,
  questionsData: [],
  questionsTested: {type: Schema.Types.Mixed, default: []},
  userAgent: String,
  //the number of coins to award when quiz is completed
  coinPrize: Number
});

QuizSchema.statics.getFinalResultsOfQuestionsAnswered = function(kidId, cb) {
  var results = [];
  this.model('Quiz').find({kidId: kidId}, function(err, quizzes) {
    if (err) {
      cb(err, null);
    } else {
      _.each(quizzes, function(quiz) {
        results = results.concat(_.filter(quiz.questionsData, function(entry) {
          return entry.answeredCorrectly;
        }));
      });

      cb(null, results);
    }
  });
};

mongoose.model('Quiz', QuizSchema);