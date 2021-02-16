import {Router} from 'express';
import RequisitionController from '../controllers/RequisitionController';
import AdminController from '../controllers/AdminController';
import RequisitionService from '../services/RequesitionService.js';
import {checkNotAuthenticated, isAuthenticated} from '../middleware/authMiddleware';
import passport from 'passport';

const router = Router();

router.get('/agendados', isAuthenticated, RequisitionService.listAppointment);
router.get('/lista', isAuthenticated, RequisitionService.pagination);
router.get('/pesquisarAgendado', isAuthenticated, RequisitionService.queryByDate);
router.get('/paciente/:id', isAuthenticated, RequisitionService.index);
router.get('/editar/:id', isAuthenticated, RequisitionService.editRequisition);

router.get('/register', checkNotAuthenticated,(req, res) => {
	res.render('registerUserAdmin');
});

router.get('/cadastro', isAuthenticated, (req, res) => {
	res.render('registerRequisition');
});

router.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login');
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

router.get('/', isAuthenticated,(req, res) => {
	res.render('index.ejs');
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
