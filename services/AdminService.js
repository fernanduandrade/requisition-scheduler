import { Admin } from '../model/Admin.js';

class AdminService {
    async getByName(name) {
		
		try { 
			return await Admin.findOne({'name': name});
		
		} catch(error) {
			console.error(error.messsage);
		} 	
	}
}

export default new AdminService();