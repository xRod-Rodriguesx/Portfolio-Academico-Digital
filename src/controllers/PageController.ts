import { Request, Response } from 'express';
// Imports de Projeto (MySQL)
import { getAllProjects, getProjetoPorId } from '../models/Project';
// Imports de Formação (MySQL)
import { getAllFormacoes, getFormacaoPorId } from '../models/Formacao';

// --- PÁGINAS PÚBLICAS ---

export const homePage = (req: Request, res: Response) => {
  const mensagemDoServidor = "Bem-vindo ao Portfólio Conectado!";
  res.render('index', { 
    mensagem: mensagemDoServidor,
    activePage: 'apresentacao' 
  });
};

// Página de Formação
export const formacaoPage = async (req: Request, res: Response) => {
  try {
    const formacoes = await getAllFormacoes();
    res.render('formacao', { activePage: 'formacao', listaFormacoes: formacoes });
  } catch (error) {
    console.error(error);
    res.render('formacao', { activePage: 'formacao', listaFormacoes: [] });
  }
};

// Página de Projetos (AGORA COM MYSQL)
export const projetosPage = async (req: Request, res: Response) => {
  try {
    // Busca do banco
    const lista = await getAllProjects();
    res.render('projetos', {
      listaDeProjetos: lista,
      activePage: 'projetos'
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.render('projetos', { listaDeProjetos: [], activePage: 'projetos' });
  }
};

export const competenciasPage = (req: Request, res: Response) => {
  res.render('competencias', { activePage: 'competencias' });
};

export const sobreMimPage = (req: Request, res: Response) => {
  res.render('sobre-mim', { activePage: 'sobre-mim' });
};

// --- PÁGINAS DE ADMIN E LOGIN ---

export const loginPage = (req: Request, res: Response) => {
    res.render('login', { erro: null }); 
};

// Admin: Listar Projetos
export const adminProjetosPage = async (req: Request, res: Response) => {
  try {
    const lista = await getAllProjects();
    res.render('projetos-admin', {
      listaDeProjetos: lista
    });
  } catch (error) {
    res.send('Erro ao carregar painel de projetos');
  }
};

// Admin: Listar Formações
export const adminFormacoesPage = async (req: Request, res: Response) => {
  try {
    const formacoes = await getAllFormacoes();
    res.render('formacoes-admin', {
      listaFormacoes: formacoes
    });
  } catch (error) {
    res.send('Erro ao carregar painel de formações');
  }
};

// Admin: Editar Projeto
export const editPage = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0');
  try {
    const projeto = await getProjetoPorId(id);
    if(!projeto) return res.redirect('/admin/projetos');
    
    res.render('edit-project', { projeto: projeto });
  } catch (error) {
    res.redirect('/admin/projetos');
  }
};

// Admin: Dashboard
export const adminDashboard = (req: Request, res: Response) => {
    res.render('admin-dashboard');
};

// Admin: Editar Formação
export const editFormacaoPage = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0');
  try {
    const formacao = await getFormacaoPorId(id);
    if (!formacao) return res.redirect('/admin/formacoes');
    
    res.render('edit-formacao', { formacao: formacao });
  } catch (error) {
    console.error(error);
    res.redirect('/admin/formacoes');
  }
};

