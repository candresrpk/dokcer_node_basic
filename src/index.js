import express from 'express'
import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'

config()

const app = express()



const pool = createPool({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_PASWORD,
    port: process.env.MYSQLDB_PORT,
})


console.log({
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_PASWORD,
    port: process.env.MYSQLDB_PORT,
})

app.set('port', 3000)

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/ping', async (req, res) => {
    const result = await pool.query('SELECT NOW()')
    res.json(result[0])
})



app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
})