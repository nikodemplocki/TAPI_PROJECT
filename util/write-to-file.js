const fs = require("fs");
const path = require("path");

const writeToFile = (data) => {
  fs.writeFile(
    path.join(__dirname, "../data/costumes.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err; // Zadanie 1.6 Konfiguracja serwera
    }
  );
};

module.exports = writeToFile;
