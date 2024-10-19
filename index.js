const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const openAiApiKey = process.env.OPENAI_API_KEY;

// Middleware para procesar JSON
app.use(express.json());

// Ruta para recibir comandos desde el plugin
app.post('/process-command', (req, res) => {
    const command = req.body.command; // Comando que envía el plugin

    if (!command) {
        return res.status(400).json({ error: 'Comando no proporcionado.' });
    }

    // Procesa el comando y responde
    const resultado = `Comando procesado en Heroku: ${command}`;
    res.json({ resultado });
});

// Levanta la app en el puerto proporcionado por Heroku
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
