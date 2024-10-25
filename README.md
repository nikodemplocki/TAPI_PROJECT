# TAPI_PROJECT

START:

terminal1: node server.js

terminal2: node graphql/server.js

terminal3: node grpc/grpc-server.js

terminal4: node grpc/grpc-client.js

terminal5: node docs/swagger.js


ZADANIE 1. ZAPYTANIA:

GET: http://localhost:5001/api/costumes

POST: http://localhost:5001/api/costumes

GET: http://localhost:5001/api/costumes/:id 

PUT: http://localhost:5001/api/costumes/:id 

DELETE: http://localhost:5001/api/costumes/:id

ZADANIE 2. ZAPYTANIA GRAPHQL

a) wszystkie kostiumy

{
  costumes {
    id
    name
    year
    category
    rating
    available
    size
    rentalPrice
    description
  }
}

b)Zapytanie o pojedynczy kostium

{
  costume(id: "fe6b22d1-e0cc-4642-acfa-41905c039663") {
    id
    name
    year
    category
    rating
    available
    size
    rentalPrice
    description
  }
}

}

c)dodawanie kostiumu

mutation {
  addCostume(
    name: "Nowy Kostium",
    year: "2024",
    category: "Fantasy",
    rating: 5.0,
    available: true,
    size: "M",
    rentalPrice: 30.0,
    description: "Opis nowego kostiumu."
  ) {
    id
    name
  }
}


f)aktualizacja kostiumu

mutation {
  updateCostume(id: "88427a31-bb95-467d-8628-34e9568eabc1", input: {
    name: "Zaktualizowany Kostium",
    year: "2025",
    category: "Sci-Fi",
    rating: "4.5",
    available: false,
    size: "L",
    rentalPrice: 40,
    description: "Zaktualizowany opis kostiumu."
  }) {
    id
    name
  }
}




