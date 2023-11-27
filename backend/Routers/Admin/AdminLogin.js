const express = require('express');
const { queryRunner } = require('../DataBase/QueryRun');
const router = express.Router();
const fs=require('fs')

router.post('/admin/login',async (req,resp)=>
{
    

})

router.get('/admin/getdriverdata',async (req,resp)=>
{
    
    let query=`select * from Driver where Status='Pending'`
    try
    {
        let response=await queryRunner(query)
        response=response.rows
        console.log(response)
        resp.send({
            ok:true,
            data:response
        })
    }
    catch(err)
    {
        console.log(err);
        resp.send({
            ok:false
        })
    }

})

router.get('/admin/initialize/database',async (req,resp)=>
{
    let filePath=__dirname+'/CreateDataBase.sql'
    let query=await fs.readFileSync(filePath).toString()
    let response=await queryRunner(query);
    console.log(response);
})
module.exports=router