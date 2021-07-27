const Sequelize = require('sequelize');
const db = require('../util/database');

/**
 .Id
.Primeiro Nome
.Último Nome
.E-mail
.Telefones (muitos - plural)
 */

const Telefone = db.define('telefones', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	telNumber: {
		type: Sequelize.STRING,
		allowNull: false
	},
	contatoId: {
		//FK contatos
		type: Sequelize.INTEGER,
		references: {
			model: 'contatos',
			key: 'id',
		 }
	}
});

module.exports = Telefone;

