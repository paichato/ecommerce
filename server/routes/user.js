const express=require('express');

const router=express.Router();

router.get('/user',(req,res)=>{
    res.json({
        data:'Hello World user api endpoint'
    })
})

module.exports=router;