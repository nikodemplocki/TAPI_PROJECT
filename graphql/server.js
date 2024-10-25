const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema'); // Importuj definicje typów
const resolvers = require('./resolvers'); // Importuj resolvery

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Uruchom serwer na porcie 4000
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`); // Zadanie 2.3 Konfiguracja serwera GraphQL
});
