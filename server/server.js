
const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const morgan=require('morgan');
const cors=require('cors');
require('dotenv').config();

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

//methods
app.get('/api',(req,res)=>{
    res.json({
        data:'Hello World'
    })
})

//port

const port=process.env.PORT || 8000;

app.listen(port,()=>console.log('SERVER IS RUNNING ON PORT 8000'))

