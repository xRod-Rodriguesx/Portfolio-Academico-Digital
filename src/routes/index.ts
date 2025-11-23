import { Router } from 'express';
import * as PageController from '../controllers/PageController';
import * as ProjectController from '../controllers/ProjectController';
import * as AuthController from '../controllers/AuthController';
import { requireAdmin } from '../controllers/AuthController';


// Cria o roteador
const router = Router();


//GETS
router.get('/', PageController.homePage); // Define a rota principal "/" para usar o controlador "homePage"
router.get('/formacao', PageController.formacaoPage);
router.get('/projetos', PageController.projetosPage);
router.get('/competencias', PageController.competenciasPage);
router.get('/admin', PageController.loginPage);
router.get('/admin/logout', AuthController.handleLogout);
router.get('/sobre-mim', PageController.sobreMimPage);

// Rotas Protegidas - Apenas para administradores
router.get('/admin/projetos', requireAdmin, PageController.adminProjetosPage); 
router.get('/admin/edit/:id', requireAdmin, PageController.editPage);           


//PUTS
router.put('/admin/update/:id', requireAdmin, ProjectController.updateProject);

//POSTS
router.post('/admin/add-project', requireAdmin, ProjectController.addProject);
router.post('/admin/login', AuthController.handleLogin);

//DELETES
router.delete('/admin/projetos/delete/:id', requireAdmin, ProjectController.deleteProject);


export default router;