import express from "express"
import cors from "cors"

import mongoConnection from "./db/connect.js"
import envsConfig from "./config/envs.config.js"

// rutas
import authRoutes from "./routes/auth.routes.js"
import postsRoutes from "./routes/post.routes.js"

// swagger
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openapiDocument = YAML.load(path.join(__dirname, "docs", "openapi.yaml"));

const app = express()
mongoConnection()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/posts", postsRoutes)

// swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiDocument))

app.listen(envsConfig.PORT, () => {
    console.log("Servidor express habilitado.")
})