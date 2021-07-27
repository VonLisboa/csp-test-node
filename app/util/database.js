const Sequelize = require('sequelize');

//GET ENV VARIABLES FROM
const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    });

module.exports = sequelize; 
