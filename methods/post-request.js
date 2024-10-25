const costumes = require('../data/costumes.json'); 
const fs = require('fs'); 
const { v4: uuidv4 } = require('uuid'); 

// zadanie 1.1 Poprawne użycie metod HTTP
// zadanie 1.5 HATEOAS: Funkcja obsługująca żądanie POST dla dodania nowego kostiumu
function postReq(req, res) {
    const newCostume = { id: uuidv4(), ...req.body }; 
    costumes.push(newCostume); 
    fs.writeFileSync('./data/costumes.json', JSON.stringify(costumes, null, 2)); 
    
    // zadanie 1.2 Poprawne użycie nagłówków HTTP: Ustawienie nagłówków dla odpowiedzi
    res.set('Content-Type', 'application/json');
    res.status(201).json({ // zadanie 1.3 Poprawnie użycie kodów HTTP: Zwracanie kodu 201 dla pomyślnego dodania
        message: "Costume added",
        costume: newCostume,
        links: [ 
            { rel: "self", method: "GET", href: `/api/costumes/${newCostume.id}` },
            { rel: "update", method: "PUT", href: `/api/costumes/${newCostume.id}` },
            { rel: "delete", method: "DELETE", href: `/api/costumes/${newCostume.id}` }
        ]
    });
}

module.exports = { postReq }; 
