const jwt = require("jsonwebtoken")
const authData = require("../config.json")

let admin = async (req, res, next) =>{
    if(req.method == "OPTIONS"){
        return next()
    }

    try{

        const token = req.headers["authorization"].split(' ')[1] // "Bearer TOKEN"

        if(!token){
            return res.status(401).json({code: -1, message: "Authenticate required"})
        }

        try{
            const decoded = jwt.verify(token, authData.salt.toString('utf-8'))
            req.admin = decoded


            if(authData.email !== decoded.email && authData.password !== decoded.password){
                return res.status(400).json({code: -2, message: "User not found"});
            }

            next()
        }catch (e) {
            return res.status(401).json({code: -1, message: "Invalid API token"})
        }

    }catch (e){
        return res.status(401).json({code: -1, message: "Authenticate required"})
    }
}

module.exports = admin
