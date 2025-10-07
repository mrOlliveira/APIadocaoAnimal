import express from 'express';
import { connect } from './database/index.js';
import usuarioroutes from './routes/usuarioroutes.js';
import animaisroutes from './routes/animaisroutes.js';
import pedidoadocaoroutes from './routes/pedidisodeadocaoroutes.js';
import doacaoroutes from './routes/doacaoroutes.js';
import autenticationroutes from './routes/autenticationroutes.js';
import questionarioroutes from './routes/questionarioroutes.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:3001',
}));

app.use(express.json());

connect();

app.use('/api', usuarioroutes);
app.use('/api', animaisroutes);
app.use('/api', pedidoadocaoroutes);
app.use('/api', doacaoroutes);
app.use('/api', autenticationroutes);
app.use('/api', questionarioroutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Adoção de Animais rodando 🚀' });
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando em: http://localhost:${PORT}`);
});
