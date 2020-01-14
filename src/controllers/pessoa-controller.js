'use strict';

const Helpers = require('./../../helpers/helpers');
const Pessoa = require('./../models/Pessoa');

exports.post = (req, res, next) => {
    var nomeCompleto = req.body.nomeCompleto;
    var documento = req.body.documento;
    var dataNascimento = req.body.dataNascimento;
    var idade = req.body.idade;
    var tamanhoRegata = req.body.tamanhoRegata;
    var nomeResponsavel = req.body.nomeResponsavel;
    var whatsapp = req.body.whatsapp;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var local = req.body.local;
    var deficiencia = req.body.deficiencia;
    var descricaoAtendimento = req.body.descricaoAtendimento;

    var data = {
        nomeCompleto: nomeCompleto,
        documento: documento,
        dataNascimento: dataNascimento,
        idade: idade,
        tamanhoRegata: tamanhoRegata,
        nomeResponsavel: nomeResponsavel,
        whatsapp: whatsapp,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        local: local,
        deficiencia: deficiencia,
        descricaoAtendimento: descricaoAtendimento,
        createdAt: Helpers.getDataHoraAtual()
    };

    Pessoa.create(data).then(response => {
        var pessoa = JSON.parse(JSON.stringify(response));
        var resposta = "";
        if(pessoa) {
            resposta = true;
        }

        if(!pessoa) {
            resposta = false;
        }

        res.status(200).json(resposta);
    });
}
