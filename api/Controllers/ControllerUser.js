const mongoose = require('mongoose');
const User = require('../models/user');
const Authorization = require('../models/authorization');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const MESSAGES = require('../Messages');

/**
Provide check for and email account
    @params
        email {string}
**/

function find_email(request, response, callback) {
    var email = request.sanitize(request.body.email);
    User.find({email: email}, function(err, docs) {
        if (err) {
            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
        } else {
            if (docs.length == 0 ) {
                request.finalResponse = MESSAGES.error.e3;
                callback();
            } else {
                request.finalResponse = docs[0];
                callback();
            }
        }
    });
}

/**
Provide API for Account
  Account Register -> POST /users/signup
    @params
        email {string}
        password {string}
**/

function create_user(request, response, callback) {
    var email = request.sanitize(request.body.email);
    var password = request.sanitize(request.body.password);

    find_email(request, response, function (result) {  // result é o que vem dentro do callback() , neste caso o resulto é null
        if (request.finalResponse.http == 400) {
            bcrypt.hash(password, 10, function(err, hash) {
                if (err) {
                    response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
                } else {
                    var user = new User({
                        email: email,
                        password: hash
                    });
                    user.save(function (err, result) {
                        if (err) {
                            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
                        } else {
                            if (result.length == 0) {
                                response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
                            } else {
                                request.finalResponse = MESSAGES.success.s1;
                                callback();
                            }
                        }
                    });       
                }
            });
        } else {
            request.finalResponse = MESSAGES.error.e2;
            callback();
        }  
    });
}; 

/**
Provide API for Account
  Account authentication -> POST /users/auth
    @params
        email {string}
        password {string}
**/

function authentication(request, response, callback) {
    var email = request.sanitize(request.body.email);
    var password = request.sanitize(request.body.password);
    
    User.find({email: email}, function(err, docs) {
        if (err) {
            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);            
        } else {
            if (docs.length < 1) {
                response.status(MESSAGES.error.e3.http).send(MESSAGES.error.e3);               
            } else {
                bcrypt.compare(password, docs[0].password, function(err, result) {
                    if (err) {
                        response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);                             
                    } else {
                        if (result) {
                            const token = jwt.sign(
                                {
                                  email: docs[0].email
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn: "24h"
                                }
                              );
                              var auth = new Authorization({
                                  user: docs[0]._id,
                                  token: token
                              });
                              auth.save();
                              response.status(MESSAGES.success.s3.http).json({
                                  token: token,
                                  http: MESSAGES.success.s3.http,
                                  code: MESSAGES.success.s3.code,
                                  message: {
                                      pt: MESSAGES.success.s3.message.pt,
                                      eng: MESSAGES.success.s3.message.eng
                                  }
                              });
                        } else {
                            response.status(MESSAGES.error.e6.http).send(MESSAGES.error.e6);
                        }                                                                  
                    }
                });    
            }
        }
    });
}

/**
Provide API for Account
  reading all users -> get /users/
    @params
    -
**/

function read_users(request, response, callback) {
    User.find(function(err, docs) {
        if (err) {
            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
        } else {
            if (docs.length == 0) {
                response.status(MESSAGES.error.e4.http).send(MESSAGES.error.e4);               
            } else {
                var resp = JSON.parse(JSON.stringify(docs));
                request.finalResponse = resp;
                callback();                
            }
        }
    });
}

/**
Provide API for Account
  check authentication with an receveid token
    @params
    -
**/

function check_auth(request, response, callback) {
    try {
        var token = request.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, process.env.JWT_KEY);
        request.userData = decoded;
        callback();    
    } catch (error) {
        response.status(MESSAGES.error.e5.http).send(MESSAGES.error.e5);  
    }
}

function read_authorizations(request, response, callback) {
    Authorization.find(function(err, docs) {
        if (err) {
            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
        } else {
            if (docs.length == 0) {
                response.status(MESSAGES.error.e4.http).send(MESSAGES.error.e4);               
            } else {
                var resp = JSON.parse(JSON.stringify(docs));
                request.finalResponse = resp;
                callback();                
            }
        }
    });
}

module.exports = {
    create_user: create_user,
    authentication: authentication,
    read_users: read_users,
    check_auth: check_auth,
    read_authorizations: read_authorizations
};