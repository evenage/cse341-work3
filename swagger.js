const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Cars Api and owner Api",
description: "Api document for Cars and owner",
  },
  host: "localhost:3000",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
