const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const ControllerUser = require('../Controllers/ControllerUser');
const Controller = require('../Controllers/Controller');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// create a new user; get the create_user function from ControllerUser;

router.post('/signup', ControllerUser.create_user, Controller.send_response);

// get all users; get the read_users function from ControllerUser;
router.get('/', ControllerUser.check_auth, ControllerUser.read_users, Controller.send_response);

// login with and user email; get the authentication function from ControllerUser;
router.post('/auth', ControllerUser.authentication);

router.get('/authorizations', ControllerUser.check_auth, ControllerUser.read_authorizations, Controller.send_response);

module.exports = router;