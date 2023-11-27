const http = require('http');
const express = require('express');

const router = express.Router();


router.post('/bookRide', async (req, resp) => {

    console.log(req.body)
    resp.setHeader('Content-Type', 'text/event-stream');
    resp.setHeader('Cache-Control', 'no-cache');
    resp.flushHeaders();
    
    let count = 0;
    const interval = setInterval(() => {
        resp.write(`data: Event ${count}\n\n`);
        count++;

        if (count === 5) {
            clearInterval(interval);
            resp.end();
        }
    }, 1000);

    
});


module.exports = router