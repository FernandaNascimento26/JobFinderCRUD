//Apontamento do banco - arquivo de configuração
const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/app.db'
});

//devemos exportar para que fique visível para outros locais
module.exports = sequelize