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
router.get('/sitio', controller.sitio);
router.get('/estancia', controller.estancia);
router.get('/tropeiro', controller.tropeiro);
router.get('/country', controller.country);
router.get('/goioen', controller.goioen);
router.get('/arvoredo', controller.arvoredo);
router.get('/xavantina', controller.xavantina);
router.get('/arabuta', controller.arabuta);
router.get('/ipumirim', controller.ipumirim);

module.exports = router;
