import { Request, Response } from 'express';
// Importa nosso "molde" e nosso "banco de dados"
import { Project, Projetos, deletarProjetoPorId, editarProjeto, getProjetoPorId, adicionarProjeto } from '../models/Project';

export const addProject = (req: Request, res: Response) => {
  // 1. Pega os dados que vieram do formulário (do req.body)
  const { nome, descricao, tecnologias, link } = req.body;

  // 2. Cria um novo ID (só para nosso array)
  const ultimoProjeto = Projetos[Projetos.length - 1];
  const novoId = ultimoProjeto ? ultimoProjeto.id + 1 : 1;

  // 3. Cria o novo objeto de projeto
  const novoProjeto: Project = {
    id: novoId,
    nome: nome,
    descricao: descricao,
    tecnologias: tecnologias,
    link: link
  };
  console.log('>>> [ProjectController.addProject] Enviando para adicionarProjeto:', novoProjeto); 
  adicionarProjeto(novoProjeto);

  res.redirect('/admin/projetos');

  // 4. "Salva" o novo projeto no nosso banco de dados (o array)
  Projetos.push(novoProjeto);

  // 5. Redireciona o usuário de volta para a página de projetos
  res.redirect('/admin/projetos');
};

//Função de deleção
export const deleteProject = (req: Request, res: Response) => {
  // 1. Pega o ID que veio pela URL (ex: /projetos/delete/5)
  // Usamos parseInt para transformar o texto "5" no número 5
  const idParaDeletar = parseInt(req.params.id || '0');

  // 2. Chama a função do nosso "banco" para deletar
  deletarProjetoPorId(idParaDeletar);

  // 3. Responde ao JavaScript que deu tudo certo
  // Em vez de redirecionar (res.redirect), vamos mandar um JSON.
  // O JavaScript no navegador vai decidir o que fazer (recarregar a página).
  res.json({ success: true });
};

//Função de edição  
export const updateProject = (req: Request, res: Response) => {
  // 1. Pega o ID da URL
  const id = parseInt(req.params.id || '0');

  // 2. Pega os dados atualizados que o fetch enviou no "body"
  const novosDados = req.body;

  // 3. Chama a função de editar
  editarProjeto(id, novosDados);

  // 4. Responde ao JavaScript que deu tudo certo
  res.json({ success: true });
};