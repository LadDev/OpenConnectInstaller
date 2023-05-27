const {exec} = require("child_process");

class OcctlExec {
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
            modifiedData =  await modifyData(data)
        }

        return modifiedData
    }
}

module.exports = OcctlExec
