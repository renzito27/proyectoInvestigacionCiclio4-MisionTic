const mongoose = require('mongoose');
const configDB = require('../config/bd.config');
const urlDB = `mongodb+srv://${configDB.USUARIO}:${configDB.CLAVE}@cluster0.jq49j.mongodb.net/${configDB.BASEDATOS}?retryWrites=true&w=majority`;

const connection = mongoose.connection;



module.exports = {
    conectar: function () {
        mongoose.connect(urlDB);
        connection
            .once('open', () => {
                console.log('Se ha establecido conexión al servidor mongo');
            })
            .on('error', (err) => {
                console.log('Error: ', err);
            });
    }
}