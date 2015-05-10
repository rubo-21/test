'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {

  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {

      var user = req.user.userInfo;
      // inject the reAuth
      if (req.session.hasOwnProperty("reAuth")) {
        user.reAuth = req.session.reAuth;

      };
      res.cookie('user', JSON.stringify(user));
    }
    next();
  },

  /**
   * Require user to login
   */
  requireLogin: function(req, res, next) {
    if (!req.isAuthenticated()) {
    // have session support
      if (req.session) {
        req.session.returnTo = req.url;
      }
      return res.redirect('/portal');
    }
    next();
  }
};

