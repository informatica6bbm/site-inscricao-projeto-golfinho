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
router.get('/caramuru', controller.caramuru);
router.get('/campestre', controller.campestre);
router.get('/cachenere', controller.cachenere);
router.get('/campestre', controller.campestre);

module.exports = router;
