'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash'),
  Q = require('q');

  /**
   *  Schema
   */    

var AnalyticSchema = new Schema({
});   

mongoose.model('Analytic', AnalyticSchema);