const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || "SecretKey12345";
module.exports =async (req, res,next) => {
    let Token=req.headers['token'];
    jwt.verify(Token,jwtKey,function (err,decoded){
        if(err){

            // console.log("JWT Verification Error:", err);
            // console.log("Error Message:", err.message);
            // console.log("Token:", Token);
            // console.log("JWT Key in Middleware:", jwtKey);

            res.status(401).json({status: "unauthorized", message: err.message});
        }else{
            let email=decoded['data'];
            req.headers.email=email;
            next();
        }
    })
}
