const express           = require('express');
const app               = express();
const db                = require('./db/connection');
const bodyParser        = require('body-parser');
const exphbs            = require('express-handlebars');
const path              = require('path');
const Job               = require('./models/Job');
const Sequelize         = require('sequelize');
const Op                = Sequelize.Op;

// db connection
db
  .authenticate()
  .then(() => {
    console.log("Conectou ao banco com sucesso");
  })
  .catch(err => {
    console.log("Ocorreu um erro ao conectar", err);
  });

const PORT = 3001;

app.listen(PORT, function(){
    console.log(`O express está rodando na porta ${PORT}`);
});


// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', (req, res) => {

  let search = req.query.job;
  let query  = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

  if(!search) {
    Job.findAll({order: [
      ['createdAt', 'DESC']
    ]})
    .then(jobs => {
  
      res.render('index', {
        jobs
      });
  
    })
    .catch(err => console.log(err));
  } else {
    Job.findAll({
      where: {title: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs => {
      console.log(search);
      console.log(search);
  
      res.render('index', {
        jobs, search
      });
  
    })
    .catch(err => console.log(err));
  }
});


/*app.get('/', (req,res)=>{
    res.send("Está funcionando!");
});
*/

/*app.get('/', (req, res) => {
  
      Job.findAll({order: [
        ['createdAt', 'DESC']
      ]})
      .then(jobs => {
    
        res.render('index', {
          jobs
        });
    
      })
});*/
// jobs routes
app.use('/jobs', require('./routes/jobs'));




