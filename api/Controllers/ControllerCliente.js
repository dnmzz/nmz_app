const mongoose = require('mongoose');
const Cliente = require('../models/cliente');
const MESSAGES = require('../Messages');



function find_email_cliente(request, response, callback) {
    var email = request.sanitize(request.body.email);
    Cliente.find({email: email}, function(err, docs) {
        if (err) {
            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
        } else {
            if (docs.length == 0) {
                request.finalResponse = MESSAGES.error.e3;
                callback();
            } else {
                request.finalResponse = docs[0];
                callback();
            }
        }
    });
}



function create_cliente(request, response, callback) {
    var email = request.sanitize(request.body.email);
    var nome = request.sanitize(request.body.nome);
    var telemovel = request.sanitize(request.body.telemovel);
    var localizacao = request.sanitize(request.body.localizacao);
    var nib = request.sanitize(request.body.nib);

    find_email_cliente(request, response, function(result) {
        if (request.finalResponse.http == 400) {
            var cliente = new Cliente({
                email: email,
                nome: nome,
                telemovel: telemovel,
                localizacao: localizacao,
                nib: nib
            });
            cliente.save(function (err, result) {
                if (err) {
                    response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
                } else {
                    if (result.length == 0) {
                        response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
                    } else {
                        request.finalResponse = MESSAGES.success.s2;
                        callback();
                    }
                }
            });
        } else {
            request.finalResponse = MESSAGES.error.e2;
            callback();
        }
    }) 
}


function read_clientes(request, response, callback) {
    Cliente.find(function (err, docs) {
        if (err) {
            response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
        } else {
            if (docs.length == 0) {
                response.status(MESSAGES.error.e0.http).send(MESSAGES.error.e0);
            } else {
                var resposta = JSON.parse(JSON.stringify(docs));
                request.finalResponse = resposta;
                callback();
            }
        }
    });
}






module.exports = {
    create_cliente: create_cliente,
    read_clientes: read_clientes
};
