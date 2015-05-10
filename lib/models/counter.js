'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  Q = require('q');

  /**
   *  Schema
   */    

//based off http://docs.mongodb.org/manual/tutorial/create-an-auto-incrementing-field/
var CounterSchema = new Schema({
  category: String,
  seq: {type: Number, default: 100}
});

CounterSchema.statics.getNextSequence = function(category) {
  var deferred = Q.defer();
  this.findOneAndUpdate({category: category}, {$inc: {seq: 1}}, {new: true}, function(err, counter) {
    deferred.resolve(counter.seq);
  });  
  return deferred.promise;
};

mongoose.model('Counter', CounterSchema);