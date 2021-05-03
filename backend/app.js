const express = require ('express');
const app = express();
const Livro = require('./models/livro');
const mongoose = require('mongoose');
const env = require('./env');


mongoose.connect(`mongodb+srv://angular:${env.mongoPassword}@cluster0.djhgu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log ("Conexão OK")
}).catch((e) => {
  console.log("Conexão NOK")
  console.log(e);
});


app.use(express.json());

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post ('/api/books', (req, res, next) => {

  const book = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    Npages: req.body.Npages
  });

  book.save().then (livroInserido => {
    res.status(200).json({
      mensagem: 'Livro inserido',
      id: livroInserido._id
    })
  })

});



app.get('/api/books',async (req, res, next) => {
  const result = await Livro.find({})
  console.log(result);
  res.status(200).json({
    mensagem: "Tudo OK",
    books: result
  });

});

app.delete ('/api/books/:id', (req, res, next) => {
  Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Livro removido"})
  });
});


module.exports = app;
