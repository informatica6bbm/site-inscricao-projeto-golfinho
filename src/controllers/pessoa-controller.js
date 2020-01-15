'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./../../client_secret.json');

const Helpers = require('./../../helpers/helpers');

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

    async function accessSpreadsheet(nomeCompleto, documento, dataNascimento, idade, tamanhoRegata, nomeResponsavel, whatsapp, bairro, cidade, estado, local, deficiencia, descricaoAtendimento) {
            const doc = new GoogleSpreadsheet('1yx9hTSV8XR-byYUJpeZJTTThlLZY0yQFKAdHcnkM8as');
            await promisify(doc.useServiceAccountAuth)(creds);

            const info = await promisify(doc.getInfo)();
            var sheet = info.worksheets[0];

            for(var cont = 0; cont < info.worksheets.length; cont++){
                if(info.worksheets[cont].title == "Inscritos"){
                    sheet = info.worksheets[cont];
                }
            }

            const rows = await promisify(sheet.getRows)({
                offset: 1
            });

            const id = rows.length + 1;

            const row = {
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
                localProjeto: local,
                deficiencia: deficiencia,
                descricaoAtendimento: descricaoAtendimento,
                dataHoraInscricao: Helpers.getDataHoraAtual()
            };
            await promisify(sheet.addRow)(row);

            res.status(200).json({});
        }

    accessSpreadsheet(nomeCompleto, documento, dataNascimento, idade, tamanhoRegata, nomeResponsavel, whatsapp, bairro, cidade, estado, local, deficiencia, descricaoAtendimento);
}
