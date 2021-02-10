
import RequisitionFactory from '../factories/RequisitionFactory.js';
import { Admin } from '../model/Admin';
import { Requisition } from '../model/Requisition';

class RequisitionService {
	async Register(name, phone, date, location, exam) {
		const newRequisition = new Requisition({
			name,
			phone,
			date,
			location,
			exam,
			examFinished: false
		});  

		try {
			await newRequisition.save();
			return {status: 303}
		} catch(err) {
			console.error(err.message);
		}
	}

	async UserAdmin(name, email, password) {
		const newUser = new Admin({
			name, 
			email,
			password
		});

		try {
			await newUser.save();
			return {status: 303}
		} catch(err) {
			console.error(err.message);
		}
	}

	async GetAllRequisitions(scheduledRequistion) {
		if(scheduledRequistion) {

			return await Requisition.find();

		} else {
			
			let requisition = await Requisition.find({'examFinished': false});
			let requisitions = [];

			requisition.forEach(req => {
				if(req.date != undefined) {
					requisitions.push(RequisitionFactory.Build(req));
				}
			});

			return requisitions;
		}
	}

	async GetRequisitionById(id) {
		try {

			const result = await Requisition.findOne({'_id': id});

			return  result;
		
		} catch(err) {

			console.error(err.message);
		}
	}

	async getUserByName(name) {
		
		try {

		const result = await Requisition.findOne({'name': name});

		return result;
	} catch(err) {
		console.error(err.messsage);
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

	async Search(query) {
		try {
			
			let result = await Requisition.find().or([{date: query}]);
			
			return result;
		
		}catch(err) {
			console.error(err.message);
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

	async deleteUser(id, callback) {
		try {

			const result = await Requisition.deleteOne({_id: id}, callback);
			return result;
		} catch (err) {
			console.error(err.message);
		}
	}
}

export default new RequisitionService();