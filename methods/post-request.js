const crypto = require("crypto");
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
  if (req.url === "/api/costumes") { // Zadanie 1.1 Stworzenie routów dla resourców
    try {
      let body = await requestBodyparser(req);
      body.id = crypto.randomUUID(); // Zadanie 1.5 HATEOAS - generowanie unikalnego ID
      req.costumes.push(body);
      writeToFile(req.costumes);
      res.writeHead(201, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
      res.end(JSON.stringify(body)); // Zwracanie utworzonego kostiumu
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
      res.end(
        JSON.stringify({
          title: "Validation Failed",
          message: "Request body is not valid",
        })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
