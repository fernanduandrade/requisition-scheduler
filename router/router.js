import {Router} from 'express';
import RequisitionController from '../controllers/RequisitionController.js';
import AdminController from '../controllers/AdminController.js';
import RequisitionService from '../services/RequesitionService.js';
import {checkNotAuthenticated, isAuthenticated} from '../middleware/authMiddleware.js';
import passport from 'passport';

const router = Router();

router.get('/agendados', isAuthenticated, RequisitionService.listAppointment);
router.get('/lista', isAuthenticated, RequisitionService.pagination);
router.get('/pesquisar_agendado', isAuthenticated, RequisitionService.queryByDate);
router.get('/agenda_registrada/:id', isAuthenticated, RequisitionService.index);
router.get('/editar_agenda/:id', isAuthenticated, RequisitionService.editRequisition);
router.get('/registrar_admin', checkNotAuthenticated,(req, res) => res.render('./pages/admin/register_admin'));

router.get('/cadastrar_agenda', isAuthenticated, (req, res) => {
	res.render('./pages/cadastrar_agenda');
});

router.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('./pages/login/login');
});

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

router.get('/', isAuthenticated,(req, res) => {
	res.render('./pages/home.ejs');
});

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect:'/login', 
	failureFlash: 'Usuário ou senha inválido',
}));
router.post('/registrar_agenda', isAuthenticated, RequisitionController.create);
router.post('/registrar_admin', checkNotAuthenticated, AdminController.create);
router.post('/editar_agenda', isAuthenticated, RequisitionController.update);
router.get('/deletar_agenda/:id', isAuthenticated, RequisitionController.delete);

export default router;
