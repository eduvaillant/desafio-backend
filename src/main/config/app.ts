import express from 'express'
import cors from 'cors'
import router from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors)

app.use('/api', router)

export default app
