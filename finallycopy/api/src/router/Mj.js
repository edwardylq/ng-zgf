const db = require('../db/index.js');
const filter =require('../utils/filter');
const apiResult = require('../utils/apiResult.js')

module.exports = {
    productget(app){
        app.get('/products',(req,res)=>{
            var productGet ='SELECT * FROM goods';
            db.mysql.select(productGet,function(result){
                res.send(result);
            });
        })
        app.get('/carlist',(req,res)=>{
            let username= req.query.username;
            var carGet =`SELECT * FROM carlist where username='${username}'`;
            db.mysql.select(carGet,function(result){
                res.send(result);
            });
        })

        app.get('/inproduct',(req,res)=>{
            let product = req.query.product;
            let price = req.query.price;
            let img = req.query.img;
            let qty = req.query.qty1;
            let id = req.query.id;
            let userInSql = `INSERT into carlist(product,price,img,qty,id) VALUES ('${product}','${price}','${img}','${qty}','${id}')`;
            db.mysql.insert(userInSql,function(result){
                // console.log(result)
                res.send(result);
            })
        })

        app.get('/qcproduct',function(req,res){
            let product = req.query.product;
            let price = req.query.price;
            let img = req.query.img;
            let qty = req.query.qty;
            let classify=req.query.classify;
            let username=req.query.username;
            let id = req.query.id;
            console.log(username);
            let qc =`SELECT * from carlist where id='${id}' and username='${username}'`;
            let userInSql = `INSERT into carlist(product,price,img,qty,id,classify,username) VALUES ('${product}','${price}','${img}','${qty}','${id}','${classify}','${username}')`;
            let qc1 =`update carlist set qty = '${qty}' where id = '${id}' and username='${username}'`;
            db.mysql.select(qc,function(result){
                console.log(result.data.results.length);
                if(result.data.results.length==0){
                    db.mysql.select(userInSql,function(res1){
                        res.send(res1);
                    })
                }else{
                    console.log(qty);
                    db.mysql.select(qc1,function(res2){
                        res.send(res2);
                    })
                }
            });
        });

         app.get('/upproduct',(req,res)=>{
            let proudct = req.query.proudct;
            let price = req.query.price;
            let qty = req.query.qty1;
            let id = req.query.id;
            let sql = `update goods set proudct='${proudct}', price=${price*1},qty='${qty}' where id='${id}'`;
            db.mysql.update(sql,function(result){
                var status = result.status;
                if(status){
                    res.send({status:true,data:result.data.results});
                }else{
                    res.send({status:'error'});
                }
            });
        });

        app.get('/mhseach',function(req,res){

            let params = req.query.params;

            db.mysql.select(`select * from goods where classify like "%${params}%"`,
                function(result){
                    // console.log(result);
                    var status = result.status;
                    if(status){
                        res.send({status:true,data:result.data.results});
                        //res.send({status: true, data: result});
                    }else{
                        res.send({status:'error'});
                    }
                }
            );    
        });

    },
    register(app){
        app.get('/users',(req,res)=>{
            var userGetSql = 'SELECT * FROM user';
            db.mysql.select(userGetSql,function(result){
                res.send(result);
            })
        })

        app.get('/login',(req,res) => {
            let username=req.query.username;
            let password=req.query.password;
            var sql= `select * from user where username='${username}' and password='${password}'`;
            // sql +=";select FOUND_ROWS() as rowsCount;";
            db.mysql.select(sql, function(data){
                // console.log(data);
                res.send(data)
            })
        })

        // app.get('/login',(req,res)=>{
        //     var userGetlog = 'SELECT * FROM user where username="${username}"';
        //     db.mysql.select(userGetlog,function(result){
        //         res.send(result);
        //     })
        // })

        app.get('/deluser',function(req,res){
            let pid = req.query.id;
            db.mysql.delete(`delete from user where id="${pid}" `,function(result){
                var status = result.status;
                if(status){
                    res.send({status:'ok',lg:result.data.results[0]});
                }else{
                    res.send({status:'error'});
                }
            });
        });

        app.get('/inusers',(req,res)=>{
            let username = req.query.username;
            let password = req.query.password;
            let iphone = req.query.phone;
            let userInSql = `INSERT into user(username,password,iphone) VALUES ('${username}','${password}','${iphone}')`;
            db.mysql.insert(userInSql,function(result){
                // console.log(result)
                res.send(result);
            })
        })

        app.get('/upUser',(req,res)=>{
            let username = req.query.username;
            let password = req.query.password;
            let phone = req.query.phone;
            let id = req.query.id;
            let sql = `update goods set username='${username}', password=${password*1},phone='${phone}' where id='${id}'`;
            db.mysql.update(sql,function(result){
                var status = result.status;
                if(status){
                    res.send({status:true,data:result.data.results});
                }else{
                    res.send({status:'error'});
                }
            });
        });
    }


}