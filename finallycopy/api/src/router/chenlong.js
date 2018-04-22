var apiResult =require('../utils/apiResult.js')
var filter =require('../utils/filter.js')
var  db =require ('../db/index.js')

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

var express=require('express');
var multer=require('multer');
var path=require('path');
var fs=require('fs');
// 设置上传目录
var uploadpath=path.join(path.resolve(__dirname,'../'),'temp');
var upload=multer({ dest: uploadpath});




module.exports={
    register(app){
        app.post('/login',(req,res)=>{
            let username=req.body.username;
            let password=req.body.password;
            let sql = `select * from person where username='${username}' and password='${password}'`
            db.mysql.select(sql,(result)=>{
                    res.send(result);
            })
        })
        app.get('/test',(req,res)=>{
             let username=req.query.$username;
             console.log(username)
             let sql = `select * from person where username='${username}'`
            db.mysql.select(sql,(result)=>{
                    res.send(result);
            })
        })

         app.post('/reg',(req,res)=>{
            let username=req.body.$username;
            let password=req.body.$password;
            console.log(req.body)
           var sql = `insert into person (id,username,password) values (null,'${username}','${password}')`;
            db.mysql.select(sql,(result)=>{
                    res.send(result);
            })
        })

         app.get('/getaddress',(req,res)=>{
             let username=req.query.username;
             let sql = `select * from address where username='${username}'`
              db.mysql.select(sql,(result)=>{
                    res.send(result);
            })
         })

         app.post('/updateaddress',(req,res)=>{
             let id=req.body.id;
             let nickname=req.body.nickname;
             let address=req.body.address;
             let phone=req.body.phone;
             let sql =  `update address set nickname='${nickname}',phone='${phone}',address='${address}' where id='${id}'`;
              db.mysql.select(sql,(result)=>{
                    res.send(result);
            })
         })

          app.post('/addaddress',(req,res)=>{
             let username=req.body.username;
             let nickname=req.body.nickname;
             let address=req.body.address;
             let phone=req.body.phone;

             let sql = `insert into address (id,address,username,phone,nickname) values (null,'${address}','${username}','${phone}','${nickname}')`
              db.mysql.select(sql,(result)=>{
                    res.send(result);
            })
         })

           app.post('/deladdress',(req,res)=>{
              let id=req.body.id;
              let sql = `DELETE FROM address where id='${id}'`
               db.mysql.select(sql,(result)=>{
                     res.send(result);
             })
          })

            app.post('/upseladdress',(req,res)=>{
              let id=req.body.id;
              let username=req.body.username;
              let sqla = `update address set status=0 where username='${username}'`
              let sqlb = `update address set status=1 where id='${id}' and username='${username}'`
             
               db.mysql.select(sqla,(result)=>{
                     if(result.status){
                          db.mysql.select(sqlb,(result)=>{
                                res.send(result);
                        })
                     }
             })
          })
    }
}
