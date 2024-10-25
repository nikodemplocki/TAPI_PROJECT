const { gql } = require('apollo-server');

const typeDefs = gql`
  type Costume {
    id: ID!
    name: String!
    year: String!
    category: String!
    rating: Float!
    available: Boolean!
    size: String!
    rentalPrice: Float!
    description: String!
  }

  type Query {
    costumes: [Costume!]!
    costume(id: ID!): Costume
  }

  type Mutation {
    addCostume(name: String!, year: String!, category: String!, rating: Float!, available: Boolean!, size: String!, rentalPrice: Float!, description: String!): Costume!
    updateCostume(id: ID!, name: String, year: String, category: String, rating: Float, available: Boolean, size: String, rentalPrice: Float, description: String): Costume!
    deleteCostume(id: ID!): Costume!
  }
`;

module.exports = typeDefs; // Zadanie 2.1 Stworzenie definicji typów gQL
