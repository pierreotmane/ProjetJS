var express = require('express');

var morgan = require('morgan');

var bodyParser = require('body-parser');

var app = express();

var axios = require('axios');

var MongoClient = require('mongodb').MongoClient;

var hostname = "localhost";
var port = 3000;

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static(__dirname+'/public'));


MongoClient.connect("mongodb://localhost:27017", function(err,client){
	if(err)
		console.log(err);
	else{
		var db = client.db("baseCrypto");

		var routers = require('./routes');

		routers(app,db);
		app.route('/setup')
			.get(function(req,res,next){


				axios({  
					method:'get',
  					url:'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG',
 					 responseType:'json'})
				//axios.get('https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG')
				  .then(function (req) {
				    console.log(req);
				    console.log(req.data.Data);
				    console.log(req.data.Response);
				    console.log('------------' + req.status);
				    var data2 = req.data.Data;
        			var values = new Array();

           			for(var i =0; i<data2.length; i++) {
              			//values.push([element.time*1000, element.close]);
              			console.log(data2[i].time*1000)
              			console.log(data2[i].close)
              			var btcVal = {
							time:data2[i].time*1000,
							close : data2[i].close
						}
						db.collection('BTC').insert(btcVal);
            		}
				  })
				  .catch(function (error) {
				    console.log(error);
				  });

				/*request('', function (error, response, body) {
			    if (!error && response.statusCode == 200) {
			      	var info = JSON.parse(body)
			      	// do more stuff
			      	res.send(info);
			    	}
			  	})*/

				//res.json(url);ml
				res.writeHead(200, {
				'Content-type': 'text/html'
				});	

				res.end('<html><body><h1>Base OK</h1></body></html>');

				
	});
			app.listen(port, hostname, function() {
				// body
				console.log('Le serveur tourne sur l\'adresse : http://'+hostname+' : '+port);
				});

	}
})


