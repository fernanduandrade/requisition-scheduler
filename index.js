//Imports para o funcionando do servidor
import express from 'express';
import cors from 'cors';
import bodyParse from 'body-parser';

import morgan from 'morgan';

//import para conecção com db
import mongoose from 'mongoose';

//Imports do Model e Serviço

//Instânciando o express
const app = express();

//Porta do servidor
const port = 3009;

//Conexão com Mongo
mongoose.connect("mongodb://localhost:27017/requisitions",{useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('useFindAndModify', false);

//Parser dados das requesições 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Arquivos estátco
app.use(express.static("public"));

//Permitir outros usar localmente
app.use(cors());

//Log das requesições
app.use(morgan());

//Template engine 
app.set('view engine', 'ejs');

//Iniciando o servidor
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});