const express = require("express");
const routes = express.Router();

const base = require('../controllers');

routes.post('/wa/send', base.send);

module.exports = routes;
