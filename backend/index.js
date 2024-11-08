require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:8080' }));
app.use(express.json());

// Endpoint de registro
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Usuario ya existe' });
                }
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            res.status(201).json({ message: 'Usuario registrado' });
        }
    );
});

// Endpoint de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        async (err, results) => {
            if (err || results.length === 0) {
                return res.status(400).json({ error: 'Usuario o contraseña incorrecta' });
            }

            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: 'Usuario o contraseña incorrecta' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES,
            });
            res.json({ message: 'Login exitoso', token });
        }
    );
});

// Endpoint para guardar las estadísticas del juego
app.post('/api/stats', async (req, res) => {
    const { userId, result } = req.body;
    if (!userId || !result) return res.status(400).json({ error: "Datos inválidos" });

    try {
        const query = 'INSERT INTO user_stats (user_id, result) VALUES (?, ?)';
        await db.query(query, [userId, result]);
        res.status(201).json({ message: "Estadísticas guardadas exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al guardar las estadísticas" });
    }
});

// Endpoint para obtener las estadísticas del usuario logeado
app.get('/api/stats/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const query = 'SELECT result, created_at FROM user_stats WHERE user_id = ? ORDER BY created_at DESC';
        const [results] = await db.query(query, [userId]);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las estadísticas" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
