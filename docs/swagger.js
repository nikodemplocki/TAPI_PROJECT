const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const costumesController = require('./costumesController'); 

const app = express();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Costumes API',
        version: '1.0.0',
        description: 'API do zarządzania kostiumami',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./docs/costumesController.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/costumes', costumesController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
