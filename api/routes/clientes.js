const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const ControllerCliente = require('../Controllers/ControllerCliente');
const ControllerUser = require('../Controllers/ControllerUser');
const Controller = require('../Controllers/Controller');

router.post('/signup_cliente', ControllerCliente.create_cliente, Controller.send_response);

router.get('/', ControllerUser.check_auth, ControllerCliente.read_clientes, Controller.send_response);





module.exports = router;