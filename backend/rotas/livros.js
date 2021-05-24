const express = require("express");
const multer = require ("multer");
const { count } = require("../models/livro");
const router = express.Router();
const Livro = require('../models/livro');


const MIME_TYPE_EXTENSAO_MAPA = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/bmp': 'bmp'
}

const armazenamento = multer.diskStorage({
  //requisição, arquivo extraido e uma função a ser
  //executada, capaz de indicar um erro ou devolver
  //o diretório em que as fotos ficarão
  destination: (req, file, callback) => {
    let e = MIME_TYPE_EXTENSAO_MAPA[file.mimetype] ? null : new Error ('Mime TypeInvalido');
    callback(e, "backend/imagens")
  },
  filename: (req, file, callback) =>{
    const nome = file.originalname.toLowerCase().split(" ").join("-");
    const extensao = MIME_TYPE_EXTENSAO_MAPA[file.mimetype];
    // callback(null, `${nome}-${Date.now()}.${extensao}`);
    callback (null, nome+Date.now()+'.'+extensao);
  }
})

router.post ('', multer({storage: armazenamento}).single('imagem'), (req, res, next) => {

  const imagemURL = `${req.protocol}://${req.get('host')}`

  const book = new Livro({
    id: req.body.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    Npages: req.body.Npages,
    imagemURL: `${imagemURL}/imagens/${req.file.filename}`
  });

  book.save().then (livroInserido => {
    res.status(200).json({
      mensagem: 'Livro inserido',
      //id: livroInserido._id
      book: {
        id:livroInserido._id,
        titulo: livroInserido.titulo,
        autor: livroInserido.autor,
        Npages: livroInserido.Npages,
        imagemURL: livroInserido.imagemURL
      }
    })
  })

});

router.get('',async (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const page = +req.query.page;
  const consulta = Livro.find();//só executa quando chamamos then
  let booksFound;
  if (pageSize && page){
  consulta
  .skip(pageSize * (page - 1))
  .limit(pageSize);
  }

  consulta.then(result =>  {
    booksFound = result;
    return Livro.count();
  })
    .then((count) => {
      res.status(200).json({
        mensagem: "Tudo OK",
        books: booksFound,
        maxBooks: count
      });
  })
});

router.delete ('/:id', (req, res, next) => {
  // console.log("id: ", req.params.id);
  Livro.deleteOne ({_id: req.params.id}).then((resultado) => {
    console.log (resultado);
    res.status(200).json({mensagem: "Livro removido"})
  });
});

router.put("/:id", multer({ storage: armazenamento }).single('imagem'), (req, res, next) => {
  console.log (req.file);
  let imagemURL = req.body.imagemURL;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagemURL = url + "/imagens/" + req.file.filename;
  }
  const book = new Livro ({
    _id: req.params.id,
    titulo: req.body.titulo,
    autor: req.body.autor,
    Npages: req.body.Npages,
    imagemURL: imagemURL
    //imgens
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
