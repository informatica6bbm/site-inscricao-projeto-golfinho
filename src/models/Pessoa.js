'use strict';

const env = require('./../../config/env');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect: env.DB_CONNECTION,
    dialectOptions: {
        useUTC: false,
        typeCast: function (field, next) {
            if (field.type === 'DATETIME') {
              return new Date(field.string() + 'Z');
            }
            return next()
        }
    },
    timezone: '-03:00'
});

sequelize.authenticate().then(function() {
    console.log("successo");
}).catch(function(erro) {
    console.log("error: " + erro);
});

const Pessoa = sequelize.define('pessoa', {
    nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    documento: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    idade: {
        type: Sequelize.STRING(3),
        allowNull: false
    },
    tamanhoRegata: {
        type: Sequelize.STRING(4),
        allowNull: false
    },
    nomeResponsavel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    whatsapp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING(3),
        allowNull: false
    },
    local: {
        type: Sequelize.STRING,
        allowNull: false
    },
    deficiencia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricaoAtendimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
{
  charset: 'utf8',
  collate: 'utf8_general_ci',
  freezeTableName: true,
  tableName: 'pessoa'
});

Pessoa.addHook('beforeValidate', (pessoa, options) => {
    var data = new Date();
    let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
    var data = data2.toISOString().replace(/\.\d{3}Z$/, '');
    pessoa.updatedAt = data;
});

Pessoa.sync({
    force: false
});

module.exports = Pessoa;
