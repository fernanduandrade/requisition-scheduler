import { Admin } from '../model/Admin.js';
class AdminController {
    async create(req, res) {

        const { name, email, password } = req.body;
    
        try {
            const newAdminUser = new Admin({
                name,
                email,
                password,
            });
	    	
            await newAdminUser.save();

            if(newAdminUser) {
                return res.redirect('/');
            } else {
                return res.redirect('/register');
            }
	    
	    
        } catch(err) {
            return res
                    .status(400)
                    .json(err);
        }
    }
}

export default new AdminController();
