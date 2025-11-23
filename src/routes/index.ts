import { Router } from 'express';
import * as PageController from '../controllers/PageController';
import * as ProjectController from '../controllers/ProjectController';
import * as FormacaoController from '../controllers/FormacaoController';
import * as AuthController from '../controllers/AuthController';
import { requireAdmin } from '../controllers/AuthController';

const router = Router();

// --- ROTAS PÚBLICAS ---
router.get('/', PageController.homePage);
router.get('/formacao', PageController.formacaoPage);
router.get('/projetos', PageController.projetosPage);
router.get('/competencias', PageController.competenciasPage);
router.get('/sobre-mim', PageController.sobreMimPage);

// --- ROTAS DE LOGIN ---
router.get('/admin', PageController.loginPage); // Tela de Login
router.post('/admin/login', AuthController.handleLogin); // Processa Login
router.get('/admin/logout', AuthController.handleLogout); // Sair

// --- ÁREA ADMINISTRATIVA (Protegida) ---

// 1. Painel Principal (Dashboard) - NOVA ROTA
router.get('/admin/dashboard', requireAdmin, PageController.adminDashboard);

// 2. Gerenciamento de Projetos
router.get('/admin/projetos', requireAdmin, PageController.adminProjetosPage); 
router.post('/admin/add-project', requireAdmin, ProjectController.addProject);
router.delete('/admin/projetos/delete/:id', requireAdmin, ProjectController.deleteProject);
router.get('/admin/edit/:id', requireAdmin, PageController.editPage);
router.put('/admin/update/:id', requireAdmin, ProjectController.updateProject);

// 3. Gerenciamento de Formações
router.get('/admin/formacoes', requireAdmin, PageController.adminFormacoesPage);
router.post('/admin/add-formacao', requireAdmin, FormacaoController.addFormacao);
router.delete('/admin/formacoes/delete/:id', requireAdmin, FormacaoController.deleteFormacao);
router.get('/admin/formacoes/edit/:id', requireAdmin, PageController.editFormacaoPage);
router.put('/admin/formacoes/update/:id', requireAdmin, FormacaoController.updateFormacao);

export default router;