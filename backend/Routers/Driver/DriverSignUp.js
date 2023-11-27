const express = require('express');
const router = express.Router();
const fs = require('fs');
const { queryRunner ,queryExecute,generateString} = require('../DataBase/QueryRun')

router.post('/driver/initialize', async (req, resp) => {
    const filePath = __dirname + "\\Initialize.sql"; // Replace with the actual path to your Initialize.sql file
    const DriverData=req.body.DriverData;
    let DriverId=generateString("DV",10)
    try {
        const sql = `CALL InsertDriver('${DriverId}', '${DriverData.Name}', '${DriverData.AdharNumber}', '${DriverData.Vehicle}', '${DriverData.VehicleNumber}', '${DriverData.MobileNumber},"Pending"')`;

        const response = await queryRunner(sql);
        resp.send({
            ok:true,
            response:response,
            DriverId:DriverId
        });
    } catch (error) {
        console.error('Error:', error);
        resp.send(
            {
                ok:false,
                error:error
            }
        )
    }
});


router.post('/driver/signup',async (req,resp)=>
{
    const DriverData=req.body;
    // console.log(DriverData)
    let DriverId=generateString("DV",10)
    try {
        const sql = `CALL InsertDriver('${DriverId}', '${DriverData.Name}', '${DriverData.AdharNumber}', '${DriverData.Vehicle}', '${DriverData.VehicleNumber}', '${DriverData.MobileNumber}', 'Pending')`;

        const response = await queryRunner(sql);
        resp.send({
            ok:true,
            response:response,
            DriverId:DriverId
        });
    } catch (error) {
        console.error('Error:', error);
        resp.send(
            {
                ok:false,
                error:error
            }
        )
    }
})
module.exports = router