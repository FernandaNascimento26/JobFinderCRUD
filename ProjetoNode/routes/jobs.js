const express = require('express');

//modulo para gerenciar rotas 
const router = express.Router();

//classe do model
const Job = require('../models/Job');

// form da rota de envio
router.get('/add', (req, res) => {
  res.render('add');
});

// detalhe da vaga -> view/1, view/2
router.get('/view/:id', (req, res) => Job.findOne({
  where: {id: req.params.id}
}).then(job => {

  res.render('view', {
    job
  });

}).catch(err => console.log(err)));

// add job via post
router.post('/add', (req, res) => {

    let {title, salary, company, description, email, new_job} = req.body;
  
    // insert
    Job.create({
      title,
      description,
      salary,
      company,
      email,
      new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
  
  });

  // Atualizar vaga via put
router.put('/edit/:id', (req, res) => {
  let { title, salary, company, description, email, new_job } = req.body;

  Job.update(
    { title, description, salary, company, email, new_job },
    { where: { id: req.params.id } }
  )
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

  // Deletar vaga via delete
router.delete('/delete/:id', (req, res) => {
  Job.destroy({
    where: { id: req.params.id }
  })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});






  module.exports = router