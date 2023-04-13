const redis = require("ioredis");
const readline = require('readline');
let username1 = "";
let password1 = "";
let username2 = "";
let password2 = "";
let url1 = "";
let url2 = "";
let port1 = "";
let port2 = "";



console.log("Welcome to TransferRedisKeys.");
console.log("Please enter the following information to continue.");





const rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('ExportDB Username: ');
rl.prompt();
rl.on('line', function (line) {
    if (line === "") {
        console.warn("The line must not be empty!")
        return;
    }
    switch (rl.getPrompt()) {
        case "ExportDB Username: ": {
            username1 = line;
            rl.setPrompt("ExportDB Password: ");
            rl.prompt();
            break;
        }
        case "ExportDB Password: ": {
            password1 = line;
            rl.setPrompt("ExportDB URL: ");
            rl.prompt();
            break;
        }
        case "ExportDB URL: ": {
            url1 = line;
            rl.setPrompt("ExportDB Port: ");
            rl.prompt();
            break;
        }
        case "ExportDB Port: ": {
            port1 = line;
            rl.setPrompt("ImportDB Username: ");
            rl.prompt();
            break;
        }
        case "ImportDB Username: ": {
            username2 = line;
            rl.setPrompt("ImportDB Password: ");
            rl.prompt();
            break;
        }
        case "ImportDB Password: ": {
            password2 = line;
            rl.setPrompt("ImportDB URL: ");
            rl.prompt();
            break;
        }
        case "ImportDB URL: ": {
            url2 = line;
            rl.setPrompt("ImportDB Port: ");
            rl.prompt();
            break;
        }
        case "ImportDB Port: ": {
            port2 = line;
            rl.setPrompt("Progressing: ");
            rl.close();
            break;
        }
    }
}).on('close', function () {
    const redisExport = redis.createClient({
    
        // Edit these information below
        host: url1,
        port: port1,
        password: password1,
        username: username1
        // Edit finish
    });
    
    const redisImport = redis.createClient({
        
        // Edit these information below
        host: url2,
        port: port2,
        password: password2,
        username: username2
        // Edit finish
    });
    async function transferKeys() {
        const keys = await redisExport.keys("*");
        for (const key of keys) {
            await redisImport.set(key, await redisExport.get(key));
        }
    }
    console.log("Starting transfer. This may take a while...");
    try {
        transferKeys().then(() => {
            console.log("All Keys from Export DB are now on Import DB!");
            process.exit(0);
        });
    } catch (err) {
        console.error("An error occurred!");
        process.exit(1);
    }
    
    
});