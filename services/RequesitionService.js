import { Requisition } from '../model/Requisition.js';
import RequisitionFactory from '../factories/RequisitionFactory.js';

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
			return res.render('listRequisition', {requisitions, totalRegister});
	
		} catch(err) {
			console.error(err);
		}
	}

	async queryByDate(req, res) {
		try {

			const query = req.query.search;
			const totalRegister = await Requisition.find({'examFinished': false}).countDocuments();
			const requisitions = await Requisition.find().or([{date: query}]);
			res.render('listRequisition', {requisitions, totalRegister});

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

	async getTotalRegisters() {
		try {

			let result = await Requisition.find({'examFinished': false}).countDocuments();
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
}	

export default new RequisitionService();