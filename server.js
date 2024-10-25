const { getReq, getReqById } = require('./methods/get-request'); 
const { postReq } = require('./methods/post-request'); 
const { putReq } = require('./methods/put-request'); 
const { deleteReq } = require('./methods/delete-request'); 

const express = require('express');
const app = express();
const PORT = 5001; 

app.use(express.json());

// zadanie 1.1 Stworzenie routów dla resourców swojego tematu
app.get('/api/costumes', (req, res) => {
    getReq(req, res); 
});

// zadanie 1.1 Stworzenie routów dla resourców swojego tematu
app.get('/api/costumes/:id', (req, res) => {
    getReqById(req, res); 
});

// zadanie 1.1 Stworzenie routów dla resourców swojego tematu
app.post('/api/costumes', (req, res) => {
    postReq(req, res); 
});

// zadanie 1.1 Stworzenie routów dla resourców swojego tematu
app.put('/api/costumes/:id', (req, res) => {
    putReq(req, res); 
});

// zadanie 1.1 Stworzenie routów dla resourców swojego tematu
app.delete('/api/costumes/:id', (req, res) => {
    deleteReq(req, res);
});

// zadanie 1.6 Konfiguracja serwera
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`); 
});
