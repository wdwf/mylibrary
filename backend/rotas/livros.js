const express = require("express");
const router = express.Router();
const Livro = require('../models/livro');

router.post ('', (req, res, next) => {

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

router.get('',async (req, res, next) => {
  const result = await Livro.find({})
  console.log(result);
  res.status(200).json({
    mensagem: "Tudo OK",
    books: result
  });
});

router.delete ('/:id', (req, res, next) => {
  console.log("id: ", req.params.id);
  Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Livro removido"})
  });
});

router.put("/:id", (req, res, next) => {
  const book = new Livro ({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    Npages: req.body.Npages
  });
  Livro.updateOne({_id: req.params.id}, book)
  .then ((resultado) => {
    console.log(resultado)
    res.status(200).json({mensagem:'Atualização realizada com sucesso'})
  });
})

router.get('/:id', (req, res, next) => {
  Livro.findById(req.params.id).then(bok => {
    if (bok) {
      res.status(200).json(bok);
    }
    else {
      res.status(404).json({mensagem:'Livro não encontrado!'});
    }
  })
})

module.exports = router;
