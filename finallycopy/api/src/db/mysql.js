var mysql = require('mysql');

var db = mysql.createPool({
    connectionLimit: 10,
    host: "10.3.136.30",//ip地址
    user: 'root',
    port:3306,
    password: '',
    database: 'zhengongfu',//数据库名字
    multipleStatements:true,  // 允许执行多个SQL语句
    timezone:"00:00" // 设置时间格式
})


module.exports = {
    select: function(_sql, _callback){
        db.query(_sql, function(error, results,fields){
        //    console.log(results);
            if(error){
                _callback({status: false, error: error})
            }else{
               _callback({status: true, data: {results}});
            }
        })
    },
    insert: function(_sql,_callback){
        db.query(_sql, function(error, results,fields){
            if(error){
                _callback({status: false, error: error})
            }else{
                _callback({status:true,buyID:results.insertId});
            }
        })
    },
    delete: function(_sql, _callback){
        db.query(_sql, function (error, results, fields) {
            if(error){
                _callback({ status: false, error: error })
            }else{
                _callback({ status: true, data: { results, fields } });
            }
        })
    },
    update: function(_sql, _callback){
        db.query(_sql, function(error, results,fields){
            if(error){
                _callback({status: false, error: error})
            }else{
                _callback({status: true, data: {results}});
            }
        })
    }
}