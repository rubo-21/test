'use strict';

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , hat = require('hat');

// const
// UUID has 128 bit long, which wiill product 32 base 16 chars
// 64 bit long will give us 16 chars long hash
var hashbit = 64;

/**
 * Transaction Schema
 */

var TransactionSchema = new Schema({
  itemName: String
  //, key: {type: String, default: '', index: true, unique: true}
  , key: {type: String, default: '', index: true}
  , date: {type: Date, default: Date.now}
  , expire: Date
  //the amount of the selected item purchase
  , numberOfItems: Number
  , costOfItem: Number,
  purchaserId: Schema.Types.ObjectId,
  purchaserName: String,
  log: {}
});

/**
 * Pre-save hook
 */

TransactionSchema
  .pre('save', function(next) {
    // only gen key at first time.
    if(this.isNew) {
      this.key = hat(hashbit, 16);  // use 16 base hash code
      next();
    } else {
      next();
    }

  });


mongoose.model('Transaction', TransactionSchema);
