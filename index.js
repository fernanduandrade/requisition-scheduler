//Imports para o funcionando do servidor
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import RequisitionService from './services/RequesitionService.js';

import morgan from 'morgan';
import log from 'log-beautify';

//import para conecção com db
import mongoose from 'mongoose';

//Imports do Model e Serviço

//Instânciando o express
const app = express();

//Porta do servidor
const port = 9000;

//Conexão com Mongo
mongoose.connect("mongodb://localhost:27017/appointments",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

//Log das requesições
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

//Parser dados das requesições 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Template engine 
app.set('view engine', 'ejs');

//Arquivos estátco
app.use(express.static("public"));

//Permitir outros usar localmente
app.use(cors());

//Rotas
app.get('/', (req, res) => {
	res.render('index');
});

app.get('/liberados', async(req, res) => {

	let requisition = await RequisitionService.GetAllRequisitions(false);
	res.json(requisition);

});

app.get('/cadastro', (req, res) => {
	res.render('registerRequisition');
});

app.get('/lista', async(req,res) => {

	let requisitions = await RequisitionService.GetAllRequisitions(true);
	res.render('listRequisition', {requisitions})
});

app.get('/pesquisarAgendado', async(req, res) => {
	
	let query = req.query.search;
	let requisitions = await RequisitionService.Search(query);

	res.render('listRequisition', {requisitions});

});

app.get('/paciente/:id', async (req, res) => {
	
	let id = req.params.id;
	let requisition = await RequisitionService.GetRequisitionById(id);

	res.render('userRequisition', {requisition});

});

app.get('/logout', (req, res) => {
	res.send('oi');
});

app.post('/cadastro', async(req, res) => {
	let data = await RequisitionService.Register(
		req.body.name,
		req.body.phone,
		req.body.date,
		req.body.location,
		req.body.exam
	);

	if(data) {
		res.redirect('/');
	} else {
		res.status(400);
	}
});

//Log costumizada 
log.setColors({
    custom_: "green",
});
log.setSymbols({
    custom_: "✅ ",
});

//Iniciando o servidor
app.listen(port, () => {
	log.custom_(`Server listening on port ${port}`);
});