const costumes = require('../data/costumes.json');

// zadanie 1.1 Poprawne użycie metod HTTP
// zadanie 1.5 HATEOAS: Funkcja obsługująca żądanie GET dla wszystkich kostiumów
function getReq(req, res) {
    const enrichedCostumes = costumes.map(costume => ({
        ...costume,
        links: [ // HATEOAS: dodawanie linków do każdego kostiumu
            { rel: "self", method: "GET", href: `/api/costumes/${costume.id}` },
            { rel: "update", method: "PUT", href: `/api/costumes/${costume.id}` },
            { rel: "delete", method: "DELETE", href: `/api/costumes/${costume.id}` }
        ]
    }));

    // zadanie 1.2 Poprawne użycie nagłówków HTTP: Ustawienie nagłówków dla odpowiedzi
    res.set('Content-Type', 'application/json'); 
    res.json(enrichedCostumes);
}

// zadanie 1.1 Poprawne użycie metod HTTP
// zadanie 1.5 HATEOAS: Funkcja obsługująca żądanie GET dla kostiumu o określonym ID
function getReqById(req, res) {
    const { id } = req.params; 
    const costume = costumes.find(c => c.id === id); 

    if (!costume) {
        return res.status(404).json({ error: "Costume not found" }); // zadanie 1.3 Poprawnie użycie kodów HTTP: Zwracanie kodu 404, jeśli kostium nie istnieje
    }

    const enrichedCostume = {
        ...costume,
        links: [
            { rel: "self", method: "GET", href: `/api/costumes/${costume.id}` },
            { rel: "update", method: "PUT", href: `/api/costumes/${costume.id}` },
            { rel: "delete", method: "DELETE", href: `/api/costumes/${costume.id}` }
        ]
    };

    // zadanie 1.2 Poprawne użycie nagłówków HTTP: Ustawienie nagłówków dla odpowiedzi
    res.set('Content-Type', 'application/json'); 
    res.json(enrichedCostume);
}

module.exports = { getReq, getReqById };
