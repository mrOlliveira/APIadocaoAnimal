import express from 'express';
import { animal } from '../database/index.js';

const router = express.Router();


router.post('/animais', async (req, res) => {
    try {
        const novoAnimal = await animal.create({
            nome: req.body.nome, 
            especie: req.body.especie,
            porte: req.body.porte,
            castrado: req.body.cadastrado,
            vacinado: req.body.vacinado,
            descricao: req.body.descricao,
            foto: req.body.foto
        });
        res.status(201).json(novoAnimais); 
    } catch (error) {
        console.log(`Erro ao criar animal: ${error}`);
        res.status(400).json({ error: 'Falha ao criar animal' }); 
    }
});


router.get('/animais', async (req, res) => {
    try {
        const animais = await animal.findAll(); 
        res.json(animais);
    } catch (error) {
        console.log(`Erro ao buscar animais: ${error}`);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.get ('/animal/:id', async (req, res) => {
    try {
        const animal = await animal.findByPk(req.params.id);
        if (!animal) {
            return res.status(404).json({ error: 'Animal não encontrado' });
        }
        res.json(animal);
    }catch (error) {
        console.log(`Erro ao buscar animal: ${error}`);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

router.put('/animal/:id', async (req, res) => {
    try {
        const [update] = await animal.update(req.body, {
            where: { id: req.params.id }
        });
        
        if (update) {
            const animalAtualizado = await animal.findByPk(req.params.id);
            res.json(animalAtualizado);
        } else {
            res.status(404).json({ error: 'animal não encontrado' });
        }
    } catch (error) {
        console.log(`Erro ao atualizar animal: ${error}`);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.delete('/animal/:id', async (req, res) => {
    try {
        const deleted = await animal.destroy({
            where: { id: req.params.id },
        });
        
        if (deleted) {
            res.status(204).end(''); 
        } else {
            res.status(404).json({ error: 'animal não encontrado' });
        }
    } catch (error) {
        console.log(`Erro ao deletar animal: ${error}`);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

export default router;