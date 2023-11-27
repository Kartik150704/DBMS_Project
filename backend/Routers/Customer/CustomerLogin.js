const express = require('express');
const router = express.Router();

const {queryRunner}=require('../DataBase/QueryRun')
router.post('/customer/login',async (req,resp)=>
{
    let MobileNumber=req.body.MobileNumber;
    let password=req.body.password;
    console.log(req.body)
    let query =`select * from Customer where MobileNumber='${MobileNumber}' and Password='${password}'`
    try{
        let response=await queryRunner(query)
        let data=response.rows
        if(data.length==0)
        {
            resp.send({
                ok:true,
                presence:false
            })
        }
        else
        {
            resp.send({
                ok:true,
                presence:true
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


router.post('/customer/showrides',async (req,resp)=>
{
    let RideFrom=req.body.RideFrom
    let RideTo=req.body.RideTo
    console.log(req.body)
    let query=`select * from Rides where RideFrom ='${RideFrom}' and RideTo ='${RideTo}' and Status='initialized'`
    try
    {
        let response=await queryRunner(query)
        let dataToSend=[]
        response=response.rows;
        for(let i=0;i<response.length;i++)
        {
            let data={
                SNo:i+1,
                DriverId:response[i].DriverId,
                DriverName:response[i].DriverName,
                VehicleName:response[i].VehicleName,
                VehicleNumber:response[i].VehicleNumber,
                Amount:response[i].Amount
            }
            dataToSend.push(data)
        }
        resp.send({
            ok:true,
            data:dataToSend
        })
    }
    catch(err)
    {
        console.log(err)
        resp.send({
            ok:false
        })
    }
})

router.post('/customer/bookride',async (req,resp)=>
{
    let DriverId=req.body.DriverId;
    let CustomerMobileNumber=req.body.CustomerMobileNumber
    
    let query=`CALL book_ride('${DriverId}','${CustomerMobileNumber}')`;
    try
    {
        let response=await queryRunner(query)
        console.log(response)
        resp.send({
            ok:true
        })
    }
    catch(err)
    {
        console.log(err)
        resp.send({
            ok:false
        })
    }
})

router.post('/customer/showhistory',async (req,resp)=>
{
    let MobileNumber=req.body.MobileNumber;
    let query=`select * from RideHistory where customerMobileNumber='${MobileNumber}'`
    try
    {
        let response=await queryRunner(query)
        response=response.rows;
        resp.send(
            {
                ok:true,
                data:response
            }
        )
        
    }
    catch(err)
    {
        response.send({
            ok:false
        })
    }
})
module.exports=router