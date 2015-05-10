'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

  /**
   * Word Schema
   */   

var WordSchema = new Schema({
  simplifiedChar: String,
  traditionalChar: String,
  //can be word, phrase, idiom or conversation
  category: String,
  heteronyms: {type: Schema.Types.Mixed, default: []},
  questionsWordRecognition: {type: Schema.Types.Mixed, default: []}
});

mongoose.model('Word', WordSchema);
