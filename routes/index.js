const express = require("express");
const routes = express.Router();

const base = require('../controllers');

routes.post('/wa/send', base.send);
routes.get('/wa/state', base.state);
routes.get('/wa/getProfilePic', base.getProfilePic);

module.exports = routes;
