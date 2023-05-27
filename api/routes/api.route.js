const {Router} = require("express")
const router = Router()
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const authData = require("../config.json")
const auth = require("../middleware/admin.middleware")
const os = require('os');
const osUtils = require('os-utils');
const disk = require('diskusage');
const OcctlExec = require("../OcctlExec");

async function getCpuUsage() {
    return new Promise((resolve) => {
        osUtils.cpuUsage(function (usage) {
            resolve(usage * 100);
        });
    });
}

async function getDiskUsage() {
    return new Promise((resolve) => {

        const path = '/'; // Путь к диску, для которого вы хотите получить информацию

        disk.check(path, function(err, info) {
            if (err) {
                console.error(err);
                return;
            }

            const total = info.total;
            const free = info.available;
            const used = total - free;
            const usagePercent = (used / total) * 100;

            resolve(Number(usagePercent.toFixed(2)));
        });
    });
}


const occtlExec = new OcctlExec()

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

        const cpuUsage = await getCpuUsage();
        const diskUsage = await getDiskUsage();
        const platform = os.platform()
        const freemem = os.freemem()
        const totalmem = os.totalmem()
        const status = await occtlExec.status()

        return res.status(200).json({code: 0, status, system: {platform, freemem, totalmem, cpuUsage, diskUsage}});
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/users", auth, async (req, res) => {
    try {
        const filePath = '/etc/ocserv/ocpasswd';

        const usersFile = fs.readFileSync(filePath, 'utf8').split("\n")

        const users = await occtlExec.users()
        return res.status(200).json({code: 0, users,usersFile});

    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/user/:user", auth, async (req, res) => {
    try {

        const {user} = req.params

        const userData = await occtlExec.user(user)

        return res.status(200).json({code: 0, user: userData});
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/user/:id/disconnect", auth, async (req, res) => {
    try {

        const {id} = req.params
        await occtlExec.disconnectUser(id)
        return res.status(200).json({code: 0});
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/all", auth, async (req, res) => {
    try {
        const sessions = await occtlExec.sessions("all")
        return res.status(200).json({code: 0, sessions: sessions});
    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/valid", auth, async (req, res) => {
    try {
        const sessions = await occtlExec.sessions("valid")
        return res.status(200).json({code: 0, sessions: sessions});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/session/:id", auth, async (req, res) => {
    try {

        const {id} = req.params

        const session = await occtlExec.session(id)
        return res.status(200).json({code: 0, session: session});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/ip/bans", auth, async (req, res) => {
    try {

        const ipBans = await occtlExec.ipBans()
        return res.status(200).json({code: 0, data: ipBans});

    } catch (error) {
        console.error(error)
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/show/ip/bans/points", auth, async (req, res) => {
    try {

        const ipBans = await occtlExec.ipBans(" points")
        return res.status(200).json({code: 0, data: ipBans});
    } catch (error) {
        return res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/show/iroutes", auth, async (req, res) => {
    try {
        const iroutes = await occtlExec.iroutes()
        return res.status(200).json({code: 0, data: iroutes});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/start", auth, async (req, res) => {
    try {
        await occtlExec.start()
        return res.status(200).json({code: 0});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/reload", auth, async (req, res) => {
    try {
        await occtlExec.reload()
        return res.status(200).json({code: 0});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/reset", auth, async (req, res) => {
    try {
        await occtlExec.reset()
        return res.status(200).json({code: 0});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.get("/stop-now", auth, async (req, res) => {
    try {
        await occtlExec.stop()
        return res.status(200).json({code: 0});
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.post("/add/user", auth, async (req, res) => {
    try {

        const {username,password} = req.body
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userEntry = `${username}:*:${hashedPassword}\n`;

        fs.appendFileSync('/etc/ocserv/ocpasswd', userEntry);

        const users = await occtlExec.users()
        const usersFile = fs.readFileSync('/etc/ocserv/ocpasswd', 'utf8').split("\n")
        return res.status(200).json({code: 0, users,usersFile});

    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.post("/edit/user", auth, async (req, res) => {
    try {

        const {username,password} = req.body

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const userEntry = `${username}:*:${hashedPassword}`;

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

        fs.writeFileSync(filePath,newUsersFile.join("\n")+"\n")

        const users = await occtlExec.users()
        const usersFile2 = fs.readFileSync('/etc/ocserv/ocpasswd', 'utf8').split("\n")
        return res.status(200).json({code: 0, users,usersFile:usersFile2});


    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})

router.post("/delete/user", auth, async (req, res) => {
    try {

        const {username} = req.body

        const filePath = '/etc/ocserv/ocpasswd';

        const usersFile = fs.readFileSync(filePath, 'utf8').split("\n")

        let newUsersFile = []

        for(const usr of usersFile){
            if(usr !== ""){
                const oldUserData = usr.split(":")

                if(oldUserData[0] !== username){
                    newUsersFile.push(usr)
                }
            }
        }

        fs.writeFileSync(filePath,newUsersFile.join("\n")+"\n")

        const users = await occtlExec.users()
        const usersFile2 = fs.readFileSync('/etc/ocserv/ocpasswd', 'utf8').split("\n")
        return res.status(200).json({code: 0, users,usersFile:usersFile2});


    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }

})


module.exports = router
