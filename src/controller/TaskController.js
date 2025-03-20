const TaskModel=require("../model/TaskModel");

exports.createTask=async (req,res)=>{
    try{
        let reqBody=req.body;
        reqBody.email = req.headers['email'];
        let data=await TaskModel.create(reqBody);
        res.status(200).json({message:"Task created successfully.",data:data});
    }catch (error){
        res.status(400).json({ status: "fail", data: error.toString() });
    }
}

exports.updateTaskStatus=async (req,res)=>{
    try{
        let id=req.params.id;
        let status=req.params.status;
        let Query={_id:id};
        let reqBody={status:status}
        let data=await TaskModel.updateOne(Query,reqBody)
        res.status(200).json({message:"Task updated successfully.",data:data});

    }catch(error){
        res.status(400).json({ status: "fail", data: error.toString() });
    }
}

exports.deleteTask=async (req,res)=>{
    try {
        let id=req.params.id;
        let data=await TaskModel.deleteOne({_id:id,email: req.headers.email});
        res.status(200).json({message:"Task deleted successfully.",data:data});
    }catch (error) {
        res.status(400).json({ status: "fail", data: error.toString() });
    }
}

exports.listTaskByStatus=async (req,res)=>{
    try{
        let status=req.params.status;
        let email=req.headers['email'];
        let data=await TaskModel.aggregate([
            {$match:{status:status,email:email}},
            {$project:{_id:1,title:1,description:1,status:1,createdDate:{
                $dateToString:{
                    date:"$createdDate",
                    format:"%d-%m-%Y"
                }
              }
            }}
        ])
        res.status(200).json({status:"success",data:data});
    }catch (error) {
        res.status(400).json({ status: "fail", data: error.toString() });
    }
}

exports.taskStatusCount=async (req,res)=>{
    try{
        let email=req.headers['email'];
        let data=await TaskModel.aggregate([
            {$match:{email:email}},
            {$group:{_id:"$status",sum:{$count:{}}}}
        ])
        res.status(200).json({status:"success",data:data});
    }catch(error){
        res.status(400).json({ status: "fail", data: error.toString() });
    }
}