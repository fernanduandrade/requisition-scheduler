import {Router} from 'express';
import RequisitionController from '../controllers/RequisitionController';
import AdminController from '../controllers/AdminController';
import { Requisition } from '../model/Requisition';
import RequisitionService from '../services/RequesitionService.js';
import {checkNotAuthenticated, isAuthenticated} from '../middleware/authMiddleware';

import passport from 'passport';

const router = Router();

router.get('/', isAuthenticated,(req, res) => {
	res.render('index.ejs');
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

router.get('/liberados', isAuthenticated, async(req, res) => {

	const requisition = await RequisitionService.GetAllRequisitions(false);
	res.json(requisition);

});

router.get('/cadastro', isAuthenticated, (req, res) => {
	res.render('registerRequisition');
});

router.get('/lista', isAuthenticated, async (req,res) => {
	
	try {
		const {page = 1, limit = 5} = req.query;

		const requisitions = await Requisition.find()
		.limit(limit * 1)
		.skip((page - 1) * limit);

		const totalRegister = await RequisitionService.getTotalRegisters();
		
		res.render('listRequisition', {requisitions, totalRegister});
	
	} catch(err) {
		console.error(err);
	}
});

router.get('/pesquisarAgendado', isAuthenticated,async(req, res) => {
	
	const query = req.query.search;
	
	const totalRegister = await RequisitionService.getTotalRegisters();

	const requisitions = await RequisitionService.Search(query);

	res.render('listRequisition', {requisitions, totalRegister});
});

router.get('/paciente/:id', isAuthenticated, async (req, res) => {
	
	const id = req.params.id;
	const requisition = await RequisitionService.GetRequisitionById(id);

	res.render('userRequisition', {requisition});
});

router.get('/register', checkNotAuthenticated,(req, res) => {
	res.render('registerUserAdmin');
});

router.get('/login', (req, res) => {
	res.render('login');
});

router.get('/editar/:id', isAuthenticated, async(req,res) => {
	
	const id = req.params.id;
	const requisition = await RequisitionService.GetRequisitionById(id);
	res.render('editUser', {requisition});
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect:'/login', 
	failureFlash: 'Usuário ou senha inválido',
}));

router.post('/cadastro', isAuthenticated, RequisitionController.create);
router.post('/register', checkNotAuthenticated, AdminController.create);
router.post('/editar', isAuthenticated, RequisitionController.update);
router.get('/usuario/:id', isAuthenticated, RequisitionController.delete);

export default router;