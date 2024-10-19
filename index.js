const express = require('express');
const axios = require('axios');  // Para hacer solicitudes HTTP
const app = express();
const port = process.env.PORT || 3000;
const openAiApiKey = process.env.OPENAI_API_KEY;  // Asegúrate de tener tu clave API de OpenAI en las Config Vars

// Middleware para procesar JSON
app.use(express.json());

// Ruta para recibir solicitudes desde el plugin
app.post('/process-command', async (req, res) => {
    const { command } = req.body;  // Supongo que el plugin envía un comando

    if (!command) {
        return res.status(400).json({ error: 'Comando no proporcionado.' });
    }

    try {
        // Aquí realizas la solicitud a OpenAI
        const response = await axios.post(
            'https://api.openai.com/v1/completions', // URL de OpenAI
            {
                prompt: command,  // El comando se envía como 'prompt'
                max_tokens: 100  // Configura la cantidad de tokens según tu necesidad
            },
            {
                headers: {
                    'Authorization': `Bearer ${openAiApiKey}`,  // Tu clave API de OpenAI
                    'Content-Type': 'application/json'
                }
            }
        );

        // Devuelve el resultado al plugin de WordPress
        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error procesando la solicitud de OpenAI.' });
    }
});

// Levanta la app en el puerto proporcionado por Heroku
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
