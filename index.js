import express from 'express';
import flash from 'express-flash';
import session  from 'express-session';
import morgan from 'morgan';

import RequisitionService from './services/RequesitionService.js';

import passport from 'passport';
import passConfig from './middleware/passportConfig.js';
import cors from 'cors';

import Datebase from './database/connection.js';
import router from './router/router.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use(flash());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static("public"));

app.use(session ({
	secret: process.env.SESSION_SECRET_KEY,
	saveUninitialized: true,
	resave: false,
	cookie: {
		maxAge: 60000 * 120
	}
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

passConfig(app);

app.use('/', router);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

const pollTime = 8 * 60 * 60000;

setInterval(async () => {
	await RequisitionService.sendNotification();
}, pollTime)
