const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const bp = require('body-parser');


const chenlong =require('./chenlong');
const MJ=require('./Mj.js')
const Mrli=require('./Mrli.js')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next(); 
    }
});

app.use(bp.urlencoded({extended: false}));
app.use(express.static(path.join(path.resolve(__dirname,'../'),'/')));
io.on('connection', (client) => {
    console.log('io connection');
    client.on('getClientMsg', (msg) => {
        console.log(msg)
        io.emit('print', msg);
    })
    // client.on('');
    // io.emit('')
})

module.exports = {
    start(_port){
        chenlong.register(app);
        MJ.productget(app);
        Mrli.register(app);
        http.listen(_port || 8080);
    }
}