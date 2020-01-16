'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/pessoa-controller');

router.get('/vagas', controller.get);
router.post('/', controller.post);

module.exports = router;
