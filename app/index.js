const express = require('express');

const sequelize = require('./util/database'); //database initializations
const Contato = require('./models/contatos'); //REQUIRED even if IDE says not used!

//INITIALIZE APP WITH EXPRESS
const app = express();

//BODYPARSER
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Set proper Headers on Backend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//ROUTES
app.use('/dev', require('./routes/dev')); //test routes
app.use('/contatos', require('./routes/contatos')); //users routes

(async () => {
  try {
    await sequelize.sync(
      { force: false } //Reset db every time
    );
    app.listen(process.env.EXTERNAL_PORT || 8080);
  } catch (error) {
    console.log(error);
  }
})();