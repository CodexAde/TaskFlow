import express from "express"
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"

import { authenticatingToken } from "./middleware/auth.middleware.js"

import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/tasks',authenticatingToken, taskRoutes)
app.use('/api/dashboard', dashboardRoutes)

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app