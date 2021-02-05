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
exports.cachenere = (req, res, next) => {
    res.sendFile(path.resolve('public/cachenere.html'));
}
exports.sitio = (req, res, next) => {
    res.sendFile(path.resolve('public/sitio.html'));
}
exports.estancia = (req, res, next) => {
    res.sendFile(path.resolve('public/estancia.html'));
}
exports.tropeiro = (req, res, next) => {
    res.sendFile(path.resolve('public/tropeiro.html'));
}
exports.country = (req, res, next) => {
    res.sendFile(path.resolve('public/country.html'));
}
exports.goioen = (req, res, next) => {
    res.sendFile(path.resolve('public/goioen.html'));
}
exports.arvoredo = (req, res, next) => {
    res.sendFile(path.resolve('public/arvoredo.html'));
}
exports.xavantina = (req, res, next) => {
    res.sendFile(path.resolve('public/xavantina.html'));
}
exports.arabuta = (req, res, next) => {
    res.sendFile(path.resolve('public/arabuta.html'));
}
exports.ipumirim = (req, res, next) => {
    res.sendFile(path.resolve('public/ipumirim.html'));
}
exports.seara = (req, res, next) => {
    res.sendFile(path.resolve('public/seara.html'));
}
exports.paial = (req, res, next) => {
    res.sendFile(path.resolve('public/paial.html'));
}
exports.ita = (req, res, next) => {
    res.sendFile(path.resolve('public/ita.html'));
}
exports.concordia = (req, res, next) => {
    res.sendFile(path.resolve('public/concordia.html'));
}