import { Admin } from '../Models/Admin.js';

class AdminService {
    async getByName(name) {
		
		try { 
			return await Admin.findOne({'name': name});
		
		} catch(error) {
			console.log(error);
		} 	
	}
}

export default new AdminService();