const express = require ('express');
const app = express();
const bodyParse = require('body-parser')

app.use(bodyParse.json());

const books = [
  {
    id: '1000',
    title:'Harry Porter',
    autor: 'Uma muie lá',
    numberOfPages: 400,
  },
  {
    id: '2',
    title:'Harry Porter',
    autor: 'Uma muie lá',
    numberOfPages: 400,
  }
]

app.use ((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post ('/api/books', (req, res, next) => {
  const book = req.body;
  console.log(book);
  res.status(201).json({mensagem: 'Livro inserido'})
});

app.use('/api/books',(req, res, next) => {
  res.status(200).json({
    mensagem: "Tudo OK",
    books
  });
});

module.exports = app;
