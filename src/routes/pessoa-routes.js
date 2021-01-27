'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/pessoa-controller');

router.get('/vagas', controller.get);

router.post('/avaliar', controller.avaliar);

router.get('/cidades', controller.getCidades);

router.get('/clubesCidade/:id', controller.getClubesCidade);

router.post('/', controller.post);

module.exports = router;