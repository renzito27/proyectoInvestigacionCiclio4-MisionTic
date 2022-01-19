const {Router} = require('express');
const signIn = require('../controller/auth.controlador')

const route = Router();

route.post('/login', signIn )

module.exports = route