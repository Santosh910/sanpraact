import express from 'express'
import router from './Routes/index.js';
import  mongoose  from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.get('/',function(req,res){
    res.send("hello awdiz")
})

app.use("/api/v2",router)

mongoose.connect(process.env.MONGOURL ).then(()=>console.log("database connected"))

// mongoose.connect('mongodb+srv://survesantosh09:sRwT8vBLC99LO0lz@cluster0.volnun4.mongodb.net/practice').then(()=>console.log("Database connected"))
app.listen(8000,()=>console.log("app is running on port 8000..."))