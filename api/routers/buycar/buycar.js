
var db = require('../../db/db');
    //仅供参照
module.exports = {
    buycarPost:function(app,db){
        app.get('/buycar',function(req,res){
            db.select(`select * from buycarlist`,
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

        //购物车数量+1
        app.get('/addQty', function (req, res) {
            let Id = req.query.id;
            // let Qty = req.body.qty;

            let sql = `update buycarlist set Qty=Qty+1 where buyID=${Id}`;
            db.update(sql, function (result) {
                console.log(result)
                var status = result.status;
                if (status) {
                    res.send({ status: 'ok', addQty: result });
                } else {
                    res.send({ status: 'err' });
                }
            })
        })

        app.get('/lessQty', function (req, res) {
            let Id = req.query.id;
            // let Qty = req.body.qty;

            let sql = `update buycarlist set Qty=Qty-1 where buyID=${Id}`;
            db.update(sql, function (result) {
                console.log(result)
                var status = result.status;
                if (status) {
                    res.send({ status: 'ok', addQty: result });
                } else {
                    res.send({ status: 'err' });
                }
            })
        })

    }
}