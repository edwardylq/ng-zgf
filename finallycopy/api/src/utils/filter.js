const jwt = require('jsonwebtoken');
const apiResult = require('./apiResult');

module.exports = function(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        jwt.verify(token,'secret',(err,decode)=>{
            if(err){
                res.send(apiResult(false, null, null, 'unauthorized'))
            }else{
                next();
            }
        })
    }else{
        res.send(apiResult(false, null, null, 'unauthorized'));
    }
}