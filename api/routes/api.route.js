const {Router} = require("express")
const router = Router()
const {exec} = require('child_process');
const fs = require('fs');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

const modifyData = async (data) => {
    let obj = {...data};

    let modifiedObj = {};

    for (let prop in obj) {
        let newProp = prop.replace(/[^\w]/g, '').toLowerCase();
        modifiedObj[newProp] = obj[prop];
    }

    return modifiedObj
}

const parseData = async (data) => {
    let modifiedData = null
    if(data instanceof Array){
        modifiedData = []
        for(const obj of data){
            modifiedData.push(await modifyData(obj))
        }
    }else if(data instanceof Object){
        modifiedData =  await modifyData(data)
    }

    return modifiedData
}

router.get("/show/status", async (req, res) => {
    try {
        exec('occtl --json show status', async (error, stdout) => {
            try{
                const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0, status: data});
            }catch (e) {
                console.error(e)
                return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/users", async (req, res) => {
    try {
        exec('occtl --json show users', async (error, stdout) => {
            try{
                const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0, users: data});
            }catch (e) {
                return res.status(200).json({code: 0, users: []});
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/all", async (req, res) => {

    try {
        exec('occtl --json show sessions all', async (error, stdout) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = await parseData(JSON.parse(jsonString));
                return res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                return res.status(200).json({code: 0, sessions: []});
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/valid", async (req, res) => {
    try {
        exec('occtl --json show sessions valid', async (error, stdout) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = await parseData(JSON.parse(jsonString));
                return res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                return res.status(200).json({code: 0, sessions: []});
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/show/ip/bans", async (req, res) => {
    try {
        exec('occtl --json show ip bans', async (error, stdout) => {
            try{
                console.error(stdout)
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = await parseData(JSON.parse(jsonString));
                return res.status(200).json({code: 0, data: data});
            }catch (e) {
                return res.status(200).json({code: 0, data: []});
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/show/ip/bans/points", async (req, res) => {
    try {
        exec('occtl --json show ip bans points', async (error, stdout) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = await parseData(JSON.parse(jsonString));
                return res.status(200).json({code: 0, data: data});
            }catch (e) {
                return res.status(200).json({code: 0, data: []});
            }
        });
    } catch (error) {
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/show/iroutes", async (req, res) => {
    try {
        exec('occtl --json show iroutes', async (error, stdout) => {
            try{

                const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0, data: data});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.post("/add/user", async (req, res) => {
    try {

        const {username,password,group} = req.body
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userEntry = `${username}:${group}:${hashedPassword}\n`;

        fs.appendFileSync('/etc/ocserv/ocpasswd', userEntry);

        exec('occtl --json show users', async (error, stdout) => {
            try{
                const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0, users: data});
            }catch (e) {
                return res.status(200).json({code: 0, users: []});
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})


module.exports = router
