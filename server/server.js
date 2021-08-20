
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors=require('cors');
require('dotenv').config();
const fs=require('fs');

const authRoute=require('./routes/auth')
//app
const app=express();


//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB CONNECTED :smile:');
}).catch(error=>console.log('DB CONNECTION ERR:',error))

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'2mb'}));
app.use(cors());

//routes middleware
// app.use('/api',authRoute);
fs.readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)));

//port

const port=process.env.PORT || 8000;

app.listen(port,()=>console.log('SERVER IS RUNNING ON PORT 8000'))

