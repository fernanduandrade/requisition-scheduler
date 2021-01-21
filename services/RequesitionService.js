import requisition from '../model/Requisition.js';
import mongoose from 'mongoose';
import RequisitionFactory from '../factories/RequisitionFactory.js';

const RequisitionModel = mongoose.model("Requisition", requisition);

class RequisitionService {
	async Register(name, phone, date, location, exam) {
		const newRequisition = new RequisitionModel({
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
		const newUser = new RequisitionModel({
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

			return await RequisitionModel.find();

		} else {
			
			let requisition = await RequisitionModel.find({'examFinished': false});
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

			const result = await RequisitionModel.findOne({'_id': id});

			return  result;
		
		} catch(err) {

			console.error(err.message);
		}
	}

	async getUserByName(name) {
		
		try {

		const result = await RequisitionModel.findOne({'name': name});

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
			
			let result = await RequisitionModel.find().or([{date: query}]);
			
			return result;
		
		}catch(err) {
			console.error(err.message);
		}
	}

	async getTotalRegisters() {
		try {
			let result = await RequisitionModel.find({'examFinished': false}).countDocuments();
			
			return result;

		} catch(err) {
			console.error(err.message);
		}
	}

	async deleteUser(id, callback) {
		try {

			const result = await RequisitionModel.deleteOne({_id: id}, callback);
			return result;
		} catch (err) {
			console.error(err.message);
		}
	}
}

export default new RequisitionService();