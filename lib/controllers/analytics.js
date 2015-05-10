'use strict';

var mongoose = require('mongoose'),
  Analytic = mongoose.model('Analytic'),
  _ = require('lodash'),
  Q = require('q');

exports.index = function (req, res) {
  res.render('admin/analytics');
};