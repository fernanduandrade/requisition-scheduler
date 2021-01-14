import { requisition } from '../model/Requisition.js';
import mongoose from 'mongoose';
import RequisitionFactory from '../factories/RequisitionFactory.js';

const RequisitionModel = mongoose.model("Requisition", requisition);

class RequisitionService {
	async Create(name, phone, description, date) {
		let newRequisition = new RequisitionModel({
			name,
			phone,
			description,
			date,
			examReleased: false
		});  

		try {
			await newRequisition.save();
			return {status: 303}
		} catch(err) {
			console.error(err.message);
		}
	}

	async GetAllRequisition(scheduledRequistion) {
		if(scheduledRequistion) {

			return await RequisitionModel.find();

		} else {

			let requisition = await RequisitionModel.find({'examReleased': false});
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

			let result = await RequisitionModel.findOne({'_id': id});

			return  result;
		
		} catch(err) {

			console.error(ex.message);
		}
	}

	async Search(query) {
		try {
			
			let result = await RequisitionModel.find().or([{name: query}, {phone: query}]);
			
			return result;
		
		}catch(err) {
			console.error(ex.message);
		}
	}
}

export default new RequisitionService();