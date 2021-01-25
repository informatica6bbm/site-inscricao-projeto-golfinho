'use strict';
// https://sequelize.org/master/manual/getting-started.html
const express = require('express');
const router = express.Router();
var path = require('path');

exports.fotos = (req, res, next) => {
	res.sendFile(path.resolve('public/fotos.html'));
}

exports.campeche = (req, res, next) => {
    res.sendFile(path.resolve('public/campeche.html'));
}

exports.aabb = (req, res, next) => {
    res.sendFile(path.resolve('public/aabb.html'));
}

exports.crc = (req, res, next) => {
    res.sendFile(path.resolve('public/crc.html'));
}

exports.industrial = (req, res, next) => {
    res.sendFile(path.resolve('public/industrial.html'));
}

exports.caramuru = (req, res, next) => {
    res.sendFile(path.resolve('public/caramuru.html'));
}

exports.campestre = (req, res, next) => {
    res.sendFile(path.resolve('public/campestre.html'));
}

