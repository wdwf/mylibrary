const mongoose = require('mongoose');

const livroSchema = mongoose.Schema ({
//  id: {type: String, required: false},
 titulo: {type: String, required: true},
 autor: {type: String, required: true},
 Npages: {type: String, required: false},
 imagemURL: {type: String, required: true}
});

module.exports = mongoose.model('Livro', livroSchema);
