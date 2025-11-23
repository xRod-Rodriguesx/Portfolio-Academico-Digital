import { Request, Response } from 'express';
import { Formacao, adicionarFormacao, deletarFormacaoPorId, atualizarFormacao } from '../models/Formacao';

export const addFormacao = async (req: Request, res: Response) => {
    try {
        // 1. Pega os dados do formulário
        const { instituicao, curso, data_inicio, data_fim, descricao } = req.body;

        // 2. Monta o objeto
        const novaFormacao: Omit<Formacao, 'id'> = {
            instituicao,
            curso,
            data_inicio,
            data_fim,
            descricao
        };

        // 3. Chama o Model para inserir no banco
        await adicionarFormacao(novaFormacao);

        // 4. Redireciona para a área administrativa
        res.redirect('/admin/formacoes');
    } catch (error) {
        console.error('Erro ao adicionar formação:', error);
        res.status(500).send('Erro ao cadastrar formação. Verifique o console.');
    }
};

export const deleteFormacao = async (req: Request, res: Response) => {
    try {
        // CORREÇÃO LINHA 31: Adicionado "|| '0'" para garantir que seja string
        const id = parseInt(req.params.id || '0');
        await deletarFormacaoPorId(id);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao deletar formação:', error);
        res.json({ success: false, error: error });
    }
};

export const updateFormacao = async (req: Request, res: Response) => {
    try {
        // CORREÇÃO LINHA 42: Adicionado "|| '0'" para garantir que seja string
        const id = parseInt(req.params.id || '0');
        const dadosAtualizados = req.body;
        
        await atualizarFormacao(id, dadosAtualizados);
        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao atualizar formação:', error);
        res.json({ success: false, error: error });
    }
};