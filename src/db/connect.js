
import mongoose from "mongoose"
import envsConfig from "../config/envs.config.js"

async function mongoConnection() {
    try {
        await mongoose.connect(envsConfig.MONGO_URL,  {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return console.log("Servidor express conectado a MONGO.")
        
    } catch (err) {
        return console.error(err)
    }
}

export default mongoConnection