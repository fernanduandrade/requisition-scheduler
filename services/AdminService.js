import { Admin } from '../model/Admin.js';

class AdminService {
    async getByName(name) {
		
		try {

			const result = await Admin.findOne({'name': name});
			return result;
		
		} catch(error) {
			console.error(error.messsage);
		} 	
	}
}

export default new AdminService();