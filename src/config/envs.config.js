
import { fileURLToPath } from "url"
import path from "path"
import dotenv from "dotenv"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Intenta cargar .env desde diferentes ubicaciones relativas
const envPaths = [
    path.resolve(__dirname, "../../../.env"),
    path.resolve(__dirname, "../../.env"),
    path.resolve(__dirname, "../.env"),
    path.resolve(process.cwd(), ".env")
]

// Intenta cada path hasta encontrar uno que funcione
for (const envPath of envPaths) {
    const result = dotenv.config({ path: envPath })
    if (!result.error) {
        console.log(`Variables de entorno cargadas desde: ${envPath}`)
        break
    }
}

// Verifica que las variables requeridas estén definidas
const requiredEnvVars = ['PORT', 'MONGO_URL', 'SECRET_KEY']
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingEnvVars.length > 0) {
    throw new Error(`Variables de entorno requeridas no encontradas: ${missingEnvVars.join(', ')}`)
}

export default {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL,
    SECRET_KEY: process.env.SECRET_KEY
}
