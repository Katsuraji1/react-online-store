const express = require("express");
require('dotenv').config()
const models = require('./models/models')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/route')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)



app.use(errorHandler)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => console.log(`Server started on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()