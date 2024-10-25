const costumesData = require('../data/costumes.json');
const crypto = require("crypto");

const resolvers = {
  Query: {
    costumes: () => costumesData, 
    costume: (_, { id }) => costumesData.find(costume => costume.id === id), 
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
      costumesData.push(newCostume); // dodawawnie
      return newCostume;
    },
    updateCostume: (_, { id, ...rest }) => {
      const index = costumesData.findIndex(costume => costume.id === id);
      if (index === -1) return null;
      const updatedCostume = { ...costumesData[index], ...rest };
      costumesData[index] = updatedCostume; // aktualizacja
      return updatedCostume;
    },
    deleteCostume: (_, { id }) => {
      const index = costumesData.findIndex(costume => costume.id === id);
      if (index === -1) return null;
      const deletedCostume = costumesData[index];
      costumesData.splice(index, 1); // usuwanie
      return deletedCostume;
    },
  },
};

module.exports = resolvers; // Zadanie 2.2 Implementacja resolverów gQL
