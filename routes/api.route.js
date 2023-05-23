const {Router} = require("express")
const router = Router()
const {spawn} = require('child_process');

router.get("/status", async (req, res) => {
    try {
        const command = spawn('occtl', ['show', 'status']);

        // Обработка вывода команды
        command.stdout.on('data', (data) => {
            const tmpDataArray = data.toString().split("\n");

            for(const d of tmpDataArray){
                console.info(d)
            }

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
                    average_auth_time:"",
                    max_auth_time: "",
                    average_session_time: "",
                    max_session_time: "",
                    min_mtu: 0,
                    max_mtu: 0,
                    rx: "",
                    tx: ""
                }
            }
            res.status(200).json({code: 0,data: dataObj})
        });

        // Обработка ошибок
        command.on('error', (error) => {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            res.status(500).json({code: -1, error:error.toString()})
        });

        command.stderr.on('data', (data) => {
            console.error(`Ошибка вывода команды: ${data}`);
            res.status(500).json({code: -1, data:data.toString()})
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
