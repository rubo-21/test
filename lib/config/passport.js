'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    config = require('./config'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy;

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  console.log('serialising user: ' + user.id);
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  console.log('deserialising user: ' + id);
  User.findOne({
    _id: id
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    done(err, user);
  });
});

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'This password is not correct.'
        });
      }
      return done(null, user);
    });
  }
));

// Backup the old fb stratefy not require referralCode
// add facebook strategy, for now, alwayse signup as parents
// if we already have same email address for this account, just update facebook info
//passport.use(new FacebookStrategy({
    //clientID: config.facebook.clientID,
    //clientSecret: config.facebook.clientSecret,
    //callbackURL: config.facebook.callbackURL
  //}, function(accessToken, refreshToken, profile, done) {

  //// found same facebook.id or same email
  //User.findOne({
    //$or: [{
        //'facebook.id': profile.id
      //}, {
        //'email': profile.emails[0].value
      //}
    //]
  //}, function(err, user) {
    //if (err) {
      //return done(err);
    //}

    //if (!user) {
      //// create new parents user
      //user = new User({
        //name: profile.displayName,
        //email: profile.emails[0].value,
        //role: ['parent'],
        //provider: 'facebook',
        //facebook: profile._json
      //});
      //user.save(function(err) {
        //if (err) {
          //console.log(err);
        //}
        //return done(err, user);
      //});
    //} else if (typeof user.provider === 'undefined' || user.provider === 'local') {
      //// had same email account signup with already, update he/she facebook info
      //user.role = ['parent'];
      //user.provider = 'facebook';
      //user.facebook = profile._json;
      //user.save(function(err) {
        //if (err) {
          //console.log(err);
        //}
        //return done(err, user);
      //});
    //} else {
      //return done(err, user);
    //}
  //});
//}));


// faceback strategy require rederralCode to create new user
passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL,
    profileFields: ['id', 'displayName', 'name', 'gender', 'profileUrl', 'location', 'timezone', 'hometown', 'about', 'emails'],
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {

  console.log('trying to loging');
  console.log(profile)

  //kiv -> bug fix as facebook profile sometimes does not have email
  // if (!profile.emails) {
  //   profile.emails = ['dummyemail@dummydummydummy.com'];
  // }

  // found same facebook.id or same email
  console.log('___________');
  console.log(profile);
  User.findOne({
    $or: [{
        'facebook.id': profile.id
      }, {
        'email': profile.emails[0].value.toLowerCase()
      },
      {
        'facebook.email': profile.emails[0].value.toLowerCase()
      }
    ]
  }, function(err, user) {
    if (err) {
      console.log('error logging in via facebook strategy: ');
      return done(err);
    }

    //if (!user && req.signedCookies && req.signedCookies.hasOwnProperty("referralCode")) {
    if (!user) {
      // TODO should hook decrease the referValue, and maybe clear the referralCode cookie
      // create new parents user
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        role: ['parent'],
        provider: 'facebook',
        facebook: profile._json
      });
      user.save(function(err) {
        if (err) {
          console.log(err);
        }
        return done(err, user);
      });
    } else if ( user && (typeof user.provider === 'undefined' || user.provider === 'local') ) {
      // had same email account signup with already, update he/she facebook info
      user.role = ['parent'];
      user.provider = 'facebook';
      user.facebook = profile._json;
      user.save(function(err) {
        if (err) {
          console.log(err);
        }
        return done(err, user);
      });
    } else {
      //KIV - facebook's profile id seems to be different after migration -> resaving
      // user.facebook = profile._json;
      // user.save(function(err) {
      //   if (err) {
      //     console.log(err);
      //   }
        return done(err, user);
      // })
    }
  });
}));


// add facebook strategy, for now, alwayse signup as parents
// if we already have same email address for this account, just update facebook info
passport.use('fblink', new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL + '_link',
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {

    // must have linkId in user req.session, or this
    // is not a validate action
    if (req.session && req.session.hasOwnProperty('linkId')){
      User.findOne({_id:req.session.linkId }, function(err, user){

        // not linked before
        console.log(user);
        if (user && ! (user.facebook && user.facebook.id) ){

          console.log('Going to link this userId', req.session.linkId );

          user.role = ['parent'];
          user.provider = 'facebook';
          user.facebook = profile._json;
          user.save(function(err) {
            if (err) {
              console.log(err);
            }
            return done(err, user);
          });

        } else {
          return done(Error('Invalid linkId'), null)
        }; //end if else block
      });
    } // if req.session has linkId


}));


module.exports = passport;
