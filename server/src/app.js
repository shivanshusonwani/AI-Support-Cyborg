import express from "express"
import chatRoutes from './Routes/chat.routes.js'
import agentRoutes from './Routes/agent.routes.js'
import authRoutes from './Routes/auth.routes.js'

const app = express()

app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({ message: "OK" })
})

app.use('/api/chat', chatRoutes)
app.use('/api/agent', agentRoutes)
app.use('/api/auth', authRoutes)

export default app
