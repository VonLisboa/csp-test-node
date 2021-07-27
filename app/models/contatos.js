const Sequelize = require('sequelize');
const db = require('../util/database');
const Telefone = require('./telefones');

/**
 .Id
.Primeiro Nome
.Último Nome
.E-mail
.Telefones (muitos - plural)
 */

const Contato = db.define('contatos', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	firstname: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false
	},
	lastname: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	}
});

Contato.hasMany(Telefone);

module.exports = Contato;