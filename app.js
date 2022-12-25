const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('client'));

const publicVapidKey = 'BN317yojyhfvXYsl7ls1Z5b_aNa4koxxOAXb8usdUSUTSjnmLjJSkHXiZUix4HuZoZGn7xgCYii4SBu5Jw-gQ2c';
const privateVapidKey = '4BJuJQMxTr2eMOGRPQrCntmoM4tix8DDH2mJITbIn_w';

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

//subscribe route
app.post('/subscribe', (req, res)=>{
    //get pushScription object
    const subscription = req.body;

    //send 201 - resource created

    res.status(201).json({});

    //create payload
    const payload = JSON.stringify({title: 'Push Test', body :'notified by danish',icon: "https://logos.textgiraffe.com/logos/logo-name/29160262-designstyle-soccer-l.png"});

    //pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
})



app.listen(3000, ()=>{
    console.log("server is running on port 3000");
})