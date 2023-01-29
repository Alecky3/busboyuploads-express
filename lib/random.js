const {randomFillSync} = require("crypto");
exports.random = ()=>
{
    let buff = Buffer.alloc(20);
    return randomFillSync(buff).toString("hex");
}