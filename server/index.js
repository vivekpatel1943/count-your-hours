import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
// import cookieParser from 'cookie-parser';

// Model
import Task from './Model/Tasks.js';
import User from './Model/User.js'

// authRoutes
import authRoutes from './routes/authRoutes.js';

// authentication middlewares, authorization with the help of jsonwebtokens
import authMiddleware from './Middlewares/authMiddleware.js';

// configuring my environment variables
dotenv.config();

// initialising the express app
const app = express();

// setting up the middlewares
app.use(express.json()) //makes json request available as javascript object
// app.use(cookieParser())

// cors help you to share resource with servers running on different ports,
// Allows frontend requests and enable credentials
/* app.use(cors({
    origin: "http://localhost:5173/", //Adjust to your frontend url
    credentials : true //allows frontend to send cookies to the backend
}))  */
app.use(cors());

// connecting to mongodb database;
mongoose.connect(process.env.mongo_uri)
    .then(() => console.log("connected to the database"))
    .catch((err) => console.error("error connecting to the database..",err,"."))

// Authentication routes
app.use('/api/auth',authRoutes);

// protected routes
app.get('/api/profile',authMiddleware, async (req,res) => {
    try{
        // in our authRoutes while generating our jwt token we have used jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'}) so to access the user-id from the token sent , we will have to use req.user.UserId,
        const user = await User.findById(req.user.userId).select('-password');

        if(!user){
            return res.status(404).json({msg:"user not found.."})
        }

        res.status(200).send(user)
        
    }catch(err){
        console.error(err)
        res.status(500).json({msg:"internal server error..",err})
    }
})


app.post('/api/add-task',authMiddleware, async (req,res) => {
   
    try{
        console.log("hello")
        console.log("request body",req.body)
        const {taskText,timeSpent} = req.body;
        
        const time = parseFloat(timeSpent);
        const userId = req.user.userId; //get user id from token
        console.log(userId)

        // looking for the particular task in the account of the user with requested user-id 
        const task = await Task.findOne({task:taskText,userId});

        console.log(task)
        
        if(task){
            // if task exists , add the time and update
            console.log(task)
            console.log(task.totalTime);
            task.totalTime += time;
            task.timeLogs.push({timeSpent:time,date:new Date()})
            console.log(task.totalTime)
            await task.save();
            return res.status(200).json({msg:"Task-updated,time added to existing task..", task});
        }else{
            // if the task doesn't exist , create a new one
            const newTask = new Task({userId:userId,task:taskText,totalTime:time,timeLogs:[{timeSpent:time,date:new Date()}]});
            console.log(newTask)
            await newTask.save();
            return res.status(200).json({msg:"New task has been saved in the database..",task:newTask});
        }

    }catch(err){
        console.log("error")
        return res.status(500).json({msg:"internal server error..",err})
    }
})

app.get('/api/tasks',authMiddleware, async (req,res) => {
    try{
        const tasks = await Task.find({userId:req.user.userId});
        // console.log(JSON.stringify(tasks));

        console.log(tasks)

        // send the tasks back to the client
        res.json(tasks);
    }catch(err){
        res.status(500).json({msg:"internal server error.."});
    }
})

// get individual tasks
app.get('/api/tasks/:id',authMiddleware,async (req,res) => {
    try{
        const task = await Task.findOne({_id:req.params.id,userId:req.user.userId});

        if(!task){
            return res.status(404).json({msg:"task not found"})
        }

        res.json({"requested task":task});
    }catch(err){
        res.status(500).json("error fetching requested task..")
    }
})

// update individual tasks
app.patch('/api/tasks/:id',authMiddleware,async (req,res) => {
    try{
        const data = await Task.findOne({_id:req.params.id,userId:req.user.userId});
        console.log(data);
        let {taskText,addTime} = req.body;
        addTime =  parseFloat(addTime);
        
        if(!data){
            return res.status(404).json({msg:"task not found"})
        }    
    
        if(!taskText && !addTime){
            return res.status(400).json({msg:"invalid request"})
        }

       if(!taskText){
            data.task = data.task;
       }

       if(!addTime){
        data.totalTime = data.totalTime;
       }

        data.task = taskText;
        data.totalTime += addTime;
        data.timeLogs.push({timeSpent:addTime,date:new Date()})
        data.save();
      
        /* data.task = taskText;
        data.save(); */
        res.status(200).json({msg:"updated task",data})

    }catch(err){
        res.status(500).json({msg:"internal server error..",err})
    }
  
})

app.delete('/api/tasks/:id',authMiddleware,async(req,res) => {
    try{
        const task = await Task.findOne({_id:req.params.id,userId:req.user.userId});
        const taskId = req.params.id;

        if(!task){
            return res.status(404).json({msg:"task not found in the database..."});
        }

        await Task.findByIdAndDelete(taskId);

        res.status(200).json({msg:"task deleted successfully..",task})
    }catch(err){
        res.status(500).json({msg:"internal server error.."})
    }
})

app.post('/api/logout',authMiddleware,async(req,res) => {
    res.status(200).json({message:"logged out.."})
})

const port = process.env.port || 3000;

app.listen(port,() => {
    console.log(`your server is running on port ${port}.`)
})
