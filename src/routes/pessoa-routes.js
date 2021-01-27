'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/pessoa-controller');

router.get('/vagas', controller.get);

//router.get('/cidades', controller.get);

//router.get('/clubesCidade/:id', controller.get);

router.post('/avaliar', controller.avaliar);

router.post('/', controller.post);