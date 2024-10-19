const express = require('express');
const app = express();
const port = process.env.PORT || 20937;

app.use(express.json());

// Endpoint para procesar comandos
app.post('/process-command', (req, res) => {
    const command = req.body.entrada; // Obtener el comando desde el cuerpo de la solicitud
    if (!command) {
        return res.status(400).json({ error: 'Comando no proporcionado.' });
    }

    // Procesar el comando (lógica personalizada)
    const resultado = `Comando procesado en Heroku: ${command}`;
    
    // Responder con el resultado procesado
    res.json({ resultado });
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
