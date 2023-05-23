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
            modifiedData.push(await modifyData(data))
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
                console.log(stdout)
                const data = await parseData(JSON.parse(stdout));
                console.log(data)
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

    // try {
    //     const command = spawn('occtl', ['show', 'users']);
    //     command.stdout.on('data', (data) => {
    //         const tmpDataArray = data.toString().replace("\t", "").split("\n");
    //
    //         const usersArr = []
    //
    //         const headers = tmpDataArray[0].split(/\s+/);
    //
    //
    //         for(const usrLine of tmpDataArray.slice(1)){
    //             const values = usrLine.split(/\s+/);
    //             const user = {};
    //             headers.forEach((header, index) => {
    //                 if(header.trim() !== "") {
    //                     user[header.trim().replace("-","_")] = values[index].trim();
    //                 }
    //             });
    //
    //             usersArr.push(user)
    //         }
    //
    //         res.status(200).json({code: 0, users: usersArr})
    //     });
    //
    //     // Обработка ошибок
    //     command.on('error', (error) => {
    //         console.error(`Ошибка выполнения команды: ${error.message}`);
    //         res.status(500).json({code: -1, error: error.toString()})
    //     });
    //
    //     command.stderr.on('data', (data) => {
    //         console.error(`Ошибка вывода команды: ${data}`);
    //         res.status(500).json({code: -1, data: data.toString()})
    //     });
    //
    //     // Завершение команды
    //     command.on('close', (code) => {
    //         console.log(`Команда завершена с кодом ${code}`);
    //         //res.status(500).json({code:code.toString()})
    //     });
    // } catch (error) {
    //     res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    // }
})

router.get("/show/sessions/all", async (req, res) => {
    try {
        exec('occtl --json show sessions all', (error, stdout, stderr) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = JSON.parse(jsonString);
                res.status(200).json({code: 0, sessions: data});
            }catch (e) {
                res.status(500).json({code: -1, message: "Something went wrong, please try again"})
            }
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/valid", async (req, res) => {
    try {
        exec('occtl --json show sessions valid', (error, stdout, stderr) => {
            try{
                const lastIndex = stdout.lastIndexOf(',');
                let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                const data = JSON.parse(jsonString);
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
