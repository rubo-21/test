'use strict';

var mongoose = require('mongoose'),
  config = require('../config/config'),
  paypal = require('paypal-rest-sdk'),
  Story = mongoose.model('Story'),
  User = mongoose.model('User'),
  Transaction = mongoose.model('Transaction'),
  _ = require('lodash'),
  Q = require('q'),
  termsData = require('../config/options').termsData;

var storyBundlePrice = '19.99', storySinglePrice = '2.99';
var useCurrency = 'SGD';


// init paypal configuration
paypal.configure(config.paypal);

// get all Terms
function getUniqTerms() {
  return Story.find().distinct('term').exec().then( function(rows) {
     return Story.find({term: {$in:rows}, termIndex:0}).exec();
  });
}

exports.getUniqTerms = getUniqTerms;
/**
 *  GET
 */
// get distinct terms
exports.getDistinctTerms = function(req, res) {
  getUniqTerms().then(function(rows){
    return res.json(rows);
  });
};

// get all stories
// exports.getAllStories = function(req, res) {
//   Story.find()
//     .sort({term:1, termIndex:1})
//     .exec().then( function(rows){

//     return res.json(rows);
//   });
// };

/**
 *  require login
 *  validate transaction for active,
 *  the Transaction must exist && purchaserId not link to any User yet
 *
 */
exports.getTransaction = function(req, res) {

  //var ts = new Transaction();
  //ts.save();

  var hashCode = req.params.hashCode;
  Transaction.findOne({key:hashCode},  function(err, row){

    if (err) console.log(err);

    if (row && typeof(row.purchaserId) === 'undefined' ) {
      return res.json({status:"OK"})
    } else {
      return res.send(404);
    }

  });


};

/**
 *  require login
 */
// get current user all transactions (purchased items)
exports.getUserTransactions = function(req, res) {
  var userId = req.user._id;

  Transaction.find({purchaserId: userId}, 'itemName purchaserId purchaserName', function(err, rows){

    if (err) console.log(err);

    res.json(rows);
  })
};

/**
 * PayPal payment integration
 * requireLogin && pick up store Item which for now mean Terms
 *
 */

exports.create = function (req, res, next) {
  var termId = req.body.termId;
  var termIndex = req.body.termIndex ? parseInt(req.body.termIndex) : null;

  var isStory = termId && termIndex;

  var user = req.user;
  var return_url = config.storeUrl + 'store/execute';
  var cancel_url = config.storeUrl + 'store/cancel';
  var query = {};
  var payment;
  var amount;
  var itemName;
  var termIndexes = [];
  var goPayPal = true;


  //return res.json({termId:termId, termIndex:termIndex})
  // compose query
  //
  if (isStory) {
    query = {termId: termId, termIndex:termIndex};
  } else {
    query = {termId: termId};
  }




  // load the terms first

  Story.find(query, function(err, rows){
    console.log('Going find', query);
    if (err || rows.length === 0) {
      //console.log(err)
      return next(err);
    };

    /////////////////////////////
    // count the payment
    if (rows.length > 0)  {

      if (isStory) {
        // user buy one story
        amount = storySinglePrice;
        itemName = rows[0].term +
                    ' ( Story ' +
                    (rows[0].termIndex+1) +
                    ' )';
        termIndexes = [rows[0].termIndex];
      } else {

        amount = storyBundlePrice;
        itemName = rows[0].term +
                    ' ( Term )';
        termIndexes = _.pluck(rows, 'termIndex');

      };

      // check the user bought this story already
      if (isStory) {
        // to check user had booksPaid
        if (user.booksPaid && user.booksPaid.hasOwnProperty(termId) &&
            user.booksPaid[termId].indexOf(termIndex) !== -1) {
            // had this story
              goPayPal = false;
              //res.redirect("/portal/store");
              res.json({status:"Already purchased this story."})
        } else if (user.termsPaid && user.termsPaid.indexOf(termId) > -1) {
          // user had bought this term
              goPayPal = false;
              //res.redirect("/portal/store");
              res.json({status:"Already purchased this story."})
        }
      } else {
          // the check for termsPaid happen also after Story query to compare the stories had purshased
          // the user purchase whole term, to check exist in termsPaid or not
          if (user.termsPaid && user.termsPaid.indexOf(termId) > -1) {
              // already had this term
              goPayPal = false;
              //res.redirect("/portal/store");
              res.json({status:"Already purchased this story."})

          } else if (user.booksPaid && user.booksPaid.hasOwnProperty(termId) && user.booksPaid[termId].length === termsData[termId].numberOfBooks) {
              // the user had all stories, current in this term
              //return res.render('store/create', {
                //status: 'You already bought this story.'
              //});
              goPayPal = false;
              //res.redirect("/portal/store");
              res.json({status:"Already purchased this story."})

          }
      }

      payment = {
      'intent': 'sale',
      'payer': {
        payment_method:'paypal'
      },

      'transactions': [{
        'item_list': {
            'items': [{
                'name': itemName,
                'sku': itemName,
                'price': amount,
                'currency':  useCurrency,
                'quantity': 1
            }]
        },
        'amount': {
          'currency': useCurrency,
          'total': amount
        },
        'description': itemName
      }]
    };

    console.log(config.storeUrl);
    console.log(return_url);
    console.log(cancel_url);
    console.log(termIndexes);

    payment.redirect_urls = {
      'return_url': return_url,
      'cancel_url': cancel_url
    };

    // test success paypal payment create
    if (goPayPal) {
      paypal.payment.create(payment, function (error, payment) {
        if (error) {
          res.json('store/error', { 'error': error });
        } else {
          //req.session.paymentId = payment.id;
          req.session.payment = {
            paymentId: payment.id,
            termId: termId,
            isStory: isStory,
            termIndexes: termIndexes
          }
          var redirectUrl;
           for(var i=0; i < payment.links.length; i++) {
             var link = payment.links[i];
             if (link.method === 'REDIRECT') {
               redirectUrl = link.href;
             }
           }

           var header = 'Buy ' + rows[0].term +  ' ( USD' + amount + ' )';
           payment.header = header
           //var paymentDetails = JSON.stringify(payment, null, 2);
          //res.render('store/create', { 'payment': payment , redirectUrl: redirectUrl} );
          //res.redirect(redirectUrl);
          res.json({status:"OK", url:redirectUrl});
        }
      });

    }


    } // rows.length > 0

  });
  // end of paypal payment create

};


/**
 *  require login
 *  validate transaction from paypal with paymentId
 *
 */
exports.execute = function (req, res) {
  var paymentObj = req.session.payment;
  var isStory = paymentObj.isStory;
  var user = req.user;
  var payerId = req.query.PayerID;

  var details = { 'payer_id': payerId };
  var payment = paypal.payment.execute(paymentObj.paymentId, details, function (error, payment) {
    if (error) {
      res.render('store/error', { 'error': error });
    } else {
      console.log(JSON.stringify(payment));
      var ts = new Transaction();
      ts.purchaserId = req.user._id;
      ts.purchaserName = req.user.name;
      ts.log = payment;
      if (payment.transactions.length > 0) {
        ts.itemName = payment.transactions[0].description;
        ts.costOfItem = payment.transactions[0].amount.total;
      }

      // save transaction
      ts.save();

      // save to usermodel
      if (isStory) {
        // purchase only story
        if (typeof user.booksPaid === 'undefined') {
          user.booksPaid[paymentObj.termId] = paymentObj.termIndexes;
        } else {
          if (user.booksPaid.hasOwnProperty(paymentObj.termId)) {
            var newTermIndexes = user.booksPaid[paymentObj.termId].concat(paymentObj.termIndexes);
            user.booksPaid[paymentObj.termId] = _.uniq(newTermIndexes) ;
          } else {
            user.booksPaid[paymentObj.termId] = paymentObj.termIndexes;
          }
        }
        user.booksPaid[paymentObj.termId].sort() ;
        user.markModified('booksPaid');
      } else {
        // purchase whole term
        if (typeof user.termsPaid === 'undefined') {
          user.termsPaid = [paymentObj.termId];
        } else {
          user.termsPaid.push(paymentObj.termId);
        }

        user.markModified('termsPaid');
      }

      user.save(function(err) {
        if (err) res.json(400, err);

        delete req.session.payment;
        res.redirect("/portal/store");
      })
      //delete req.session.payment;
      //res.render('store/execute', { 'payment': JSON.stringify(payment )});
      // return to portal
    }
  });
};

exports.cancel = function (req, res) {
  //res.render('store/cancel');
  res.redirect("/portal/store");
};

