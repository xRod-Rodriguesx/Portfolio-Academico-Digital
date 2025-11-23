import connection from '../database/connection';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Define a interface do objeto (o "molde" dos dados)
export interface Formacao {
    id: number;
    instituicao: string;
    curso: string;
    data_inicio: string;
    data_fim: string;
    descricao: string;
}

// 1. Buscar todas as formações
export const getAllFormacoes = async (): Promise<Formacao[]> => {
    const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM formacoes');
    return rows as Formacao[];
};

// 2. Adicionar nova formação
export const adicionarFormacao = async (formacao: Omit<Formacao, 'id'>): Promise<number> => {
    const { instituicao, curso, data_inicio, data_fim, descricao } = formacao;
    
    const [result] = await connection.execute<ResultSetHeader>(
        'INSERT INTO formacoes (instituicao, curso, data_inicio, data_fim, descricao) VALUES (?, ?, ?, ?, ?)',
        [instituicao, curso, data_inicio, data_fim, descricao]
    );
    
    return result.insertId;
};

// 3. Deletar formação por ID
export const deletarFormacaoPorId = async (id: number): Promise<void> => {
    await connection.execute('DELETE FROM formacoes WHERE id = ?', [id]);
};

// 4. Buscar uma única formação pelo ID
export const getFormacaoPorId = async (id: number): Promise<Formacao | null> => {
    const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM formacoes WHERE id = ?', [id]);
    const formacoes = rows as Formacao[];
    
    // CORREÇÃO: Se formacoes[0] for undefined, retornamos null. Isso acalma o TypeScript.
    return formacoes[0] || null;
};

// 5. Atualizar formação
export const atualizarFormacao = async (id: number, dados: Omit<Formacao, 'id'>): Promise<void> => {
    const { instituicao, curso, data_inicio, data_fim, descricao } = dados;
    
    await connection.execute(
        'UPDATE formacoes SET instituicao = ?, curso = ?, data_inicio = ?, data_fim = ?, descricao = ? WHERE id = ?',
        [instituicao, curso, data_inicio, data_fim, descricao, id]
    );
};