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

// Endpoint para obtener estadísticas de todos los usuarios
app.get('/api/stats', (req, res) => {
    const query = `
        SELECT 
            users.id, 
            users.username, 
            SUM(CASE WHEN user_stats.result = 'win' THEN 1 ELSE 0 END) AS wins,
            SUM(CASE WHEN user_stats.result = 'lose' THEN 1 ELSE 0 END) AS losses
        FROM users
        LEFT JOIN user_stats ON users.id = user_stats.user_id
        GROUP BY users.id
        ORDER BY users.username
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener las estadísticas' });
        }
        res.json(results);
    });
});

// Endpoint para obtener las estadísticas del usuario logeado
app.get('/api/stats/:userId', (req, res) => {
    const { userId } = req.params;

    const query = 'SELECT result, created_at FROM user_stats WHERE user_id = ? ORDER BY created_at DESC';

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error al obtener las estadísticas" });
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.query('SELECT username FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ error: 'Error al obtener el nombre de usuario' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ username: results[0].username });
    });
});
