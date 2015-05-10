'use strict';

module.exports = {
  env: 'production',
  facebook: {
    clientID: "537293219738247",
    clientSecret: "3d9f17ebba96cab7c6975d3e628e5042",
    callbackURL: "http://www.boshipanda.com/auth/facebook/callback"
  },

  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         //'mongodb://localhost/kidstartnow'
         'mongodb://testaccount:testpassword@ds029891-a0.mongolab.com:29891/heroku_app31276907'
  },
  wistia: {
    apiPassword: '68db9407308cf5b9f50727e085118db049b2d8ea'
  },
  corporateEmail: {
    user: 'support@kidstartnow.com',
    password: 'kidstartnowsupport123'
  },
  // fill this url for compose paypal callback url
  // test account terry-jiejie@gmail.com
  // password 12345678
  //storeUrl: "http://localhost:9000/",
  //paypal: {
    //"host" : "api.sandbox.paypal.com",
    //"port" : "",
    //client_id: "ATZoaBCAlGXWH6G0tyHFcLH073T39Nwybh88mzYsX_7mDR6I5FR6Gx5FwJM-",
    //client_secret: "EEqPsRDyvkmImfYSRnh0S9KhmTFB8-fP_Bco6DLgkLCxkoTalKfxrp3Z_-72"
  //}
};
