const express = require('express');
const router = express.Router();
const pool = require('../db');

// Endpoint para registrar una nueva gaseosa
router.post('/registro', async (req, res) => {
    const { sabor, cantidad, valorTotal, estado, modoPago, size, persona_nombre,fechaVenta } = req.body;
    try {
        console.log('Datos recibidos para registrar:', req.body);
        const result = await pool.query(
            `INSERT INTO gaseosas (sabor, cantidad, valortotal, estado, modoPago, tamano, persona_nombre,fechaventa)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [sabor, cantidad, valorTotal, estado, modoPago, size, persona_nombre,fechaVenta]
        );
        console.log('Resultado de la inserción:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error al registrar gaseosa:', err);
        console.error('Detalles del error:', err);
        res.status(500).json({ error: 'Error al registrar gaseosa', details: err.message });
    }
});

// Endpoint para actualizar una gaseosa existente
router.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { sabor, cantidad, valorTotal, estado, modoPago, size, persona_nombre } = req.body;
    try {
        console.log('Datos recibidos para actualizar:', req.body);
        const result = await pool.query(
            `UPDATE gaseosas
            SET sabor = $1, 
            cantidad = $2,
            valorTotal = $3, 
            estado = $4, 
            modoPago = $5, 
            tamano = $6, 
            persona_nombre = $7
             WHERE id = $8
             RETURNING *`,
            [sabor, cantidad, valorTotal, estado, modoPago, size, persona_nombre, id]
        );
        console.log('Resultado de la actualización:', result.rows[0]);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error al actualizar gaseosa:', err);
        console.error('Detalles del error:', err);
        res.status(500).json({ error: 'Error al actualizar gaseosa', details: err.message });
    }
});

// Endpoint para consultar todas las gaseosas
router.get('/consultar', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM gaseosas');
        console.log('Gaseosas obtenidas:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error al consultar gaseosas:', err);
        console.error('Detalles del error:', err);
        res.status(500).json({ error: 'Error al consultar gaseosas', details: err.message });
    }
});

// Endpoint para consultar todas las gaseosas
router.get('/consultar/:fecha', async (req, res) => {
    try {
        const { fecha } = req.params;
        const fechaValida = new Date(fecha).toISOString().split('T')[0]; 
        const result = await pool.query('SELECT * FROM gaseosas where fechaventa = $1', [fechaValida]);

        console.log('Gaseosas obtenidas:', result.rows);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error al consultar gaseosas:', err);
        console.error('Detalles del error:', err);
        res.status(500).json({ error: 'Error al consultar gaseosas', details: err.message });
    }
});


// Endpoint para eliminar una gaseosa
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM gaseosas WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error('Error al eliminar gaseosa:', err);
        console.error('Detalles del error:', err);
        res.status(500).json({ error: 'Error al eliminar gaseosa', details: err.message });
    }
});

module.exports = router;