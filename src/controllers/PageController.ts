import { Request, Response } from 'express';
import { Project, Projetos, deletarProjetoPorId, editarProjeto, getProjetoPorId, adicionarProjeto } from '../models/Project';

// Lógica da Página Inicial
export const homePage = (req: Request, res: Response) => {
  const mensagemDoServidor = "Esta é uma mensagem vinda direto do servidor!!!!";

  // Corrigido: 'activePage' foi movido para dentro do objeto
  res.render('index', { 
    mensagem: mensagemDoServidor,
    activePage: 'apresentacao' 
  });
};

// Lógica da Página de Formação
export const formacaoPage = (req: Request, res: Response) => {
  // Corrigido: Removida a segunda chamada do res.render()
  res.render('formacao', { activePage: 'formacao' });
};

// Lógica da Página de Projetos
export const projetosPage = (req: Request, res: Response) => {
  // 1. Pega a lista de projetos do "banco"
  const lista = Projetos;

  // 2. Envia a lista para a página EJS
  // Corrigido: 'activePage' foi movido para dentro do objeto
  res.render('projetos', {
    listaDeProjetos: lista,
    activePage: 'projetos'
  });
};

// Lógica da Página de Competências
export const competenciasPage = (req: Request, res: Response) => {
  res.render('competencias', { activePage: 'competencias' });
};

// Lógica da Página Sobre Mim
export const sobreMimPage = (req: Request, res: Response) => {
  res.render('sobre-mim', { activePage: 'sobre-mim' }); // Nome do EJS e ID para o highlight
};


// --- PÁGINAS DE ADMIN ---

// Lógica da Página de Admin-projetos
export const adminProjetosPage = (req: Request, res: Response) => {
  const lista = Projetos;
  res.render('projetos-admin', {
    listaDeProjetos: lista
  });
};

export const loginPage = (req: Request, res: Response) => {
    // Passamos 'erro: null' para evitar erro no EJS na primeira vez
    res.render('login', { erro: null }); 
  };

// Lógica da Página de Admin
export const adminPage = (req: Request, res: Response) => {
  res.render('admin');
};

// Lógica da Página de EDIÇÃO (GET)
export const editPage = (req: Request, res: Response) => {
  // 1. Pega o ID da URL
  const id = parseInt(req.params.id || '0');
  // 2. Busca o projeto no "banco"
  const projeto = getProjetoPorId(id);

  // 3. Renderiza a página de edição, passando o projeto
  // Corrigido: Renderiza 'edit-project' e envia 'projeto'
  res.render('edit-project', { 
    projeto: projeto
  });

};

