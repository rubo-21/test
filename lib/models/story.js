'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');
  // mongoose.set('debug', true);

  /**
   * Word Schema
   */    

var StorySchema = new Schema({
  title: String,
  chineseTitle: String,
  term: String,
  termId: String,
  index: Number,
  termIndex: Number,
  description: String,
  keywordsTaught: {type: Schema.Types.Mixed, default: []},
  codes: {type: Schema.Types.Mixed, default: []},
  thumbnailsSrc: []
});

StorySchema
  .virtual('keywordsTaughtAcrossAllLevels')
  .get(function() {
    return _.union(_.pluck(this.keywordsTaught.elementary, 'simplifiedChar'), _.pluck(this.keywordsTaught.intermediate, 'simplifiedChar'));
  });
  
//instance method to return codes based on the level passed in (nursery, elementary, intermediate) and whether there is subtitles
//if the story does not have videos without subtitles, return the video with subtitles
StorySchema.methods.getCode = function(level, subtitles) {
  return this.codes.hasOwnProperty(subtitles) && this.codes[subtitles].hasOwnProperty(level) ? 
    this.codes[subtitles][level] : this.codes['englishSubtitles'][level];
};

mongoose.model('Story', StorySchema);