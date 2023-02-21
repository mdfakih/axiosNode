const express = require("express")
const app = express()

const bodyParser = require("body-parser")

const axios = require("axios")

const dotenv = require("dotenv")
dotenv.config()


app.use(bodyParser.json())

app.listen(process.env.PORT, () => {
    console.log(`Server is running at https://localhost:${process.env.PORT}`)
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