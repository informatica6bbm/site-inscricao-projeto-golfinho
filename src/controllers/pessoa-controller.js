'use strict';

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./../../client_secret.json');

const nodemailer = require('nodemailer');

const Helpers = require('./../../helpers/helpers');

exports.get = (req, res, next) => {
    async function accessSpreadsheet() {
            const doc = new GoogleSpreadsheet('1DWsv3cf0plMd6gVaiNQA8Um58dm_5uZxlH7kul7vJHo');
            await promisify(doc.useServiceAccountAuth)(creds);

            const info = await promisify(doc.getInfo)();
            var sheet = info.worksheets[0];

            for(var cont = 0; cont < info.worksheets.length; cont++){
                if(info.worksheets[cont].title == "Clubes"){
                    sheet = info.worksheets[cont];
                }
            }

            const qtdInscritosClube = await promisify(sheet.getRows)({
                offset: 1
            });

            var clubeComVagas = [];
            var obj = {};

            for(var i = 0; i < Clubes.length; i++){
                if(parseInt(Clubes[i].qtdvagas) > parseInt(Clubes[i].qtdinscritos)) {
                    obj.clube = Clubes[i].clube;
                    //obj.text =  Clubes[i].text;
                    obj.qtdvagas = Clubes[i].qtdvagas;
                    obj.qtdinscritos = Clubes[i].qtdinscritos;
                    clubeComVagas.push(obj);
                    obj = {};
                }
            }

            res.status(200).json(clubeComVagas);
    }

    accessSpreadsheet();
}

exports.avaliar = (req, res, next) => {
    var pergunta1 = req.body.pergunta1;
    var pergunta2 = req.body.pergunta2;
    var pergunta3 = req.body.pergunta3;
    var pergunta4 = req.body.pergunta4;
    var pergunta5 = req.body.pergunta5;
    var pergunta6 = req.body.pergunta6;
    var pergunta7 = req.body.pergunta7;
    var pergunta8 = req.body.pergunta8;
    var pergunta9 = req.body.pergunta9;
    var sugestao = req.body.sugestao;

    async function accessSpreadsheet(pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, pergunta8, pergunta9, sugestao) {
        const doc = new GoogleSpreadsheet('1DWsv3cf0plMd6gVaiNQA8Um58dm_5uZxlH7kul7vJHo');
        await promisify(doc.useServiceAccountAuth)(creds);
        const info = await promisify(doc.getInfo)();
        var sheet = info.worksheets[0];
        var sheet1 = info.worksheets[0];

        for(var cont = 0; cont < info.worksheets.length; cont++){
            if(info.worksheets[cont].title == "Avaliações"){
                sheet = info.worksheets[cont];
            }
        }

        var row = {
            pergunta1: pergunta1,
            pergunta2: pergunta2,
            pergunta3: pergunta3,
            pergunta4: pergunta4,
            pergunta5: pergunta5,
            pergunta6: pergunta6,
            pergunta7: pergunta7,
            pergunta8: pergunta8,
            pergunta9: pergunta9,
            sugestao: sugestao
        }

        await promisify(sheet.addRow)(row);

        res.status(200).json(true);
    }

    accessSpreadsheet(pergunta1, pergunta2, pergunta3, pergunta4, pergunta5, pergunta6, pergunta7, pergunta8, pergunta9, sugestao);
}

exports.getCidades = (req, res, next) => {
    async function accessSpreadsheet() {
            const doc = new GoogleSpreadsheet('1DWsv3cf0plMd6gVaiNQA8Um58dm_5uZxlH7kul7vJHo');
            await promisify(doc.useServiceAccountAuth)(creds);

            const info = await promisify(doc.getInfo)();
            var sheet = info.worksheets[0];

            for(var cont = 0; cont < info.worksheets.length; cont++){
                if(info.worksheets[cont].title == "Cidade"){
                    sheet = info.worksheets[cont];
                }
            }

            const getCidades = await promisify(sheet.getRows)({
                offset: 1
            });
            // [
            //     {
            //         id: 1,
            //         cidade: 'Chapecó'
            //     }
            // ]
            var objAux = {};
            var cidades  = [];

            for(var counter = 0; counter < getCidades.length; counter++){
                objAux.idcidade = getCidades[counter].idcidade;
                objAux.cidade = getCidades[counter].cidade;
                cidades.push(objAux);
                objAux = {};
            }

            res.status(200).json(cidades);
    }

    accessSpreadsheet();
}

exports.getClubesCidade = (req, res, next) => {
    var idCidade = req.params.id;
    console.log(req.params.id);
    async function accessSpreadsheet() {
            const doc = new GoogleSpreadsheet('1DWsv3cf0plMd6gVaiNQA8Um58dm_5uZxlH7kul7vJHo');
            await promisify(doc.useServiceAccountAuth)(creds);

            const info = await promisify(doc.getInfo)();
            var sheet = info.worksheets[0];

            for(var cont = 0; cont < info.worksheets.length; cont++){
                if(info.worksheets[cont].title == "Clubes"){
                    sheet = info.worksheets[cont];
                }
            }

            const clubes= await promisify(sheet.getRows)({
                offset: 1
            });
            var clubesCidade = [];
            var aux = {};

            for(var counter = 0; counter < clubes.length; counter++){
                if(clubes[counter].idcidade == idCidade){
                    if(parseInt(clubes[counter].qtdvagas) >= parseInt(clubes[counter].qtdinscritos)){
                        aux.idcidade = clubes[counter].idcidade;
                        aux.qtdvagas = clubes[counter].qtdvagas;
                        aux.qtdinscritos = clubes[counter].qtdinscritos;
                        aux.clube = clubes[counter].clube;
                        clubesCidade.push(aux);
                        aux = {};
                    }
                }
            }
            res.status(200).json(clubesCidade);
    }

    accessSpreadsheet();
}

exports.post = (req, res, next) => {
    var nomeCompleto = req.body.nomeCompleto;
    var cpf = req.body.cpf;
    var rg = req.body.rg;
    var dataNascimento = req.body.dataNascimento;
    var idade = req.body.idade;
    var tamanhoRegata = req.body.tamanhoRegata;
    var nomeResponsavel = req.body.nomeResponsavel;
    var whatsapp = req.body.whatsapp;
    var email = req.body.email;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var estado = req.body.estado;
    var local = req.body.local;
    var deficiencia = req.body.deficiencia;
    var descricaoAtendimento = req.body.descricaoAtendimento;

    async function accessSpreadsheet(nomeCompleto, cpf, rg, dataNascimento, idade, tamanhoRegata, nomeResponsavel, whatsapp, email, bairro, cidade, estado, local, deficiencia, descricaoAtendimento) {
            const doc = new GoogleSpreadsheet('1DWsv3cf0plMd6gVaiNQA8Um58dm_5uZxlH7kul7vJHo');
            await promisify(doc.useServiceAccountAuth)(creds);
            var msg = "";
            var resposta = false;
            const info = await promisify(doc.getInfo)();
            var sheet = info.worksheets[0];
            var sheet1 = info.worksheets[0];

            for(var cont = 0; cont < info.worksheets.length; cont++){
                if(info.worksheets[cont].title == "Inscritos"){
                    sheet = info.worksheets[cont];
                }
            }

            const rows = await promisify(sheet.getRows)({
                offset: 1
            });

            const qtdInscritosClube = await promisify(sheet1.getRows)({
                offset: 1
            });

            function verificaCpfRg(cpf, rg){
               for(var i = 0; i < rows.length; i++) {
                   if(cpf.toString().localeCompare("") != 0 && rg.toString().localeCompare("") != 0){
                       if(rows[i].cpf == cpf.toString() || rows[i].rg == rg.toString()){
                           return false;
                       }
                    }

                   if(cpf.toString().localeCompare("") == 0 && rg.toString().localeCompare("") != 0){
                       if(rows[i].rg.toString() == rg.toString()){
                           return false;
                       }
                   }

                   if(cpf.toString().localeCompare("") != 0 && rg.toString().localeCompare("") == 0){
                       if(rows[i].cpf == cpf.toString()){
                           return false;
                       }
                   }
               }

               return true;
           }


             if(verificaCpfRg(cpf, rg)) {
                const row = {
                    nomeCompleto: nomeCompleto,
                    cpf: cpf,
                    rg: rg,
                    dataNascimento: dataNascimento,
                    idade: idade,
                    tamanhoRegata: tamanhoRegata,
                    nomeResponsavel: nomeResponsavel,
                    whatsapp: whatsapp,
                    email: email,
                    bairro: bairro,
                    cidade: cidade,
                    estado: estado,
                    localProjeto: local,
                    deficiencia: deficiencia,
                    descricaoAtendimento: descricaoAtendimento,
                    dataHoraInscricao: Helpers.getDataHoraAtual()
                };
                await promisify(sheet.addRow)(row);

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true, // true for 465, false for other ports
                    auth: {
                        user: "projetogolfinho6bbm@gmail.com",
                        pass: "projetogolfinho2020"
                    },
                    tls: { rejectUnauthorized: false }
                });
                var def = deficiencia === 'true' ? 'SIM' : 'NÃO';
                var html = '<style>\
                    h5 {\
                        font-family: Gill Sans, sans-serif;\
                    }\
                    ul li {\
                        list-style-type: none;\
                        font-family: Gill Sans, sans-serif;\
                        font-size: 14px;\
                    }\
                </style>\
                <h5 style="font-size: 20px">Confirmação inscrição Projeto Golfinho</h5>\
                <h5 style="font-size: 13px">* No dia do evento o resposável deverá estar presente para assinar a ficha de inscrição!</h5>\
                <ul style="list-style-type:circle;">\
                  <li><strong>Nome completo: </strong> ' + nomeCompleto + '</li>\
                  <li><strong>CPF: </strong>' + cpf + '</li>\
                  <li><strong>RG: </strong>' + rg + '</li>\
                  <li><strong>Data Nascimento: </strong>' + dataNascimento + '</li>\
                  <li><strong>Idade: </strong>' + idade + '</li>\
                  <li><strong>Tamanho Regata: </strong>' + tamanhoRegata + '</li>\
                  <li><strong>Nome do Responsável (Pai/Mãe/ outro): </strong>' + nomeResponsavel + '</li>\
                  <li><strong>Número telefone com WhatsApp Responsável: </strong>' + whatsapp + '</li>\
                  <li><strong>E-mail: </strong>' + email + '</li>\
                  <li><strong>Bairro/Comunidade: </strong>' + bairro + '</li>\
                  <li><strong>Cidade: </strong>' + cidade + '</li>\
                  <li><strong>Estado: </strong>' + estado + '</li>\
                  <li><strong>Local onde deseja participar do evento: </strong>' + local + '</li>\
                  <li><strong>Possui alguma deficiência?: </strong>' + def + '</li>';
            html = def ? html + '<li><strong>Descreva o atendimento diferenciado no dia da atividade: </strong>' + descricaoAtendimento + '</li>' : html + '';
            html = html + '</ul>';

                const mailOptions = {
                    from: 'projetogolfinho6bbm@gmail.com',
                    to: email,
                    subject: 'Inscrição projeto golfinho',
                    html: html,
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email enviado: ' + info.response);
                    }
                });

                res.status(200).json({msg: 'Inscrição realizada com sucesso!', res: true});
            }

             if(!verificaCpfRg(cpf, rg)){
                 msg = 'CPF ou RG já inscritos!';
                 resposta = false;
             }

            res.status(200).json({
                msg: msg,
                res: resposta,
            });
        }

    accessSpreadsheet(nomeCompleto, cpf, rg, dataNascimento, idade, tamanhoRegata, nomeResponsavel, whatsapp, email, bairro, cidade, estado, local, deficiencia, descricaoAtendimento);
}