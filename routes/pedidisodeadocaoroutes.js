import express from 'express';
import { pedidoAdocao } from '../database/index.js';


const router = express.Router();

router.post('/pedidoadocao', async (req, res) => {
    try {
        const pedidoAdocao = await pedidoAdocao.create({
            id: req.body.id, 
            tutor_id: req.body.tutor_id,
            animal_id: req.body.animal_id,
            status: req.body.status, 
            posicao_fila: req.body.posicao_fila,
            criado_em: req.body.criado_em,
        });
        
        res.log("Pedido criado com sucesso:");
        res.status(201).json(pedidoAdocao);

        if (!tutor_id || !animal_id) {
            res.status(404).json({error: 'tutor ou animal não encontrado'});
        }
        const pedididoExistente = await pedidoAdocao.findOne({
            where: { tutor_id, animal_id, status: "em_analise" }
          });
      
          if (pedidoExistente) {
            return res.status(409).json({ erro: "Este tutor já tem um pedido de adoção para este animal" });
          }
          
    } catch (error) {
        console.log(`Erro ao enviar o pedido de adoção: ${error}`);
        res.status(400).json({ error: 'O tutor ainda não respondeu o questionário obrigatório' }); 

        console.error(err);
        return res.status(500).json({ erro: "Erro ao registrar o pedido de adoção" });
    }
}); 