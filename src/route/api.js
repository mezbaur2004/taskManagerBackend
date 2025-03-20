const express=require('express');
const UserController=require('../controller/UserController');
const TaskController=require('../controller/TaskController');
const AuthMiddleware=require('../middleware/AuthMiddleware');

const router=express.Router();

//User
router.post("/registration",UserController.registration);
router.post("/login",UserController.login);
router.post("/updateProfile",AuthMiddleware,UserController.updateProfile);
router.get("/profileDetails",AuthMiddleware,UserController.profileDetails)

//Task
router.post("/createTask",AuthMiddleware,TaskController.createTask);
router.get("/updateTaskStatus/:id/:status",AuthMiddleware,TaskController.updateTaskStatus);
router.get("/deleteTask/:id",AuthMiddleware,TaskController.deleteTask);
router.get("/listTaskByStatus/:status",AuthMiddleware,TaskController.listTaskByStatus)
router.get("/taskStatusCount",AuthMiddleware,TaskController.taskStatusCount)


module.exports=router;