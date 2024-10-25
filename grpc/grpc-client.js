const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../costumes.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const costumesProto = grpc.loadPackageDefinition(packageDefinition).costumes;

const client = new costumesProto.CostumeService('localhost:50051', grpc.credentials.createInsecure());

client.GetCostumes({}, (error, response) => {
    if (error) {
        console.error('Error fetching costumes:', error);
        return;
    }
    console.log('Costumes:', response.costumes);
});

client.GetCostume({ id: '213976be-9157-4daa-992b-5b93f68540a6' }, (error, response) => {
    if (error) {
        console.error('Error fetching costume:', error);
        return;
    }
    console.log('Costume:', response);
});

const newCostume = {
    id: 'new-id-001',
    name: 'New Costume',
    year: '2024',
    category: 'Fantasy',
    rating: '4.0',
    available: true,
    size: 'M',
    rentalPrice: 22.99,
    description: 'A brand new fantasy costume.'
};

client.CreateCostume(newCostume, (error, response) => {
    if (error) {
        console.error('Error creating costume:', error);
        return;
    }
    console.log('Created Costume:', response);
});

const updatedCostume = {
    id: 'new-id-001',
    name: 'Updated Costume',
    year: '2024',
    category: 'Fantasy',
    rating: '4.5',
    available: false,
    size: 'L',
    rentalPrice: 30.00,
    description: 'An updated fantasy costume.'
};

client.UpdateCostume(updatedCostume, (error, response) => {
    if (error) {
        console.error('Error updating costume:', error);
        return;
    }
    console.log('Updated Costume:', response);
});

client.DeleteCostume({ id: 'new-id-001' }, (error, response) => {
    if (error) {
        console.error('Error deleting costume:', error);
        return;
    }
    console.log('Deleted Costume:', response);
});
