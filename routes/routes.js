const express = require('express')
const multer = require('multer');
const upload = multer()


const MessageController = require('../MessageController.js')


const routes = new express.Router()







routes.post('/iniciar-sessao', upload.none(''), MessageController.abrirSessao)


module.exports = routes;