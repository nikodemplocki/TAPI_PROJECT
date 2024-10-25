const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/costumes/" && regexV4.test(id)) { // Zadanie 1.1 Stworzenie routów dla resourców
    try {
      let body = await requestBodyparser(req);
      const index = req.costumes.findIndex((costume) => {
        return costume.id === id;
      });
      if (index === -1) {
        res.statusCode = 404; // Zadanie 1.3 Poprawnie użycie kodów HTTP
        res.write(
          JSON.stringify({ title: "Not Found", message: "Costume not found" })
        );
        res.end();
      } else {
        req.costumes[index] = { id, ...body };
        writeToFile(req.costumes);
        res.writeHead(200, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
        res.end(JSON.stringify(req.costumes[index]));
      }
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
