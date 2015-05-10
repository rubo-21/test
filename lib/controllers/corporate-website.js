'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User');

var nodemailer = require('nodemailer'),
  config = require('../config/config'),
  corporateEmail = require('../config/env/' + process.env.NODE_ENV).corporateEmail;

var smtpTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: corporateEmail.user,
    pass: corporateEmail.password
  }
});

function sendMessage(messageSent, subject, res) {
  var mailOptions = {
    from: 'Jie Jie and Friends',
    to: 'enquiry@kidstartnow.com',
    subject: subject,
    text: messageSent
  }

  smtpTransport.sendMail(mailOptions, function(error, response) {
    if (error) {
      console.log(error);
      res.send({message: "error"});
    } else {
      console.log('Message sent: ' + response.message);
      res.send({message: "success"});
    }
  })
}; //end sendMessage function

function validateEmail(email) {  
  var re = /^([\w-\.*]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return re.test(email)
}

/**
 *  routes relating to corporate website
 */
exports.index = function(req, res) {
  res.render('corporate-main');
};

exports.indexPost = function(req, res) {
  var messageSent = 'name: ' + req.body.name + '\r\nemail: ' + req.body.email
    + '\r\ncomments: ' + req.body.comments;

  if (typeof req.body.email === 'undefined' || typeof req.body.comments === 'undefined' || typeof  req.body.name === 'undefined') return;
  
  //checks that email is valid
  if (!validateEmail(req.body.email)) return;

  sendMessage(messageSent, 'Important: Jie Jie and Friends request for info', res);
  //return res.json('ok');
};



exports.signup = function(req, res) {
  res.render('corporate-signup');
};

exports.login = function(req, res) {
  res.render('corporate-login');
};

exports.referralCode = function(req, res) {
  //tests to see if referral code is valid

  User.findOne({referralCode: req.body.referralCode}, function(err, user) {
    if (err || user === null) {
      // test config referralCode Array
      if (config.hasOwnProperty('referralCode') && config.referralCode.indexOf(req.body.referralCode) > -1) {
        res.cookie('referralCode', 'true', {signed: true});
        return res.send(200);
      } else {
        return res.send(400);
      }

    }

    if (user.referralsAvailable && user.referralsAvailable > 0) {
      res.cookie('referralCode', 'true', {signed: true});
      //referralUserId refers to the person who referred
      res.cookie('referralUserId', user._id.toString(), {signed: true});
      return res.send(200);
    } else {
      return res.send(400);
    }
  })

}
