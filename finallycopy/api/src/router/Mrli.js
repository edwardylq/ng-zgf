const apiResult =require('../utils/apiResult');
const filter =require('../utils/filter');
const db=require('../db/index.js');

module.exports={
	register(app){
		app.post('/getcarlist',(req,res)=>{
			let username = req.body.username; 
			 var sql= `SELECT * FROM carlist WHERE username='${username}'`;
	         db.mysql.select(sql,function(result){
	              res.send(result);
	         })
		})

		app.post('/updatecarlist',(req,res)=>{
			let id=req.body.id;
			let username=req.body.username;
			let style=req.body.style;
			let updatesql='';
			if(style=='change'){
				let qty=req.body.qty;
				updatesql=`UPDATE carlist SET qty ='${qty}' WHERE id='${id}' and username='${username}'`;
				db.mysql.select(updatesql,function(result){
	              res.send(result);
	         	})
				return;
			}
			if(style=='up'){
				updatesql=`UPDATE carlist SET qty = qty +'1' WHERE id='${id}' and username='${username}'`;
				db.mysql.select(updatesql,function(result){
	              res.send(result);
	         	})
				return;
			}
			if(style=='down'){
				updatesql=`UPDATE carlist SET qty = qty -'1' WHERE id='${id}' and username='${username}'`;
				db.mysql.select(updatesql,function(result){
	              res.send(result);
	         	})
	         	return;
			}
			if(style=='remove'){
				updatesql = `DELETE FROM carlist where id='${id}' and username='${username}'`;
				db.mysql.select(updatesql,function(result){
	              res.send(result);
	         	})
	         	return;
			}
		})

		app.post('/getpassword',(req,res)=>{
			let username = req.body.username;
			var sql= `SELECT * FROM person WHERE username='${username}'`;
			db.mysql.select(sql,function(result){
	              res.send(result);
	        })
		})

		app.post('/delallcarlist',(req,res)=>{
			let username = req.body.username;
			let sql = `DELETE FROM carlist where username='${username}'`;
			db.mysql.select(sql,function(result){
	              res.send(result);
	        })
		})

		app.post('/ligetaddress',(req,res)=>{
			let username =req.body.username;
			let sql = `SELECT * FROM address where username='${username}' and status='1'`;
			db.mysql.select(sql,function(result){
	              res.send(result);
	        })
		})
	}
}