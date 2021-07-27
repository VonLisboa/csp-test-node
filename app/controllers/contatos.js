const Contato = require("../models/contatos");
const Telefone = require("../models/telefones");


//CREATE-ONE
exports.createOne = async (req, res, next) => {
	console.log("createOne: [POST] /contatos/");
	try {
		let phones = req.body.telefones;
		if (!Array.isArray(phones) || phones.length == 0){
			return res.status(400).json("Bad Request: Empty \"telefones:[{'telNumber': '000-000'}]\" field");
		}

		const CONTATO_MODEL = {
			firstname: req.body.firstname, 
			lastname: req.body.lastname, 
			email: req.body.email,
			telefones: phones
		};

		try {
			const contato = await Contato.create(CONTATO_MODEL, {
				include: [ Telefone ]
			});

			console.log("OK createOne CONTATO: ", contato);
			return res.status(201).json(contato);
		} catch (error) {
			console.log('ERROR in createOne ' + "CONTATO:", error);
			return res.status(500).json(error);
		}
	} catch (error) {
		return res.status(400).json("Bad Request");
	}
};

//GET-ALL
exports.getAll = async (req, res, next) => {
	console.log("getAll: [GET] /contatos/");
	try {
		const ALL = await Contato.findAll({
			include: [ Telefone ]
		});
		console.log("OK getAll CONTATO: ", ALL.map(el => el.dataValues));
		return res.status(200).json(ALL);
	} catch (error) {
		console.log('ERROR in getAll ' + "CONTATO:", error);
		return res.status(500).json(error);
	}
};

//GET-ONE
exports.getOne = async (req, res, next) => {
	console.log("getOne: [GET] /contatos/:id");
	try {
		let ID = req.params.id;
		const contato = await Contato.findOne({
			where: {
				id: ID
			},
			include: [ Telefone ]
		});
		console.log("OK getOne CONTATO: ", contato);
		return res.status(200).json(contato);
	} catch (error) {
		console.log('ERROR in getOne ' + "CONTATO:", error);
		return res.status(500).json(error);
	}
};

//getByNome
exports.getByNome = async (req, res, next) => {
	console.log("getByNome: [GET] /contatos/nome/:nome");
	try {
		let fullname = req.params.nome;
		let [firstname, lastname] = fullname.split(' ')
		
		const ALL = await Contato.findAll({
			where: 
				lastname ?
					{
						firstname,
						lastname
					}: {
						firstname
					},
			include: [ Telefone ]
		});

		console.log("OK getAll CONTATO: ", ALL.map(el => el.dataValues));
		return res.status(200).json(ALL);
	} catch (error) {
		console.log('ERROR in getByNome ' + "CONTATO:", error);
		return res.status(500).json(error);
	}
};

//getByEmail
exports.getByEmail = async (req, res, next) => {
	console.log("getByEmail: [GET] /contatos/email/:email");
	try {
		let email = req.params.email;
		const ALL = await Contato.findAll({
			where: {
				email
			},
			include: [ Telefone ]
		});

		console.log("OK getAll CONTATO: ", ALL.map(el => el.dataValues));
		return res.status(200).json(ALL);
	} catch (error) {
		console.log('ERROR in getByEmail ' + "CONTATO:", error);
		return res.status(500).json(error);
	}
};

//UPDATE-ONE.
exports.updateOne = async (req, res, next) => {
	console.log("updateOne: [PUT] /contatos/:id");
	try {
		let ID = req.params.id;
		let phones = req.body.telefones;
		
		if (!Array.isArray(phones) || phones.length == 0){
			return res.status(400).json("Bad Request: Empty \"telefones:[{'telNumber': '000-000'}]\" field");

		}

		const CONTATO_MODEL = {
			firstname: req.body.firstname, 
			lastname: req.body.lastname, 
			email: req.body.email,
		};
	
		try {
			const contato = await Contato.update(CONTATO_MODEL, {
				where: {
					id: ID
				}
			});
			
			await Telefone.destroy({where: {contatoId: ID}});
			phones.forEach(async val => {
				val.contatoId = ID;
				await Telefone.create(val);
			});

			console.log("OK updateOne CONTATO: ", contato);
			return res.status(200).json(contato);
		} catch (error) {
			console.log('ERROR in updateOne ' + "CONTATO:", error);
			return res.status(500).json(error);
		}
	} catch (error) {
		return res.status(400).json("Bad Request");
	}
};

//DELETE-ONE
exports.deleteOne = async (req, res, next) => {
	console.log("[DELETE] /contatos/:id");
	try {
		const contato = await Contato.destroy({ where: { id: req.params.id } });
		await Telefone.destroy({where: {contatoId: req.params.id}});

		console.log("OK deleteOne CONTATO: ", );
		return res.status(200).json(contato);
	} catch (error) {
		console.log('ERROR in deleteOne ' + "CONTATO:", error);
		return res.status(500).json(error);
	}
};