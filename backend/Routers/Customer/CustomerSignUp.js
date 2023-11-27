const express = require('express');
const { queryRunner } = require('../DataBase/QueryRun');
const router = express.Router();


router.post('/customer/signup',async (req,resp)=>
{
    let CustomerName=req.body.CustomerName
    let MobileNumber=req.body.MobileNumber
    let password=req.body.password

    let query=`Insert into Customer (Name,MobileNumber,Password) 
    values ('${CustomerName}','${MobileNumber}','${password}')
    
    `

    try
    {
        let response=await queryRunner(query)
        if(response)
        {
            resp.send(
                {
                    ok:true
                }
            )

        }
        else
        {
            resp.send({
                ok:false
            })
        }
    }
    catch(err)
    {
        console.log(err)
        resp.send({
            ok:false
        })
    }
    


})


module.exports=router