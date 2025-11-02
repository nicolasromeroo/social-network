import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Social Media API",
    version: "1.0.0",
    description: "API documentation for the Social Media application",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/docs/*.yaml", "./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
