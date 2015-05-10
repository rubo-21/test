'use strict';

var index = require('./controllers'),
  users = require('./controllers/users'),
  kids = require('./controllers/kids'),
  session = require('./controllers/session'),
  passport = require('passport'),
  words = require('./controllers/words'),
  stories = require('./controllers/stories'),
  store = require('./controllers/store'),
  utilities = require('./controllers/utilities'),
  quizzes = require('./controllers/quizzes'),
  admin = require('./controllers/admin'),
  analytics = require('./controllers/analytics'),
  corporateWebsite = require('./controllers/corporate-website');


var middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  // app.post('/api/users', users.create);
   app.post('/api/kids', users.create);
  //app.put('/api/users', users.changePassword);

  // since login via facebook this turn to agree our term of service
  app.put('/api/users', users.agreeTOS);
  //app.get('/api/users/setupLinkId/:parentId', users.setupLinkId);
  app.get('/api/users/me', users.me);

  app.post('/api/session', session.login);
  app.put('/api/session', session.update);
  app.del('/api/session', session.logout);

  //kids routes
  app.put('/api/kids/:kidId/:field', kids.updateKid);

  app.get('/api/words', words.getWords);
  app.get('/api/stories/:kidId', stories.getStories);

  //transaction routes
  app.get('/api/transactions', store.getUserTransactions);
  app.get('/api/transactions/:hashCode', store.getTransaction);

  //quizzes routes
  app.post('/api/quizzes', quizzes.createQuiz);
  app.put('/api/quizzes/:quizId', quizzes.updateQuiz);

  app.post('/api/quizzes/:quizType', quizzes.createQuize);

  //utility api routes
  app.get('/api/utilities/meanings/:char', utilities.getCharacterMeanings);

  //miscellanous routes
  app.get('/api/wistiaevents', admin.getWistiaEvents);


  //admin api routes
  app.post('/api/admin/booksrecords', admin.updateBooksRecords);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });

  // store
  //app.get('/store/create',  store.create);
  // purchase on story
  app.post('/api/store', middleware.requireLogin,  store.create);
  app.get('/store/create/:termId/:termIndex', middleware.requireLogin,  store.create);
  // purchase on term
  app.get('/store/create/:termId', middleware.requireLogin,  store.create);
  app.get('/store/execute',  store.execute);
  app.get('/store/cancel',  store.cancel);

  //utility routes
  app.get('/utilities/meanings', utilities.meanings);

  //analytics websites
  app.get('/analytics', analytics.index);


  //corporate website routes
  app.get('/', corporateWebsite.index);
  app.get('/signup', corporateWebsite.signup);
  app.post('/referralcode', corporateWebsite.referralCode);
  app.post('/contact', corporateWebsite.indexPost);

  //admin routes
  app.get('/admin', admin.index);

  // facebook login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: [
    'email'],
    failureRedirect: '/' }), users.fbsignin);

  // without referralCode
  //app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/',
    //successReturnToOrRedirect: '/portal/addparent'}), users.fbsignin);
  // with referralCode
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { scope: [
    'email'],
    failureRedirect: '/signup',
    successReturnToOrRedirect: '/portal/addparent'}), users.fbsignin);

  // link existed users from facebook
  app.get('/auth/facebook/callback_link', passport.authenticate('fblink', { scope: [
    'email'],
    failureRedirect: '/',
    successReturnToOrRedirect: '/portal/addparent'}), users.fbsignin);

  app.get('/auth/facebook/:parentId', users.setupLinkId, passport.authenticate('fblink', { scope: [
    'email'],
    failureRedirect: '/' }), users.fbsignin);

  //partials routing -> must come first otherwise leads to infinite loop
  app.get('/partials/*', index.partials);
  app.get('/admin-partials/*', index.partials);

  // All other routes to use Angular routing
  // app.get('/admin*', admin.index);
  app.get('/portal*', middleware.setUserCookie, index.index);
};
