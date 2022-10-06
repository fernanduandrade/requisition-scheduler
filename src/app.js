import express from 'express';
import flash from 'express-flash';
import session  from 'express-session';
import morgan from 'morgan';
import path from 'path';

import RequisitionService from './Services/RequesitionService.js';

import passport from 'passport';
import passConfig from './Middleware/passportConfig.js';
import cors from 'cors';

import Datebase from './Database/connection.js';
import router from './Router/router.js';

import dotenv from 'dotenv';
dotenv.config();

export class App {
    #express;
    #PORT = process.env.PORT || 3000;
    #__dirname = path.resolve();

    constructor() {
        this.#express = express();
        this.#middlewares();
        this.#routes();
        this.#listen();

        passConfig(this.#express);
    }

    

    #middlewares() {
        this.#express.use(express.json());
        this.#express.use(cors());
        this.#express.use(express.urlencoded({extended: true}));

        this.#express.use(flash());
        this.#express.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
        this.#express.use(session ({
            secret: process.env.SESSION_SECRET_KEY,
            saveUninitialized: true,
            resave: false,
            cookie: {
                maxAge: 60000 * 120
            }
        }));
        
        this.#express.use(passport.initialize());
        this.#express.use(passport.session());
        this.#express.use(express.static('./src/Public'));
        this.#express.set('views', path.join(this.#__dirname, './src/Views'));
        this.#express.set('view engine', 'ejs');
        
    }

    #listen() {
        this.#express.listen(this.#PORT, () => {
            console.log(`Servidor rodando na porta ${this.#PORT}`);
        });
    }

    #routes() {
        this.#express.use('/', router);
    }

    getApp() {
        return this.#express;
    }
}

const pollTime = 30000;

setInterval(async () => {
	await RequisitionService.sendNotification();
}, pollTime)
