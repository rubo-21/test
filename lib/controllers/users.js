'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Counter = mongoose.model('Counter'),
  passport = require('passport'),
  _ = require('lodash');

/**
 * Create user
 */
 exports.create = function (req, res, next) {
   var newUser = new User(req.body);
   newUser.provider = 'local';
   newUser.save(function(err) {
     if (err) return res.json(400, err);
     return res.json(req.user.userInfo);
   });
 };

/**
 * add Kid
 *
 */

exports.addKid = function(req, res) {
  var timestamp = new Date().getTime().toString(),
    parentEmail = req.user.email,
    errors = [];

  // OK, to create new kid
  var user = new User(req.body);

  // overwrite field
  user.password = timestamp;
  user.email = timestamp + '@kidstartnow.com';
  user.role = ['kid'];
  user.parentEmail = parentEmail;
  // signup account with us
  user.provider = 'local'

  // try to save one at mongoose

  user.save(function (err) {
    if (err) return res.json(400, err);
    return res.json(200);

  }); // end of user.save
};

/**
 * setup link parentId
 *
 */

exports.setupLinkId = function(req, res, next) {
  var linkId = req.params.parentId;
  // check this user had been linked or not

  User.findOne({_id:linkId}, function(err, user){
    if (err) return err;

    // this account not linked yet, have no facebook data
    if (!(user.facebook && user.facebook.id) ) {
      req.session.linkId = linkId;
      next();
    } else {
      next(Error('Invalid LinkId'));
    }; //end if else bloc
  });
};

/**
 *  Get profile of specified user
 */


/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};


/**
 * Agree term of service, and link user
 */
exports.agreeTOS = function(req, res, next) {

  var userId = req.user._id;

  var tos = req.body.tos;
  var contactEmailFromFacebook = req.body.contactEmailFromFacebook || '';
  var emailNotification = req.body.emailNotification || '';

  console.log(userId, tos, contactEmailFromFacebook, emailNotification)


  // if have linkId, use linkId to find User, and update the fb info to found User
  User.findById(userId, function (err, user) {
    delete req.session.linkId;

      console.log('DELETE session linkId');

      delete req.session.linkId;

      user.tos = tos;
      user.contactEmailFromFacebook = contactEmailFromFacebook;
      user.emailNotification = emailNotification;

      user.save(function(err) {
        if (err) {
          //console.log(err);
          return res.send(400);
        }

        return res.send(200);

      }) // end of user.save
  }) // findById
};

/**
 * Get current user
 */
exports.me = function(req, res) {

  if (req.user) {
    req.user.findMyKids( function(err, kids) {

      if (err) console.log(err);
      var user = req.user.toJSON();

       delete user['hashed_password'];
       user['kids'] = [];

       //ensuring virtual properties are passed to API
       _.each(kids, function(kid) {
        var tempKid = kid.toJSON();
        tempKid.publicBooksRecords = kid.publicBooksRecords;

        //KIV - delete fields that should not be shown
        //many of these fields are legacy and should be removed
        //booksRecords is an internal field and should not be made public
        delete tempKid.star;
        delete tempKid.addressCords;
        delete tempKid.preferredName;
        delete tempKid.referralCode;
        delete tempKid.booksRecords;
        delete tempKid.salt;
        delete tempKid.addressCords;
        delete tempKid.booksRead;
        delete tempKid.userIndex;
        delete tempKid.classVideos;
        delete tempKid.email;
        delete tempKid.mothersDayCoins;
        delete tempKid.points;
        delete tempKid.purchasedTerms;
        delete tempKid.subscriptionLength;
        delete tempKid.subscriptionStart;
        delete tempKid.comments;
        delete tempKid.color;
        delete tempKid.teacherComments;
        delete tempKid.transactionRecords;
        delete tempKid.termsPaid;
        delete tempKid.booksPaid;
        delete tempKid.booksSubscription;

        user['kids'].push(tempKid);
       });

      // add linkId, if have one
      if (req.session.hasOwnProperty('linkId')) {
        user['linkId'] = req.session.linkId;
      }
      // clean up for referralCode, onece user signed in
      if (req.signedCookies || req.signedCookies.hasOwnProperty('referralCode') ) {
        res.clearCookie('referralCode');
        res.clearCookie('referralUserId');

        // try reduce the referralsAvailable
        User.findOneAndUpdate({_id:req.signedCookies['referralUserId']},{$inc: {referralsAvailable:-1}}).exec();
        res.json(user);
      } else {
        res.json(user);
      }
    });
  } else {
    res.send(400)
  }

  //res.json(req.user || null);
};

/**
 * Facebook signin
 */
exports.fbsignin = function(req, res) {
  res.send('Hello FB' || null);
};
