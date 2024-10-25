const http = require("http");
const getReq = require("./methods/get-request");
const postReq = require("./methods/post-request");
const putReq = require("./methods/put-request");
const deleteReq = require("./methods/delete-request");
let costumes = require("./data/costumes.json");

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.costumes = costumes; // Zadanie 1.6 Konfiguracja serwera
  switch (req.method) {
    case "GET":
      getReq(req, res); // Zadanie 1.1 Stworzenie routów dla resourców
      break;
    case "POST":
      postReq(req, res); // Zadanie 1.1 Stworzenie routów dla resourców
      break;
    case "PUT":
      putReq(req, res); // Zadanie 1.1 Stworzenie routów dla resourców
      break;
    case "DELETE":
      deleteReq(req, res); // Zadanie 1.1 Stworzenie routów dla resourców
      break;
    default:
      res.statusCode = 404; // Zadanie 1.3 Poprawnie użycie kodów HTTP
      res.setHeader("Content-Type", "application/json"); // Zadanie 1.4 Poprawne użycie nagłówków HTTP
      res.write(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
      res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`); // Zadanie 1.6 Konfiguracja serwera
});
