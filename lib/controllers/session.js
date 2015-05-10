'use strict';

var mongoose = require('mongoose'),
    passport = require('passport');

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) return res.json(401, error);

    req.logIn(user, function(err) {

      if (err) return res.send(err);
      res.json(req.user.userInfo);
    });
  })(req, res, next);
};

/**
 * Update session , for update re-authenticate
 */
exports.update = function (req, res) {


  // check this user had been linked or not
  if (req.body && req.body.hasOwnProperty('state')) {
    req.session.reAuth = req.body.state;
    res.json({state:req.body.state});
  } else {
    res.json({state:false});
  }
  // this account not linked yet, have no facebook data
  //if ( ! (user.facebook && user.facebook.id) ) {
    //next();
  //} else {
    // res.send(Error("Error update Session") )

  //}

};
