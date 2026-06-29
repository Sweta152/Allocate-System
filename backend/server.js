require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())

app.use('/api/auth', require('./src/modules/auth/auth.routes'))
app.use('/api/tasks', require('./src/modules/tasks/tasks.routes'))
app.use('/api/reports', require('./src/modules/reports/reports.routes'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`))