import { Requisition } from '../model/Requisition';
import RequisitionFactory from '../factories/RequisitionFactory.js';

class RequisitionService {
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
}	

export default new RequisitionService();