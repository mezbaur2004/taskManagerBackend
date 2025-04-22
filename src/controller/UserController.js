const UserModel=require("../model/UserModel");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
    try {
        req.body.email = req.body.email.toLowerCase();
        let newUser = await UserModel.create(req.body);
        res.status(200).json({ status: "success", data: newUser });
    } catch (err) {
        if (err.code === 11000) {  // 11000 = MongoDB duplicate key error
            return res.status(409).json({ status: "fail", message: "Email Already Exists" });
        }
        res.status(500).json({ status: "fail", message: err.toString() });
    }
};



exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Find user by email
        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: "fail", data: "User not found" });
        }

        // Check if password matches
        if (user.password !== password) {
            return res.status(400).json({ status: "fail", data: "Incorrect password" });
        }

        // Generate JWT token
        let Payload = {
            exp: Math.floor(Date.now() / 1000) + 10 * 24 * 60 * 60, // Token expiry
            data: user.email
        };

        const jwtKey = process.env.JWT_KEY || "SecretKey12345";
        let token = jwt.sign(Payload, jwtKey);

        // Respond with success
        res.status(200).json({ status: "success", token: token, data: user });

    } catch (err) {
        res.status(400).json({ status: "fail", data: err.toString() });
    }
};


exports.updateProfile=async(req,res)=>{
    try{
        let email=req.headers['email'];
        let reqBody = req.body;
        let data=await UserModel.updateOne({email:email},reqBody)
        res.status(200).json({status:"success",data:data});
    }catch (error) {
        res.status(400).json({ status: "fail", data: err.toString() });
    }

}
exports.profileDetails=async(req,res)=>{
    try{
        let email=req.headers['email'];
        let data=await UserModel.aggregate([
            {$match:{email:email}},
            {$project:{_id:1,email:1,firstName:1,lastName:1,mobile:1,photo:1,password:1}}
        ])
        res.status(200).json({status:"success",data:data});
    }catch (error) {
        res.status(400).json({status:"fail",data:error.toString()});
    }
}