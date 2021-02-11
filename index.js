import express from 'express';
import flash from 'express-flash';
import session  from 'express-session';

import { Strategy as LocalStrategy} from 'passport-local';
import passport from 'passport';

import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

import {checkNotAuthenticated} from './middleware/authMiddleware';

import Datebase from './database/connection';
import router from './router/router';
import morgan from 'morgan';
import methodOverride from 'method-override'

import { Admin } from './model/Admin';
import AdminService from './services/AdminService.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = 3001 || process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(flash());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static("public"));
app.use(methodOverride('_method'));
app.use(cors());

app.use(session ({
	secret:'secreto',
	saveUninitialized: true,
	resave: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
	},
    async (name, password, done) => {
        try {
            const user = await AdminService.getByName(name);
			console.log({user})

            if (!user) { return done(null, false) }

            const isValid = bcrypt.compareSync(password, user.password);

			if (!isValid) return done(null, false)
 
            return done(null, user)
        } catch (err) {
            done(err, false);
        }
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
	Admin.findById(id)
  	.then((user) => {
		  done(null, user);
	})
	.catch(err => done(err)) 
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect:'/login', 
	failureFlash: 'Usuário ou senha inválido',
}));

app.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

app.use('/', router);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});