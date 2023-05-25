const {Router} = require("express")
const router = Router()
const {exec} = require('child_process');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const authData = require("../config.json")
const auth = require("../middleware/admin.middleware")


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

router.post("/auth", async (req, res) => {
    try {

        const {email, password} = req.body

        if(password === authData.password && email === authData.email){
            let token = jwt.sign({email, password}, authData.salt.toString('utf-8'))
            return res.status(201).json({code: 0, message: "", token: token})
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/status", auth, async (req, res) => {
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

router.get("/show/users", auth, async (req, res) => {
    try {
        const filePath = '/etc/ocserv/ocpasswd';

        const usersFile = fs.readFileSync(filePath, 'utf8').split("\n")

        exec('occtl --json show users', async (error, stdout) => {
            try{
                const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0, users: data,usersFile});
            }catch (e) {
                return res.status(200).json({code: 0, users: []});
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/user/:user", auth, async (req, res) => {
    try {

        const {user} = req.params

        exec('occtl --json show id '+user, async (error, stdout) => {
            try{
                const data = await parseData(JSON.parse(stdout)) || [];
                return res.status(200).json({code: 0, user: data.length > 0?data[0]:{}});
            }catch (e) {
                return res.status(200).json({code: 0, user: {}});
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/user/:id/disconnect", auth, async (req, res) => {
    try {

        const {id} = req.params
        exec('occtl --json disconnect id '+id, async (error, stdout) => {
            try{
                //const data = await parseData(JSON.parse(stdout)) || [];
                return res.status(200).json({code: 0});
            }catch (e) {
                return res.status(200).json({code: 0, user: {}});
            }
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/all", auth, async (req, res) => {

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

router.get("/show/sessions/valid", auth, async (req, res) => {
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

router.get("/show/ip/bans", auth, async (req, res) => {
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

router.get("/show/ip/bans/points", auth, async (req, res) => {
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

router.get("/show/iroutes", auth, async (req, res) => {
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

router.get("/start", auth, async (req, res) => {
    try {
        exec('sudo systemctl restart ocserv', async (error, stdout) => {
            try{
                console.log(stdout)
                // const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/reload", auth, async (req, res) => {
    try {
        exec('occtl reload', async (error, stdout) => {
            try{
                console.log(stdout)
                // const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/reset", auth, async (req, res) => {
    try {
        exec('occtl reset', async (error, stdout) => {
            try{
                console.log(stdout)
                // const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/stop-now", auth, async (req, res) => {
    try {
        exec('occtl stop now', async (error, stdout) => {
            try{
                console.log(stdout)
                // const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.post("/add/user", auth, async (req, res) => {
    try {

        const {username,password,group} = req.body
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userEntry = `${username}:${group}:${hashedPassword}\n`;

        fs.appendFileSync('/etc/ocserv/ocpasswd', userEntry);



        exec('occtl --json show users', async (error, stdout) => {
            try{
                const usersFile = fs.readFileSync('/etc/ocserv/ocpasswd', 'utf8').split("\n")
                const data = await parseData(JSON.parse(stdout));
                return res.status(200).json({code: 0, users: data,usersFile});
            }catch (e) {
                return res.status(200).json({code: 0, users: []});
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.post("/edit/user", auth, async (req, res) => {
    try {

        const {username,password,group} = req.body

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userEntry = `${username}:${group}:${hashedPassword}\n`;

        const filePath = '/etc/ocserv/ocpasswd';

        const usersFile = fs.readFileSync(filePath, 'utf8').split("\n")

        let newUsersFile = []

        for(const usr of usersFile){
            if(usr !== ""){
                const oldUserData = usr.split(":")

                if(oldUserData[0] === username){
                    newUsersFile.push(userEntry)
                }else{
                    newUsersFile.push(usr)
                }
            }
        }

        fs.writeFileSync(filePath,newUsersFile.join("\n"))

        return res.status(200).json({code: 0});

    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})


module.exports = router
