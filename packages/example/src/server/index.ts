import express from 'express'
import { appRoute } from './routes/app-route'
import { staticFileRoute } from './routes/static-file-route'
import { searchRoute } from './routes/search-route'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', staticFileRoute)
app.use('/api/search', searchRoute)
app.use(appRoute)

const host = 'localhost'
const port = 8080

app.listen(port, host, () => {
  console.log(`Website is running at http://${host}:${port}/`)
})
