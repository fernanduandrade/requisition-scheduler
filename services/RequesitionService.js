import { Requisition } from '../model/Requisition.js';
import RequisitionFactory from '../factories/RequisitionFactory.js';
import nodemailer from 'nodemailer';

class RequisitionService {
	async GetRequisitionById(id) {
		try {

			const result = await Requisition.findOne({'_id': id});
			return  result;
		
		} catch(err) {

			console.error(err.message);
		}
	}

	async pagination(req, res) {
		try {

			const {page = 1, limit = 5} = req.query;
			const requisitions = await Requisition.find()
				.limit(limit * 1)
				.skip((page - 1) * limit);

			const totalRegister = await Requisition.find({'examFinished': false}).countDocuments();
			const pages = Math.ceil(totalRegister / limit); 
			return res.render('listRequisition', {requisitions, totalRegister, pages});
	
		} catch(err) {
			console.error(err);
		}
	}



	async queryByDate(req, res) {
		try {

			const query = req.query.search;
			const totalRegister = await Requisition.find({'examFinished': false}).countDocuments();
			const requisitions = await Requisition.find().or([{date: query}]);
			const pages = Math.ceil(totalRegister / 5);
			console.log(query)
			res.render('listRequisition', {requisitions, totalRegister, pages});

		} catch(err) {
			console.log(err.message);
		}
	}

	async comparePassword(candidatePassword, hash, callback){
		try {

			const result = await bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
	    		callback(null, isMatch);
			})

			return result;
	
		} catch(err) {
			console.error(err.message);
		}
	}

	async index(req, res) {
        try {
            const id = req.params.id;
            const requisition = await Requisition.findById(id);
            return res.render('userRequisition', {requisition});
        } catch(err) {
            console.log(err.message);
        }
        
    }

	async getTotalRegisters(showFinished) {
		try {
			if(showFinished) {
				return await Requisition.find();
			}

			let result = await Requisition.find({'examFinished': showFinished});
			return result;

		} catch(err) {
			console.error(err.message);
		}
	}

	async editRequisition(req, res) {
		try {
			const id = req.params.id;
			const requisition = await Requisition.findById(id);
			res.render('editUser', {requisition});
		} catch(err) {
			console.log(err.message);
		}
	}

	async listAppointment(req, res) {
		try {

			let requisition = await Requisition.find({'examFinished': false});
			let requisitions = [];
			
			requisition.forEach(req => {
				if(req.date != undefined) {
					requisitions.push(RequisitionFactory.Build(req));
				}
			});
			return res.json(requisitions);

		} catch(err) {
			console.log(err.message);
		}
	}

	async sendNotification() {
		const records = await this.getTotalRegisters(false);

		let sender = nodemailer.createTransport({
			service: 'gmail', 
			host: 'smtp.gmail.com',
			auth: {
				user: 'nando.andradi.2@gmail.com',
				pass: "uvjxvybtovdxyhzn"
			}	
		});

		console.log('\x1b[43m', 'Verificando agendas para hoje');

		records.forEach(async record => {
			let date = record.date.split('-').reverse().join('/');
			let today = new Date();

			if(today.toLocaleDateString('pt-BR') === date) {
				if(!record.notified) {
					sender.sendMail({
						from: 'nando.andradi.2@gmail.com',
						to: record.email,
						subject: `${record.name} sua sessão de tatuagem é hoje!`,
						text: `Olá ${record.name}, você tem uma sessão de tatuagem marcada para às ${record.hour} hoje! Não esqueça  ;)`

					}).then(response => {
						// console.log(response);
					}).catch(err => console.log(err));

					await Requisition.findByIdAndUpdate(record.id, {notified: true}, {new: true, useFindAndModify: false});
					
					console.log('\x1b[42m',`email enviado para ${record.name}`)
				}
			} else {
				console.log('\x1b[41m','Não há agenda para hoje!')
			}
		});

	}
}	

export default new RequisitionService();