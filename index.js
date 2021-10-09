import express from 'express';
import flash from 'express-flash';
import session  from 'express-session';
import morgan from 'morgan';

import RequisitionService from './services/RequesitionService.js';

import passport from 'passport';
import passConfig from './middleware/passportConfig.js';
import bodyParser from 'body-parser';
import cors from 'cors';

import Datebase from './database/connection.js';
import router from './router/router.js';

import dotenv from 'dotenv';
dotenv.config();

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(flash());
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static("public"));

app.use(session ({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: false,
	cookie: {
		maxAge: 60000 * 60
	}
}));

app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');

passConfig(app);

const pollTime = 10000;


app.use('/', router);

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`);
});

setInterval(async () => {
	await RequisitionService.sendNotification();
}, pollTime)
