
import mongoose from "mongoose"
import envsConfig from "../config/envs.config.js"

async function mongoConnection() {
    if (!envsConfig.MONGO_URL) {
        throw new Error("MONGO_URL no está definida en las variables de entorno. Asegúrate de que el archivo .env existe y contiene MONGO_URL.")
    }

    try {
        await mongoose.connect(envsConfig.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log("✅ Servidor express conectado a MongoDB.")
        console.log(`📦 Base de datos: ${mongoose.connection.name}`)
        
    } catch (err) {
        console.error("❌ Error al conectar con MongoDB:")
        console.error(err)
        process.exit(1) // Terminar la aplicación si no puede conectar a MongoDB
    }
}

export default mongoConnection