module.exports = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (req.url === "/api/costumes") {
    res.statusCode = 200; // Zadanie 1.3 Poprawnie użycie kodów HTTP
    res.setHeader("Content-Type", "application/json"); // Zadanie 1.4 Poprawne użycie nagłówków HTTP
    res.write(JSON.stringify(req.costumes));
    res.end();
  } else if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
    res.end(
      JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid",
      })
    );
  } else if (baseUrl === "/api/costumes/" && regexV4.test(id)) {
    res.setHeader("Content-Type", "application/json"); // Zadanie 1.4 Poprawne użycie nagłówków HTTP
    let filteredCostume = req.costumes.filter((costume) => {
      return costume.id === id;
    });

    if (filteredCostume.length > 0) {
      res.statusCode = 200; // Zadanie 1.3 Poprawnie użycie kodów HTTP
      res.write(JSON.stringify(filteredCostume));
      res.end();
    } else {
      res.statusCode = 404; // Zadanie 1.3 Poprawnie użycie kodów HTTP
      res.write(
        JSON.stringify({ title: "Not Found", message: "Costume not found" })
      );
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" }); // Zadanie 1.3 Poprawnie użycie kodów HTTP
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
};
