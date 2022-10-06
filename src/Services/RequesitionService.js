import { Requisition } from '../Models/Requisition.js';
import RequisitionFactory from '../Factories/RequisitionFactory.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config();

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
			const currentPage = req.query.page;
			const requisitions = await Requisition.find()
				.limit(limit * 1)
				.skip((page - 1) * limit);

			const totalRegister = await Requisition.find({'finishedSession': false}).countDocuments();
			const pages = Math.ceil(totalRegister / limit); 
			return res.render('./pages/agenda', {requisitions, totalRegister, pages, currentPage});
	
		} catch(err) {
			console.error(err);
		}
	}



	async queryByDate(req, res) {
		try {

			const query = req.query.search;
			const totalRegister = await Requisition.find({'finishedSession': false}).countDocuments();
			const requisitions = await Requisition.find().or([{date: query}]);
			const pages = Math.ceil(totalRegister / 5);
			console.log(query)
			res.render('./pages/agenda', {requisitions, totalRegister, pages});

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
            return res.render('./pages/agenda_cadastrada', {requisition});
        } catch(err) {
            console.log(err.message);
        }
        
    }

	async getTotalRegisters(showFinished) {
		try {
			if(showFinished) {
				return await Requisition.find();
			}

			let result = await Requisition.find({'finishedSession': showFinished});
			return result;

		} catch(err) {
			console.error(err.message);
		}
	}

	async editRequisition(req, res) {
		try {
			const id = req.params.id;
			const requisition = await Requisition.findById(id);
			res.render('./pages/editar_agenda', {requisition});
		} catch(err) {
			console.log(err.message);
		}
	}

	async listAppointment(req, res) {
		try {

			let requisition = await Requisition.find({'finishedSession': false});
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
		let today = new Date();

		let sender = nodemailer.createTransport({
			service: 'gmail', 
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD
			}	
		});

		console.log(`Verificando agendas para hoje ${today}`);

		records.forEach(async record => {

			const data = await ejs.renderFile('./src/Views/templates/email.ejs', {name: record.name, hour: record.hour});
	
			if(today.toLocaleDateString('pt-BR') === record.date.toLocaleDateString('pt-BR')) {
				
				if(!record.notified) {
					console.log('enviando email');
					sender.sendMail({
						from: 'Prefeitura Municipal de Juazeiro do Piauí <nando.andradi.2@gmail.com>',
						to: record.email,
						subject: `${record.name} Sua agenda é hoje!`,
						html: data

					}).then(response => {
						console.log(`email enviado para ${record.name}, sessão às ${record.hour}`);
					}).catch(err => console.log(err));

					await Requisition.findByIdAndUpdate(record.id, {notified: true}, {new: true, useFindAndModify: false});

				}
			}
		});

	}
}	

export default new RequisitionService();