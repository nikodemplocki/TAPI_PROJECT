const costumes = require('../data/costumes.json'); 
const fs = require('fs'); 

// zadanie 1.1 Poprawne użycie metod HTTP
// zadanie 1.5 HATEOAS: Funkcja obsługująca żądanie DELETE dla usuwania kostiumu
function deleteReq(req, res) {
    const { id } = req.params; 
    const index = costumes.findIndex(c => c.id === id); 
    
    if (index === -1) {
        return res.status(404).json({ error: "Costume not found" }); // zadanie 1.3 Poprawnie użycie kodów HTTP: Zwracanie kodu 404, jeśli kostium nie istnieje
    }

    costumes.splice(index, 1); 
    fs.writeFileSync('./data/costumes.json', JSON.stringify(costumes, null, 2)); 
    
    // zadanie 1.2 Poprawne użycie nagłówków HTTP: Ustawienie nagłówków dla odpowiedzi
    res.set('Content-Type', 'application/json'); 
    res.json({ // zadanie 1.3 Poprawnie użycie kodów HTTP: Zwracanie wiadomości o sukcesie usunięcia
        message: "Costume deleted",
        links: [ 
            { rel: "self", method: "GET", href: `/api/costumes/${id}` },
            { rel: "create", method: "POST", href: `/api/costumes` }
        ]
    });
}

module.exports = { deleteReq }; 
