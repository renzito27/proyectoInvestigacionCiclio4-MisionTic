const { Schema, model} = require('mongoose');

const obs = new Schema({

    observacion: {
        type: String
    }

})

module.exports = model('obs', obs);