import express from "express"
import chatRoutes from './Routes/chat.routes.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({ message: "OK" })
})

app.use('/api/chat', chatRoutes)


export default app
