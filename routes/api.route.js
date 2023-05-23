const {Router} = require("express")
const router = Router()
const {spawn} = require('child_process');

router.get("/status", async (req, res) => {
    try {
        const command = spawn('occtl', ['show', 'status']);

        // Обработка вывода команды
        command.stdout.on('data', (data) => {
            console.log(`Результат команды: ${data}`);
            res.status(200).json({code: 0, data})
        });

        // Обработка ошибок
        command.on('error', (error) => {
            console.error(`Ошибка выполнения команды: ${error.message}`);
            res.status(500).json({code: -1, error})
        });

        command.stderr.on('data', (data) => {
            console.error(`Ошибка вывода команды: ${data}`);
            res.status(500).json({code: -1, data})
        });

        // Завершение команды
        command.on('close', (code) => {
            console.log(`Команда завершена с кодом ${code}`);
            res.status(500).json({code: code})
        });
    } catch (error) {
        res.status(500).json({code: -1, message: "Something went wrong, please try again"})
    }
})


module.exports = router
