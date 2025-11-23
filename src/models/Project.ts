import connection from '../database/connection';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Define a interface do objeto (o "molde" dos dados)
export interface Project {
  id: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link: string;
}

// 1. Buscar todos os projetos
export const getAllProjects = async (): Promise<Project[]> => {
  const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM projetos');
  return rows as Project[];
};

// 2. Adicionar novo projeto
export const adicionarProjeto = async (projeto: Omit<Project, 'id'>): Promise<number> => {
  const { nome, descricao, tecnologias, link } = projeto;
  
  const [result] = await connection.execute<ResultSetHeader>(
    'INSERT INTO projetos (nome, descricao, tecnologias, link) VALUES (?, ?, ?, ?)',
    [nome, descricao, tecnologias, link]
  );
  
  return result.insertId;
};

// 3. Deletar projeto por ID
export const deletarProjetoPorId = async (id: number): Promise<void> => {
  await connection.execute('DELETE FROM projetos WHERE id = ?', [id]);
};

// 4. Buscar um único projeto pelo ID (para edição)
export const getProjetoPorId = async (id: number): Promise<Project | null> => {
  const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM projetos WHERE id = ?', [id]);
  const projetos = rows as Project[];
  return projetos[0] || null;
};

// 5. Editar projeto
export const editarProjeto = async (id: number, novosDados: Omit<Project, 'id'>): Promise<void> => {
  const { nome, descricao, tecnologias, link } = novosDados;
  
  await connection.execute(
    'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link = ? WHERE id = ?',
    [nome, descricao, tecnologias, link, id]
  );
};