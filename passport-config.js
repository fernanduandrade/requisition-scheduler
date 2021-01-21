import LocalStrategy from 'passport-local'

import bcrypt from 'bcrypt';

import requisition from './model/Requisition.js';
import mongoose from 'mongoose';



const RequisitionModel = mongoose.model("Requisition", requisition);

LocalStrategy.Strategy();

function initialize(passport) {
	const authenticateUser = async(email, password, done) => {
		const user = await RequisitionModel.find({"email": email});

		if(user == null) {
			return done(null, false, {message: 'Não há admin cadastrado com esse email'})
		}

		try {
			if(await bcrypt.compare(password, user.password)){
				return done(null, user);
			} else {
				return done(null, false, {message: 'Senha incorreta'});
			}
		} catch(err) {
			return done(err);
		}
	}

	passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
	passport.serializerUser((user, done) => {})
	passport.deserializerUser((_id, done) => {})
}

export default initialize;