const express = require("express")
const app = express()

const bodyParser = require("body-parser")

const axios = require("axios")

const dotenv = require("dotenv")
dotenv.config()

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server running successfully!' })
})

app.get('/linkrequest', async (req, res) => {
    let editedLink = req.body.link.concat(`${process.env.INFURA_AUTH_KEY}`)
    try {
        const response = await axios.get(`${editedLink}`)
        res.status(200).json(response.data)
    } catch (err) {
        res.status(400).json({ error: err.response.data ? err.response.data : "Something went wrong, check your request URL" })
    }
})

app.get('/:asset_address&:chain_id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.unmarshal.com/v1/${req.params.chain_id}/address/${req.params.asset_address}/assets?auth_key=CE2OvLT9dk2YgYAYfb3jR1NqCGWGtdRd1eoikUYs`)
        res.status(200).json(response.data)
    } catch (err) {
        res.status(400).json({ error: err.response.data ? err.response.data : "Something went wrong, check your request URL" })
    }
})