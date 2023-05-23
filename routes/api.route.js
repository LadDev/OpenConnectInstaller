const {Router} = require("express")
const router = Router()
const {spawn} = require('child_process');

router.get("/show/status", async (req, res) => {
    try {
        const command = spawn('occtl', ['show', 'status']);
        command.stdout.on('data', (data) => {
            const tmpDataArray = data.toString().replace("\t", "").split("\n");
            let dataObj = {
                general_info: {
                    status: "offline",
                    server_pid: null,
                    sec_mod_pid: null,
                    up_since: null,
                    active_sessions: 0,
                    total_sessions: 0,
                    total_authentication_failures: 0,
                    ips_in_ban_list: 0
                },
                current_stats_info: {
                    last_stats_reset: null,
                    sessions_handled: 0,
                    timed_out_sessions: 0,
                    timed_out_idle_sessions: 0,
                    closed_due_to_error_sessions: 0,
                    authentication_failures: 0,
                    average_auth_time: "",
                    max_auth_time: "",
                    average_session_time: "",
                    max_session_time: "",
                    min_mtu: 0,
                    max_mtu: 0,
                    rx: "",
                    tx: ""
                }
            }

            for (const d of tmpDataArray) {
                const arrD = d.split(":")
                if (arrD.length >= 2) {
                    const title = arrD[0].replace("\t", "").trim()
                    let value = arrD[1].replace("\t", "").trim()

                    if(arrD.length>2){
                        const newArr = arrD.slice(1);
                        value=newArr.join(":")
                    }

                    switch (title.trim()) {
                        case "Status":
                            dataObj.general_info.status = value
                            break;
                        case "Server PID":
                            dataObj.general_info.server_pid = Number(value)
                            break;
                        case "Sec-mod PID":
                            dataObj.general_info.sec_mod_pid = Number(value)
                            break;
                        case "Up since":
                            dataObj.general_info.up_since = Number(value)
                            break;
                        case "Active sessions":
                            dataObj.general_info.active_sessions = Number(value)
                            break;
                        case "Total sessions":
                            dataObj.general_info.total_sessions = Number(value)
                            break;
                        case "Total authentication failures":
                            dataObj.general_info.total_authentication_failures = Number(value)
                            break;
                        case "IPs in ban list":
                            dataObj.general_info.ips_in_ban_list = Number(value)
                            break;

                        case "Last stats reset":
                            dataObj.current_stats_info.last_stats_reset = value
                            break;
                        case "Sessions handled":
                            dataObj.current_stats_info.sessions_handled = value
                            break;
                        case "Timed out sessions":
                            dataObj.current_stats_info.timed_out_sessions = value
                            break;
                        case "Timed out (idle) sessions":
                            dataObj.current_stats_info.timed_out_idle_sessions = value
                            break;
                        case "Closed due to error sessions":
                            dataObj.current_stats_info.closed_due_to_error_sessions = value
                            break;
                        case "Authentication failures":
                            dataObj.current_stats_info.authentication_failures = value
                            break;
                        case "Average auth time":
                            dataObj.current_stats_info.average_auth_time = value
                            break;
                        case "Max auth time":
                            dataObj.current_stats_info.max_auth_time = value
                            break;
                        case "Average session time":
                            dataObj.current_stats_info.average_session_time = value
                            break;
                        case "Max session time":
                            dataObj.current_stats_info.max_session_time = value
                            break;
                        case "Min MTU":
                            dataObj.current_stats_info.min_mtu = value
                            break;
                        case "Max MTU":
                            dataObj.current_stats_info.max_mtu = value
                            break;
                        case "RX":
                            dataObj.current_stats_info.rx = value
                            break;
                        case "TX":
                            dataObj.current_stats_info.tx = value
                            break;
                        default:
                            break;
                    }

                }
            }

            res.status(200).json({code: 0, data: dataObj})
        });

        // Обработка ошибок
        command.on('error', (error) => {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            res.status(500).json({code: -1, error: error.toString()})
        });

        command.stderr.on('data', (data) => {
            console.error(`Ошибка вывода команды: ${data}`);
            res.status(500).json({code: -1, data: data.toString()})
        });

        // Завершение команды
        command.on('close', (code) => {
            console.log(`Команда завершена с кодом ${code}`);
            //res.status(500).json({code:code.toString()})
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/users", async (req, res) => {
    try {
        const command = spawn('occtl', ['show', 'users']);
        command.stdout.on('data', (data) => {
            const tmpDataArray = data.toString().replace("\t", "").split("\n");

            const usersArr = []

            const headers = tmpDataArray[0].split(/\s+/);


            for(const usrLine of tmpDataArray.slice(1)){
                const values = usrLine.split(/\s+/);
                const user = {};
                headers.forEach((header, index) => {
                    if(header.trim() !== "") {
                        user[header.trim().replace("-","_")] = values[index].trim();
                    }
                });

                usersArr.push(user)
            }

            res.status(200).json({code: 0, users: usersArr})
        });

        // Обработка ошибок
        command.on('error', (error) => {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            res.status(500).json({code: -1, error: error.toString()})
        });

        command.stderr.on('data', (data) => {
            console.error(`Ошибка вывода команды: ${data}`);
            res.status(500).json({code: -1, data: data.toString()})
        });

        // Завершение команды
        command.on('close', (code) => {
            console.log(`Команда завершена с кодом ${code}`);
            //res.status(500).json({code:code.toString()})
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})

router.get("/show/sessions/all", async (req, res) => {
    try {
        const command = spawn('occtl', ['show', 'sessions', 'all']);
        command.stdout.on('data', (data) => {
            const tmpDataArray = data.toString().replace("\t", "").split("\n");

            const usersArr = []

            const headers = tmpDataArray[0].split(/\s+/);


            for(const usrLine of tmpDataArray.slice(1)){
                const values = usrLine.match(/\s+/g);
                console.log(values)
                const user = {};
                headers.forEach((header, index) => {
                    if(header.trim() !== "") {
                        user[header.trim().replace("-","_")] = values[index].trim();
                    }
                });

                usersArr.push(user)
            }

            res.status(200).json({code: 0, users: usersArr})
        });

        // Обработка ошибок
        command.on('error', (error) => {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            res.status(500).json({code: -1, error: error.toString()})
        });

        command.stderr.on('data', (data) => {
            console.error(`Ошибка вывода команды: ${data}`);
            res.status(500).json({code: -1, data: data.toString()})
        });

        // Завершение команды
        command.on('close', (code) => {
            console.log(`Команда завершена с кодом ${code}`);
            //res.status(500).json({code:code.toString()})
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})


module.exports = router
