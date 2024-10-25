const express = require('express');
const router = express.Router();

const costumes = [
    {
        id: '1',
        name: 'Czarny Pirat',
        year: '2023',
        category: 'Historyczny',
        rating: 4.8,
        available: true,
        size: 'M',
        rentalPrice: 25.99,
        description: 'Kostium czarnego pirata z peleryną, kapeluszem i sztuczną bronią.'
    },
    {
        id: '2',
        name: 'Superbohaterka',
        year: '2023',
        category: 'Fantastyka',
        rating: 4.9,
        available: true,
        size: 'S',
        rentalPrice: 30.00,
        description: 'Kostium superbohaterki z peleryną, maską i akcesoriami.'
    },
    {
        id: '3',
        name: 'Kostium Dyni',
        year: '2023',
        category: 'Halloween',
        rating: 4.3,
        available: true,
        size: 'L',
        rentalPrice: 20.00,
        description: 'Kostium dyni z kapeluszem na Halloween.'
    },
    {
        id: '4',
        name: 'Wiking',
        year: '2023',
        category: 'Historyczny',
        rating: 4.7,
        available: false,
        size: 'XL',
        rentalPrice: 27.50,
        description: 'Kostium wikinga z hełmem, peleryną i mieczem.'
    },
    {
        id: '5',
        name: 'Kostium Klowna',
        year: '2023',
        category: 'Impreza',
        rating: 4.0,
        available: true,
        size: 'M',
        rentalPrice: 22.00,
        description: 'Wesoły kostium klowna z peruką i noskiem.'
    },
];


/**
 * @swagger
 * /api/costumes:
 *   get:
 *     summary: Zwraca listę kostiumów
 *     responses:
 *       200:
 *         description: Lista kostiumów
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Costume'
 */

/**
 * @swagger
 * /api/costumes/{id}:
 *   get:
 *     summary: Zwraca kostium na podstawie ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID kostiumu
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Kostium
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Costume'
 *       404:
 *         description: Kostium nie znaleziony
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Costume:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         year:
 *           type: string
 *         category:
 *           type: string
 *         rating:
 *           type: number
 *         available:
 *           type: boolean
 *         size:
 *           type: string
 *         rentalPrice:
 *           type: number
 *         description:
 *           type: string
 */

router.get('/', (req, res) => {
    res.json(costumes);
});

router.get('/:id', (req, res) => {
    const costume = costumes.find(c => c.id === req.params.id);
    if (costume) {
        res.json(costume);
    } else {
        res.status(404).send('Kostium nie znaleziony');
    }
});

module.exports = router;
