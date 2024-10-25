const { Buffer } = require("buffer");

module.exports = (req) => {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk); // Zadanie 1.6 Konfiguracja serwera
    });
    req.on("end", () => {
      const body = Buffer.concat(chunks).toString();
      try {
        const jsonBody = JSON.parse(body); // Zadanie 1.5 HATEOAS - przetwarzanie danych
        resolve(jsonBody);
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
};
