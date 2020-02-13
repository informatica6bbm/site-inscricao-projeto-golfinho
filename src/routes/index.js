'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./../controllers/index');
const path = require('path');

router.get('/fotos', controller.fotos);
router.get('/campeche', controller.campeche);
router.get('/aabb', controller.aabb);
router.get('/crc', controller.crc);
router.get('/industrial', controller.industrial);

module.exports = router;
