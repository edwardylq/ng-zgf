 import db from '../../db/db'
//var db =require('../../db/db.js')
module.export = {
    register(app){
        app.get('/IndexProducts',(req, res) => {
            db.mysql.select('select * from products', opyion => {
                res.sed(option);
            })
        })
    }
}