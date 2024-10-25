const costumes = require('../data/costumes.json'); 
const fs = require('fs'); 

// zadanie 1.1 Poprawne użycie metod HTTP
// zadanie 1.5 HATEOAS: Funkcja obsługująca żądanie PUT dla aktualizacji kostiumu
function putReq(req, res) {
    const { id } = req.params; 
    const index = costumes.findIndex(c => c.id === id); 
    
    if (index === -1) {
        return res.status(404).json({ error: "Costume not found" }); // zadanie 1.3 Poprawnie użycie kodów HTTP: Zwracanie kodu 404, jeśli kostium nie istnieje
    }

    const updatedCostume = { ...costumes[index], ...req.body }; 
    costumes[index] = updatedCostume; 
    fs.writeFileSync('./data/costumes.json', JSON.stringify(costumes, null, 2)); 
    
    // zadanie 1.2 Poprawne użycie nagłówków HTTP: Ustawienie nagłówków dla odpowiedzi
    res.set('Content-Type', 'application/json'); 
    res.json({ 
        message: "Costume updated",
        costume: updatedCostume,
        links: [ // HATEOAS: dodawanie linków do zaktualizowanego kostiumu
            { rel: "self", method: "GET", href: `/api/costumes/${updatedCostume.id}` },
            { rel: "delete", method: "DELETE", href: `/api/costumes/${updatedCostume.id}` }
        ]
    });
}

module.exports = { putReq }; 