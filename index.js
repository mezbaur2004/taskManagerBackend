// const app=require("./app")
// const PORT=3030;
// app.listen(PORT,function (){
//     console.log("Running at port",PORT)
// })

// ✅ For Vercel (Serverless Function)
const app = require('./app');
const serverless = require('serverless-http');

module.exports.handler = serverless(app);
