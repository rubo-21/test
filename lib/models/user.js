'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  Counter = mongoose.model('Counter'),
  Hashids = require('hashids'),
  Story = mongoose.model('Story'),
  _ = require('lodash'),
  termsData = require('../config/options').termsData;

var authTypes = ['github', 'twitter', 'facebook', 'google'];

//allows debugging
// mongoose.set('debug', true);

/**
 * User Schema
 */
var UserSchema = new Schema({
  name: String,
  email: String,
  userIndex: Number,
  referralCode: String,
  referralsAvailable: {type: Number, default: 5},
  contactEmailFromFacebook: String,
  parentEmail: {type: String, default: '', index: true},
  firstName: { type: String, default:''},
  middleName: String,
  lastName: { type: String, default:''},
  sex: String,
  level: String,
  birthday: Date,
  coins: {type: Number, default: 12},
  //store the books that the user has finished reading
  booksRead: {type: Schema.Types.Mixed, default: []},
  quizzesTaken: {type: Schema.Types.Mixed, default: []},
  //can be either englishSubtitles or noSubtitles
  subtitles: {type: String, default: 'englishSubtitles'},
  // agree with our term of service
  tos: Boolean,
  emailNotification: Boolean,
  //can be paid or complete access
  booksSubscription: {type : String, default : 'paid' },
  booksPaid: {type: Schema.Types.Mixed, default: {}},
  termsPaid: {type: Schema.Types.Mixed, default: []},

  status: {type: String, default: 'facebook'},

  //record for individual kids on what book they have read until (only for purchasers of our books)
  booksRecords: {type: Schema.Types.Mixed, default: {}},

  //booksLevel only for our physical class students
  bookLevel: String,
  //which character the kid choose
  avatar: {type: String, default: 'initial'},
  avatarCustomization: {type: String, default: 'head'},
  role: {
    type: [String],
    default: ['user']
  },
  parents: { type : [Schema.ObjectId], ref : 'User' },
  active: {type: Boolean, default: true},
  hashedPassword: String,
  provider: String,
  salt: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {}
});

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Basic info to identify the current authenticated user in the app
UserSchema
  .virtual('userInfo')
  .get(function() {
    return {
      'name': this.name,
      'firstName': this.firstName,
      'lastName': this.firstName,
      'email': this.email,
      'booksPaid': this.booksPaid,
      'termsPaid': this.termsPaid,
      'role': this.role,
      'provider': this.provider
    };
  });

// Public profile information
UserSchema
  .virtual('profile')
  .get(function() {
    return {
      'name': this.name,
      'role': this.role
    };
  });

//returns the story records of the child
//if a particular story is not initialized, return a default object
UserSchema
  .virtual('publicBooksRecords')
  .get(function() {
    // if a particular story is not initialized, initialize it
    var results = {},
      bookId;

    //loops through each of the terms
    for (var key in termsData) {      
      //loops through each of the stories uploaded, and if not initialized, initialize a default object
      for (var i = 0; i < termsData[key].uploaded; i++) {
        bookId = key + '_' + i;
        
        if (!this.booksRecords.hasOwnProperty(bookId)) {
          this.booksRecords[bookId] = {
            currLevel: this.bookLevel ? this.bookLevel : 'elementary',
            bestStarsScore: {
              elementary: 0,
              intermediate: 0
            },
            markedRead: false
          }
        }
      }; //end inner for loop
    }; //end outer for loop

    this.markModified('booksRecords');
    this.save(function(err) {
      if (err) throw err;
    });

    return this.booksRecords;
  });
/**
 * Validations
 */

// Validate empty email
UserSchema
  .path('email')
  .validate(function(email) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1) return true;
    return email.length;
  }, 'Email cannot be blank');

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function(hashedPassword) {
    // if you are authenticating by any of the oauth strategies, don't validate
    if (authTypes.indexOf(this.provider) !== -1 || this.role.indexOf('kid') > -1) return true;
    return hashedPassword.length;
  }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
  .path('email')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({email: value}, function(err, user) {
      if(err) throw err;
      if(user) {
        if(self.id === user.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
  return value && value.length;
};

/**
 * Linking old kids
 *
 */

UserSchema.path('email').set( function(email){
  this._oldEmail = this.email;

  return email

});


/**
 * Pre-save hook
 */
UserSchema
  .pre('save', true, function(next, done) {
    var that = this,
      bookId;

    if(this.isNew) {

      Counter.getNextSequence('userIndex').then(function(data) {
        that.userIndex = data;
        var hashids = new Hashids("jjaf-referral-salt", 5);
        that.referralCode = hashids.encrypt(data);
        done();
      });

    } else {
      setTimeout(done, 0);
    };


    //initializes booksRecords
    //loops through each of the terms
    for (var key in termsData) {
      // console.log('termsData - ' + key);
      // console.log('termDataLength - ' + termsData[key].uploaded);
      
      //loops through each of the stories uploaded, and if not initialized, initialize a default object
      for (var i = 0; i < termsData[key].uploaded; i++) {
        bookId = key + '_' + i;

        // console.log(key + '_' + i);
        // console.log(!this.booksRecords.hasOwnProperty(bookId))
        
        if (!this.booksRecords.hasOwnProperty(bookId)) {
          this.booksRecords[bookId] = {
            currLevel: this.bookLevel && this.bookLevel !== 'nursery' ? this.bookLevel : 'elementary',
            bestStarsScore: {
              elementary: 0,
              intermediate: 0
            },
            markedRead: false
          }
        }
      }; //end inner for loop
    }; //end outer for loop

    this.markModified('booksRecords');

    // next();

    //this.model('User').find({ parentEmail: this._oldEmail}, function(err, rows){
    // console.log(this._oldEmail);

    //mongoose.model('User').update({ parentEmail: this._oldEmail},
                                    //{$set: {parentEmail: this.email}}, {multi:true}).exec();

    if (this.role.indexOf('kid') > -1) {
      next();
    } 
    else if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1 ) {
      next(new Error('Invalid password'));
    }
    else {
      next();
    }
  });

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  },

  /**
   * Get own kids
   * @return {Array} the colection of own kids
   * @api public
   */

  findMyKids: function(callback) {
    return this.model('User').find({ parentEmail: this.email}, '-hashed_password -hashedPassword -__v', callback);
  },

  /**
   * Get parent
   * @return {Object}
   * @api public
   */

  findParent: function(callback) {
    if (this.role.indexOf('kid') === -1) throw new Error('user is not a kid');
    return this.model('User').findOne({ email: this.parentEmail}, '-hashed_password -hashedPassword -__v', callback);
  },
  //returns an object containing relevant payment info
  getPurchasedInfo: function(callback) {
    if (this.role.indexOf('kid') === -1) throw new Error('user is not a kid');
    this.findParent(function(err, parent) {
      if (err) callback(err, null);

      callback(null, {
        booksSubscription: parent.booksSubscription,
        booksPaid: parent.booksPaid,
        termsPaid: parent.termsPaid
      });
    });
  },
  //field is a string that is either markedRead, currLevel, bestStarsScores.elementary or bestStarsScores.intermediate
  updateBooksRecords: function(termId, termIndex, field, val, callback) {
    if (this.role.indexOf('kid') === - 1) throw new Error('user is not a kid');
    // if (typeof this.booksRecords[bookId] === 'undefined') throw new Error('stories records for ' + bookId + 'not initialized yet.');
    var bookId = termId + '_' + termIndex;

    //if does not exist, initialize it -> duplicate code with virtual publicBooksRecords
    //need to refactor
    if (!this.booksRecords.hasOwnProperty(bookId)) {
      this.booksRecords[bookId] = {
        currLevel: this.bookLevel ? this.bookLevel : 'elementary',
        bestStarsScore: {
          elementary: 0,
          intermediate: 0
        },
        markedRead: false
      }
    };

    if (field === 'markedRead') {
      this.booksRecords[bookId]['markedRead'] = val;
    } else if (field === 'currLevel') {
      this.booksRecords[bookId]['currLevel'] = val;
    } else if (/bestStarsScore\./.test(field)) {
      var keys = field.split('.');
      console.log(keys);
      console.log(this.booksRecords)
      console.log(this.booksRecords[keys[0]])
      this.booksRecords[termId + '_' + termIndex][keys[0]][keys[1]] = val;
    };

    this.markModified('booksRecords');

    // console.log(this.booksRecords)
    this.save(function(err) {
      if (err) callback(err, null);
      callback(null, 'saved');
    });
  }
};

module.exports = mongoose.model('User', UserSchema);
