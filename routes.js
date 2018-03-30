module.exports = function(app,db){

var urlCollection = db.collection('BTC');



	app.route('/api/BTC')
	.get(function(req, res, next){

		urlCollection.find({}).toArray
		(function(err, result){
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
	.delete(function(req, res, next){

		urlCollection.deleteMany({},
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

	});



app.route('/api/BTC/:btcDate')
	.get(function(req, res, next){

		var ObjectId = require('mongodb').ObjectId;

		urlCollection.findOne({ _id : new ObjectId(req.params.urlId)},
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
	.put(function(req, res, next){
		var ObjectId = require('mongodb').ObjectId;

		urlCollection.updateOne(
	 	{_id : new ObjectId(req.params.urlId)},	
		{
			$set:{
				name: req.body.name,
				path: req.body.path
			}
		},
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

		urlCollection.deleteOne({ _id : new ObjectId(req.params.urlId)},
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
