module.exports = function(app,db){

var monnaies = db.collection('monnaies');
var portemonnaie = db.collection('portemonnaie');
var transac=[];

	app.route('/api/name')
	.get(function(req, res, next){
		console.log('test');
		monnaies.find().project({name: 1, _id: 0}).toArray(function(err, result){
			if(err)
				res.send(err);
			else{
				res.json({
					status:"200",
					data: result
				});
			}
		})
	})


	app.route('/api/:monnaie')
	.get(function(req, res, next){
		monnaies.findOne({name: req.params.monnaie}, function(err, result){
			if(err)
				res.send(err);
			else{
				res.json({
					status:"200",
					data:result
				});

			}
		});
	}).delete(function(req, res, next){

		monnaies.deleteMany({},
		function(err, result){
			if(err)
				res.send(err);
			else{
				res.json({
					status:"200",
					data:result	
				});
			}
		})

	})
	.put(function(req, res, next){
		portemonnaie.findOne({name: req.params.monnaie}, function(err, result){
			var transac = result.transaction;
			var nombre = result.data.nombre;
			var close = result.data.close;
			console.log(transac);
			var monnaie = req.body.nbmonnaie;
			var typeTransaction = req.body.value;
			console.log(typeTransaction);
			var data;
			if(!monnaie == 0){
				if(typeTransaction == 'achat'){
					if(monnaie<=result.data.nombre){
						console.log('create data');
						data = {
							name: typeTransaction,
							ancienPM:result.data.nombre,
							nombreAchete: monnaie * result.data.close
						}
						console.log(data);
						nombre -= (monnaie * result.data.close);
						console.log('push');
						transac.push(data);
						console.log('transac '+transac);
					}
				}
			}
			
			portemonnaie.update(
		 	{name : req.params.monnaie},	
			{
				$set:{
					transaction: transac,
					data:{
						nombre : nombre,
						close : close
					}
				}
			},
			{upsert:true},

			function(err, result){
				if(err)
					res.send(err);
				else{
					res.json({
						status:"200",
						data:result	
					});
				}

			});
	})});

	app.route('/api/portemonnaie/:monnaie')
		.get(function(req, res, next){
		portemonnaie.findOne({name: req.params.monnaie}, function(err, result){

			if(err)
				res.send(err);
			else{
				res.json({
					status:"200",
					data:result
				});

			}
		});
	});


app.route('/api/BTC/:btcDate')
	.get(function(req, res, next){

		var ObjectId = require('mongodb').ObjectId;

		monnaies.findOne({ _id : new ObjectId(req.params.urlId)},
		function(err, result){
			if(err)
				res.send(err);
			else{
				res.json({
					status:"200",
					data:result	
				});
			}
		});
		
	})
	
	.delete(function(req, res, next){
		var ObjectId = require('mongodb').ObjectId;

		monnaies.deleteOne({ _id : new ObjectId(req.params.urlId)},
		function(err, result){
			if(err)
				res.send(err);
			else{
				res.json({
					status:"200",
					data:result	
				});
			}
		});
	});
}
