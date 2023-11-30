const swaggerJSDOC = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata informacion. Pilas, el versionamiento es por que es comun tener 
// diferentes versiones de nuestra API
const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "Api Historia Clinica",
            version: "5.0.0",
        }
    },
    apis:[
        './app.js'
    ]
}

// Documentacion en formato Json
// Obviamente json!!!
const swaggerSpec = swaggerJSDOC(options);

const swaggerDocs = (app,port)=>{
    app.use('/doc-api-v1',swaggerUi.serve, swaggerUi.setup(swaggerSpec))
    
}

module.exports = {swaggerDocs}