const costumesData = require('../data/costumes.json'); // Załaduj dane kostiumów
const crypto = require("crypto");

const resolvers = {
  Query: {
    costumes: () => costumesData, // Pobierz wszystkie kostiumy
    costume: (_, { id }) => costumesData.find(costume => costume.id === id), // Pobierz kostium po ID
  },
  Mutation: {
    addCostume: (_, { name, year, category, rating, available, size, rentalPrice, description }) => {
      const newCostume = {
        id: crypto.randomUUID(),
        name,
        year,
        category,
        rating,
        available,
        size,
        rentalPrice,
        description,
      };
      costumesData.push(newCostume); // Dodaj nowy kostium do bazy danych
      return newCostume;
    },
    updateCostume: (_, { id, ...rest }) => {
      const index = costumesData.findIndex(costume => costume.id === id);
      if (index === -1) return null;
      const updatedCostume = { ...costumesData[index], ...rest };
      costumesData[index] = updatedCostume; // Zaktualizuj kostium
      return updatedCostume;
    },
    deleteCostume: (_, { id }) => {
      const index = costumesData.findIndex(costume => costume.id === id);
      if (index === -1) return null;
      const deletedCostume = costumesData[index];
      costumesData.splice(index, 1); // Usuń kostium
      return deletedCostume;
    },
  },
};

module.exports = resolvers; // Zadanie 2.2 Implementacja resolverów gQL
