'use strict';

var mongoose = require('mongoose'),
  deepcopy = require('deepcopy'),
  User = mongoose.model('User'),
  Quiz = mongoose.model('Quiz'),
  Story = mongoose.model('Story'),
  _ = require('lodash'),
  Q = require('q'),
  WordsControllers = require('./words'),
  STARS = require('../config/options').stars,
  questionsFunctions = {};

/**
 * GET
 */


Quiz.find({}, function(err, quizzes) {
  _.each(quizzes, function(quiz) {
    if (quiz.questionsTested && quiz.questionsData && quiz.questionsData.length > 0 && quiz.quizId === '536d935673fb47a876000005_1421936802497') {

      var questionsAnswered = {},
        questionKey;

      console.log(quiz._id);

      //tabulates the number of unique questions that were tested
      _.each(quiz.questionsData, function(question) {
        questionKey = question.answer + '_' + question.questionType;
        if (typeof questionsAnswered[questionKey] === 'undefined') questionsAnswered[questionKey] = true;
      });

      if (_.values(questionsAnswered).length === quiz.questionsTested.length) {
        quiz.completed = true;

        quiz.save (function(err) {
          console.log('saving quiz');
        });
      };
    } 
  })
});

exports.createQuiz = function(req, res) {
  Quiz.create(req.body, function(err) {
    if (err) console.log(err);
    return res.send(200);
  });
};

exports.createQuize = function(req, res) {
  var options = req.body,
    quizType = req.params.quizType;

  //error checking
  if (!options || !quizType || !options.kidId || !questionsFunctions.hasOwnProperty(quizType)) {
    return res.send(400);
  };

  Q.all([createQuizHelper(quizType, options), questionsFunctions[quizType](options)])
    .spread(function(quiz, questions) {
      quiz.questionsTested = questions.questionsTested;

      quiz.save(function(err) {
        console.log('saving quiz')
      });

      return {
        rawQuestionsData: questions.rawQuestionsData,
        resources: questions.resources,
        quizId: quiz.quizId
      };
    }).done(function(data) {
      return res.json(data);
    }, function(err) {
      console.log(err)
      return res.send(400);
    });
}  

//helper function that creates a new quiz, and returns a promise 
function createQuizHelper(quizType, options) {
  var deferred = Q.defer();

  if (!options || !options.kidId || !quizType || !options.termId || typeof options.termIndex === 'undefined'
    || !options.userAgent || !options.level) {
    deferred.reject(new Error('Creating quizzes - missing arguments'));
  } else if ((options.level !== 'elementary' && options.level !== 'intermediate')) {
    deferred.reject(new Error('Creating quizzes - invalid arguments'));
  } else {
    Quiz.create({
      kidId: options.kidId,
      quizType: quizType,
      quizId: options.kidId + '_' + (new Date().valueOf()),
      termId: options.termId,
      termIndex: options.termIndex,
      completed: false,
      level: options.level,
      userAgent: options.userAgent,
      //KIV -> set coinPrize to 1
      coinPrize: 1
    }, function(err, quiz) {
      if (err) return deferred.reject(err);
      deferred.resolve(quiz);
    })
  }; //end if-else block

  return deferred.promise;
}

//takes an array of question objects (each question must contain an answeredCorrectly and numberOfTimesAnsweredWrongly field)
//returns the number of stars to be awarded and number of questons answered correctly
function determineNumberOfStars(questionsArray, config) {
  var numberOfQuestionsAnswered,
    numberOfQuestionsAnsweredCorrectlyOnFirstAttempt,
    answeredCorrectlyPercentage,
    stars;

  //error checking
  if (typeof questionsArray === 'undefined' || !(questionsArray instanceof Array) || questionsArray.length === 0) {
    throw new Error('determineNumberOfStars - invalid arguments');
  };

  if (typeof config === 'undefined' || !(config instanceof Array)) throw new Error('determineNumberOfStars - invalid arguments for config');

  numberOfQuestionsAnswered = questionsArray.length;
  numberOfQuestionsAnsweredCorrectlyOnFirstAttempt = _.filter(questionsArray, function(question) {

    if (!question.hasOwnProperty('numberOfTimesAnsweredWrongly') || !question.hasOwnProperty('answeredCorrectly')) {
      throw new Error('determineNumberOfStars - invalid array passed in');
    }
    //only return correct if kid got it correct on first attempt
    return question.answeredCorrectly && question.numberOfTimesAnsweredWrongly === 0;
  }).length;
  answeredCorrectlyPercentage = numberOfQuestionsAnsweredCorrectlyOnFirstAttempt / numberOfQuestionsAnswered;

  //config represents the number of stars that will be obtained (index) if answeredCorrectlyPercentage is equal or less than (value)
  //thus config[0] === 0 means that 0 stars will be obtained if answeredCorrectlyPercentage is 0%
  //config[1] === 0.5 means that 1 star will be ontained if answeredCorrectlyPercentage is > 0% and <= 50%
  //config[2] === 0.8 means that 2 stars will be ontained if answeredCorrectlyPercentage is > 50% and <= 80%
  stars = 0;
  while ((stars < config.length - 1) && (answeredCorrectlyPercentage >= config[stars + 1])) {
    stars++;
  };

  return [stars, numberOfQuestionsAnsweredCorrectlyOnFirstAttempt];
}; //end determineNumberOfStars function

var updateQuizHelpers = {};


exports.updateQuiz = function(req, res) {

  Quiz.findOne({quizId: req.params.quizId}, function(err, quiz) {
    if (err) return res.send(404);

    updateQuizHelpers['uncompleted'](quiz, req.body)
      .then(function() {
        if (req.body.completed) return updateQuizHelpers['completed'](quiz, req.body);
      })
      .done(function(data) {
        console.log(data)
        return res.json(data);
      }, function() {
        return res.send(404);
      });
  });
}; //end update quiz


/*
 * helper functions that update the quiz
 */

updateQuizHelpers['uncompleted'] = function(quiz, options) {

  var data = options.data,
    deferred = Q.defer();
  
  quiz.questionsData.push(data);
  quiz.markModified('questions');

  quiz.save(function(err) {
    if (err) return deferred.reject(err);
    return deferred.resolve({
      status: true
    });
  });

  return deferred.promise;
};

updateQuizHelpers['completed'] = function(quiz, options) {

  var data = options.data,
    deferred = Q.defer(),
    starsObtainedFromQuiz, bestStarsScore;
  
  starsObtainedFromQuiz = determineNumberOfStars(quiz.questionsData, STARS)[0]; 

  User.findOne({_id: quiz.kidId}, function(err, user) {
    user.coins += quiz.coinPrize;
    quiz.completed = true;

    bestStarsScore = user.booksRecords[quiz.termId + '_' + quiz.termIndex]['bestStarsScore'][quiz.level];

    if (bestStarsScore < starsObtainedFromQuiz) {
      user.updateBooksRecords(quiz.termId, quiz.termIndex, 'bestStarsScore.' + quiz.level, starsObtainedFromQuiz, function(err) {
        if (err) return deferred.reject(err);
      });
    };

    quiz.save(function(err) {
      if (err) return deferred.reject(err);
    });

    user.save(function(err) {
      if (err) return deferred.reject(err);
    });

    deferred.resolve({
      starsObtainedFromQuiz: starsObtainedFromQuiz,
      bestStarsScore: user.booksRecords[quiz.termId + '_' + quiz.termIndex]['bestStarsScore'][quiz.level]
    });
  });

  return deferred.promise;
};

/* 
 * strategies to get questions 
 * should return a promise
*/

//returns an object containing three fields - rawQuestionsData (array), questionsTested (array) and resources(obj)
function getQuestionsForBook(options) {
  var deferred = Q.defer(),
    results = {
      rawQuestionsData: [],
      questionsTested: [],
      resources: {}
    },
    keywords,
    termId = options.termId,
    termIndex = options.termIndex,
    level = options.level;

  results.resources.sounds = [];

  if (!termId || typeof termIndex === 'undefined' || !level) {
    deferred.reject(new Error('getQuestionsForBook - missing arguments'));
  } else if (termIndex < 0 || (level !== 'elementary' && level !== 'intermediate')) {
    deferred.reject(new Error('getQuestionsForBook - invalid arguments'));
  } else {
    //finds the appropriate story
    Q.all([Story.findOne({termId: termId, termIndex: termIndex}).exec(), WordsControllers.meaningsChecker()])
      .spread(function(story, meaningsChecker) {
        keywords = meaningsChecker(story.keywordsTaught[level]);
        for (var i = 0; i < keywords.length; i++) {
          //always test the words
          var temp = {
            answer: keywords[i].simplifiedChar,
            meaningIndex: keywords[i].meaningIndex,
            questionType: 'wordRecognition',
            otherChoices: keywords[i].meaning.questionsWordRecognition,
          };
          
          //gets a list of all the sounds needed for the quiz
          _.each([temp.answer].concat(temp.otherChoices), function(element) {
            if (results.resources.sounds.indexOf(element) === -1) {
              results.resources.sounds.push(element);
            };
          });

          results.rawQuestionsData.push(temp);
          results.questionsTested.push(keywords[i].simplifiedChar + '_' + 'wordRecognition');

          //only test pictures if there is an explainerImage
          //for now, the choices tested are the same as for wordRecognition
          if (keywords[i].meaning.explainerImagesSrc.length > 0) {
            temp = deepcopy(temp);
            temp.questionType = 'pictureRecognition';
            //KIV: use the first image now; might want to make it test random pictures in the future
            temp.imageSrc = keywords[i].meaning.explainerImagesSrc[0];
            
            results.rawQuestionsData.push(temp);
            results.questionsTested.push(keywords[i].simplifiedChar + '_' + 'pictureRecognition');
          };
        } //end for loop

        deferred.resolve(results);
      });
  }; //end if-else block

  return deferred.promise;
};

questionsFunctions['book'] = getQuestionsForBook;

if (process.env.NODE_ENV === 'test') {
  exports.createQuizHelper = createQuizHelper;
  exports.determineNumberOfStars = determineNumberOfStars;
  exports.questionsFunctions = questionsFunctions;
  exports.updateQuizHelpers = updateQuizHelpers;
}