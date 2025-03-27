import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import apiProductRouter from "./routes/productRoutes"
import loginRouter from './routes/loginRoutes'
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT;
const frontendBuildPath = path.join(__dirname, "../dist")
console.log(frontendBuildPath)

// DEV, DONT USE IN PRODUCTION AS IT OPENS ALL ORIGINS
app.use(cors())
app.use(express.json())
app.use('/api/products', apiProductRouter)
app.use('/api/login', loginRouter)
app.use(express.static(frontendBuildPath))

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})