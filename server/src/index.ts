import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';

import apiProductRouter from "./routes/productRoutes"
import loginRouter from './routes/loginRoutes'
import accountRouter from './routes/accountRoutes'
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
app.use('/api/account', accountRouter)
app.use(express.static(frontendBuildPath))

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
})