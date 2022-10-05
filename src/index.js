const redis = require("ioredis");

const redisExport = redis.createClient({
    host: "hostname/url/ipadress from your redis server",
    port: "port from your redis server",
    password: "password from your redis server",
    username: "username from your redis server"
});

const redisImport = redis.createClient({
    host: "hostname/url/ipadress from your redis server",
    port: "port from your redis server",
    password: "password from your redis server",
    username: "username from your redis server"
});

async function transferKeys() {
    const keys = await redisExport.keys("*");
    for (const key of keys) {
        await redisImport.set(key, await redisExport.get(key));
    }
}

console.log("Starting transfer. This may take a while...");
transferKeys().then(() => console.log("All Keys from Export DB are now on Import DB!"));

