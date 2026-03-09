import 'dotenv/config'

const config = {
    port: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI,
    gemini: {
        api_key: process.env.GEMINI_API_KEY
    }
}

export default Object.freeze(config)