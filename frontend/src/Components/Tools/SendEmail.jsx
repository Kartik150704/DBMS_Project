import {FetchAPI} from "./FetchAPI"
const sendEmail=async (emailId,subject,emailBody)=>
{
    let data={
        emailId:emailId,
        subject:subject,
        emailBody:emailBody
    }
    
    let response=await FetchAPI("http://localhost:8000/sendEmail","POST",data);
    
    return response;
}

export {sendEmail}