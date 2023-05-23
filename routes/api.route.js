const {Router} = require("express")
const router = Router()
const {spawn, exec} = require('child_process');


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
        exec('occtl --json show status', async (error, stdout, stderr) => {
            try{
                const data = await parseData(JSON.parse(stdout));
                res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                console.error(e)
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/users", async (req, res) => {
    try {
        exec('occtl --json show users', async (error, stdout, stderr) => {
            try{
                const data = await parseData(JSON.parse(stdout));
                res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                console.error(e)
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/all", async (req, res) => {

    try {
        exec('occtl --json show sessions all', async (error, stdout, stderr) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = await parseData(JSON.parse(jsonString));
                res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                console.error(e)
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/valid", async (req, res) => {
    try {
        exec('occtl --json show sessions valid', async (error, stdout, stderr) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = await parseData(JSON.parse(jsonString));
                res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})


module.exports = router
