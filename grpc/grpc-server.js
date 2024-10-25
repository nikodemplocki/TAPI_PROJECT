const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../costumes.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const costumesProto = grpc.loadPackageDefinition(packageDefinition).costumes;

const costumesData = require('../data/costumes.json');

// zadanie 3.2 Implementacja resolverów serwisów opisanych w pliku .proto
const getCostumes = (call, callback) => {
    callback(null, { costumes: costumesData });
};

const getCostumeById = (call, callback) => {
    const costume = costumesData.find(c => c.id === call.request.id); // szukanie po id
    if (costume) {
        callback(null, costume); // zwraca znaleziony
    } else {
        callback({
            code: grpc.status.NOT_FOUND,
            details: "Not Found" // jezeli nieznaleziony
        });
    }
};

// zadanie 3.3 Konfiguracja serwera
const server = new grpc.Server();
server.addService(costumesProto.CostumeService.service, {
    getCostumes: getCostumes,
    getCostumeById: getCostumeById,
    // TODO inne metody, takie jak CreateCostume, UpdateCostume, DeleteCostume
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC Server running on http://localhost:50051');
    server.start();
});
