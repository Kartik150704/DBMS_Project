const express = require('express');
const router = express.Router();
const {queryRunner}=require('../DataBase/QueryRun')

router.post('/driver/login',async (req,resp)=>
{
    
    let DriverId=req.body.DriverId;
    let AdharNumber=req.body.AdharNumber;
    let query=`select checkDriver('${DriverId}','${AdharNumber}') as isPresent`;
    try{
        let response=await queryRunner(query)
        const presence=response.rows[0].isPresent
        if(presence)
        {
            resp.send(
                {
                    ok:true,
                    ispresent:true
                }
            )
        }
        else
        {
            resp.send(
                {
                    ok:true,
                    ispresent:false
                }
            )
        }

    }
    catch(err)
    {
        resp.send({
            ok:false
            
        })
    }
    



})


router.post('/driver/getdata',async (req,resp)=>
{
    let DriverId=req.body.DriverId
    let query=`select * from Driver where DriverId = '${DriverId}'`
    let response=await queryRunner(query)
    
    console.log(response.rows);
    resp.send(
        {
            ok:true,
            data:response.rows[0]
        }
    );


})

router.post('/driver/offerride',async (req,resp)=>
{
    let DriverId=req.body.DriverId
    let RideFrom=req.body.RideFrom
    let RideTo=req.body.RideTo
    let Amount=req.body.Amount

    let query=`select * from Driver where DriverId ='${DriverId}'`
    let response=await queryRunner(query)
    response=response.rows[0]
    query=`Insert into Rides (DriverId,DriverName,RideFrom,RideTo,VehicleName, VehicleNumber, MobileNumber, Amount, Status) 
    values ('${response.DriverId}','${response.Name}','${RideFrom}','${RideTo}','${response.Vehicle}','${response.VehicleNumber}','${response.MobileNumber}',
    
    '${Amount}','initialized')
    
    `
    response=await queryRunner(query)
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

    
})

router.post('/driver/showhistory',async (req,resp)=>
{
    let DriverId=req.body.DriverId
    let query=`select * from rideHistory where DriverId='${DriverId}'`
    try
    {
        let response=await queryRunner(query)
        response=response.rows
        resp.send({
            ok:true,
            data:response
        })
    }
    catch(err)
    {
        resp.send({
            ok:false
        })
    }
})


router.post('/driver/checkstatus',async (req,resp)=>
{
    
    let DriverId=req.body.DriverId
    
    let query1=`select * from Rides where DriverId='${DriverId}' and Status='initialized'`
    let query2=`select * from Driver where DriverId='${DriverId}' and Status='Verified'`
    try
    {
        let verified=false;
        let busy=false;
        let response1=await queryRunner(query1)
        let response2=await queryRunner(query2)
        response1=response1.rows;
        response2=response2.rows;
        if(response1.length!=0)
        {
            busy=true
        }
        if(response2.length!=0)
        {
            verified=true;
        }
        resp.send({
            ok:true,
            busy:busy,
            verified:verified
        })
    }
    catch(err)
    {
        resp.send({
            ok:false
            
        })
    }
})

router.post('/admin/verifydriver',async (req,resp)=>
{
    let DriverId=req.body.DriverId
    let VerificationKey=req.body.VerificationKey
    let query=`update Driver set Status='Verified' where DriverId='${DriverId}'`
    try
    {
        if(VerificationKey=="1507")
        {
            let response=await queryRunner(query)
            resp.send({
                ok:true
            })
        }
        else
        {
            resp.send({
                ok:false,
                key:false
            })

        }
    }
    catch(err)
    {
        resp.send({
            ok:false
        })
    }
})

router.post('/admin/login',async (req,resp)=>
{
    let Key=req.body.Key
    if(Key=="1507")
    {
        resp.send({
            ok:true
        })
    }
    else
    {
        resp.send({
            ok:false
        })
    }
})
module.exports=router