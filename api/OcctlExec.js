const {exec} = require("child_process");

class OcctlExec {
    async start(){
        return new Promise((resolve) => {
            exec('sudo systemctl restart ocserv', async () => {
                try{
                    resolve(0)
                }catch (e) {
                    resolve(-1)
                }
            });
        });
    }

    async reload(){
        return new Promise((resolve) => {
            exec('occtl reload', async () => {
                try{
                    resolve(0)
                }catch (e) {
                    resolve(-1)
                }
            });
        });
    }

    async reset(){
        return new Promise((resolve) => {
            exec('occtl reset', async () => {
                try{
                    resolve(0)
                }catch (e) {
                    resolve(-1)
                }
            });
        });
    }

    async stop(){
        return new Promise((resolve) => {
            exec('occtl stop now', async () => {
                try{
                    resolve(0)
                }catch (e) {
                    resolve(-1)
                }
            });
        });
    }

    async status(){
        return new Promise((resolve, reject) => {
            exec('occtl --json show status', async (error, stdout) => {
                try{
                    const data = await this.parseData(JSON.parse(stdout));
                    resolve(data)
                }catch (e) {
                    console.error(e)
                    reject("Something went wrong, please try again")
                }
            });
        });
    }

    async users(){
        return new Promise((resolve, reject) => {
            exec('occtl --json show users', async (error, stdout) => {
                try{
                    const data = await this.parseData(JSON.parse(stdout));
                    resolve(data)
                }catch (e) {
                    console.error(e)
                    reject("Something went wrong, please try again")
                }
            });
        });
    }

    async user(id){
        return new Promise((resolve) => {
            exec('occtl --json show id '+id, async (error, stdout) => {
                try{
                    const data = await this.parseData(JSON.parse(stdout)) || [];
                    resolve(data.length > 0?data[0]:{})
                }catch (e) {
                    resolve({})
                }
            });
        });
    }

    async disconnectUser(id){
        return new Promise((resolve) => {
            exec('occtl --json disconnect id '+id, async () => {
                resolve({})
            });
        });
    }

    async sessions(type = "all"){
        return new Promise((resolve) => {
            exec('occtl --json show sessions '+type, async (error, stdout) => {
                try{
                    const lastIndex = stdout.lastIndexOf(',');
                    let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                    const data = await this.parseData(JSON.parse(jsonString));
                    resolve(data)
                }catch (e) {
                    resolve([])
                }
            });
        });
    }

    async session(id = null){
        return new Promise((resolve) => {
            exec('occtl --json show session '+id, async (error, stdout) => {
                try{
                    // const lastIndex = stdout.lastIndexOf(',');
                    // let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);
                    //
                    // const lastIndex2 = jsonString.lastIndexOf(',');
                    // let jsonString2 = jsonString.slice(0, lastIndex2) + jsonString.slice(lastIndex2 + 1);

                    console.info(stdout)

                    const lastIndex = stdout.lastIndexOf(',');
                    const secondLastIndex = stdout.lastIndexOf(',', lastIndex - 1);
                    const formattedJson = stdout.substring(0, secondLastIndex) + stdout.substring(secondLastIndex + 1);


                    const data = await this.parseData(JSON.parse(formattedJson)) || [];
                    resolve(data.length>0?data[0]:{})
                }catch (e) {
                    console.info(stdout)
                    console.error(e)
                    resolve({})
                }
            });
        });
    }

    async ipBans(tipe = ""){
        return new Promise((resolve) => {
            exec('occtl --json show ip bans'+tipe, async (error, stdout) => {
                try{
                    const lastIndex = stdout.lastIndexOf(',');
                    let jsonString = stdout.slice(0, lastIndex) + stdout.slice(lastIndex + 1);

                    const data = await this.parseData(JSON.parse(jsonString));
                    resolve(data)
                }catch (e) {
                    resolve([])
                }
            });
        });
    }

    async iroutes(){
        return new Promise((resolve) => {
            exec('occtl --json show iroutes', async (error, stdout) => {
                try{

                    const data = await this.parseData(JSON.parse(stdout));
                    resolve(data)
                }catch (e) {
                    resolve([])
                }
            });
        });
    }

    modifyData = async (data) => {
        let obj = {...data};

        let modifiedObj = {};

        for (let prop in obj) {
            let newProp = prop.replace(/[^\w]/g, '').toLowerCase();
            modifiedObj[newProp] = obj[prop];
        }

        return modifiedObj
    }
    parseData = async (data) => {
        let modifiedData = null
        if(data instanceof Array){
            modifiedData = []
            for(const obj of data){
                modifiedData.push(await this.modifyData(obj))
            }
        }else if(data instanceof Object){
            modifiedData =  await this.modifyData(data)
        }

        return modifiedData
    }
}

module.exports = OcctlExec
