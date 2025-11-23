import { Request, Response } from 'express';
import { Project, adicionarProjeto, deletarProjetoPorId, editarProjeto } from '../models/Project';

export const addProject = async (req: Request, res: Response) => {
  try {
    const { nome, descricao, tecnologias, link } = req.body;
    const novoProjeto: Omit<Project, 'id'> = {
      nome,
      descricao,
      tecnologias,
      link
    };
    
    await adicionarProjeto(novoProjeto);
    res.redirect('/admin/projetos');
  } catch (error) {
    console.error('Erro ao adicionar projeto:', error);
    res.status(500).send('Erro ao salvar projeto no banco de dados.');
  }
};

// Função de deleção blindada
export const deleteProject = async (req: Request, res: Response) => {
  try {
    // Verifica se o ID veio e tenta converter
    const id = parseInt(req.params.id || '');

    if (isNaN(id)) {
        console.error('ID inválido recebido para exclusão:', req.params.id);
        res.status(400).json({ success: false, error: 'ID inválido' });
        return; // Importante: encerrar a função aqui
    }

    console.log(`Tentando deletar projeto com ID: ${id}`); // Log para debug
    await deletarProjetoPorId(id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro CRÍTICO ao deletar projeto:', error);
    // Envia o erro de volta pro navegador para você ver no alert
    res.status(500).json({ success: false, error: 'Erro interno ao deletar' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id || '0');
    const novosDados = req.body;

    await editarProjeto(id, novosDados);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.json({ success: false, error });
  }
};