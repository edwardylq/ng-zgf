
 var db = require('../../db/db');

module.exports = {
    //详情页通过ID获取数据
    detailsGet:function(app,db){
        app.get('/details',function(req,res){

            let ID = req.query.id;

            db.select(`select * from products where pID=${ID}`,
                function(result){
                    var status = result.status;
                    if(status){
                        res.send({status:true,data:result.data.results});
                    }else{
                        res.send({status:'error'});
                    }
                }
            );    
        });
        //添加到购物车列表
        app.post('/addCarlist',function(req,res){
                let ID=req.body.id;
                let qty=req.body.qty;
                let title=req.body.title;
                let price=req.body.price;
                let size=req.body.size;
                let img=req.body.img;
                let status=req.body.status;

                let sql = `insert into buycarlist (buyID,Qty,Title,Price,Size,Img,Status) VALUES (${ID*1},${qty*1},'${title}',${price*1},'${size}','${img}','${status}')`;
                console.log(sql);

            db.insert(sql,function(result){
                console.log(result);
                if(result){
                     res.send({status:true,data:result});
                }else{
                    res.send({state:'error'});
                }
            });
        })

    }
}