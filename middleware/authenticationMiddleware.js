export const isAuthenticated = (req,res, next) => {
	try {
		if (req.isAuthenticated())  
			return next();
		res.redirect('/login');
	
	} catch(err) {
		console.error(err.message);
	}
}

export const checkNotAuthenticated = (req, res, next) => {
	if(req.isAuthenticated()) {
		return res.redirect('/')
	} else {
  		next ()
	}
}