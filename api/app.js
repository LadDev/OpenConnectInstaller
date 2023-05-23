const express = require("express")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
const { config } = require('dotenv')
config()

const cors = require('cors')
const app = express()

app.use(cors())

app.use(fileUpload({}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit:5000}));

app.use(function (req, res, next) {
    res.setHeader('X-Powered-By', 'LadDev Apps')
    next()
})

app.use("/api", require("./routes/api.route"))

const API_PORT = process.env.API_PORT || 10033

async function start(){
    try{
        app.listen(API_PORT, () => {
            console.log(`Server admin app has bin started on port ${API_PORT}`)
        })
    }catch (e){
        // В случае ошибки выводим сообщение об ошибке в консоль
        console.log("Server Error:", e.message)
        process.exit(0)
    }
}

start()
