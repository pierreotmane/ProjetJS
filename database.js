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
		
		app.route('/setup').get(function(req,res,next){
			db.collection('portemonnaie').drop();
			db.collection('transaction').drop();
			var urlTab = ['https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG',
							'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=60&aggregate=3&e=CCCAGG',
							'https://min-api.cryptocompare.com/data/histoday?fsym=BTS&tsym=USD&limit=60&aggregate=3&e=CCCAGG'];
			for(i=0;i<urlTab.length;i++) {

				axios.get(urlTab[i]).then(function (req) {
			    	var data = [];
			    
			    var data2 = req.data.Data;
    			var values = new Array();

				var separateur = ['=','&'];
				var lien = req.config.url;
				var nomMonnaie = lien.split(new RegExp(separateur.join('|'),'g'));

				
				for(var i =0; i<data2.length; i++) {
          			data.push({time : data2[i].time*1000,close : data2[i].close});
        		}

        		var monnaieVal = {
          				name:nomMonnaie[1],
          				data : data 
					}

				
				db.collection('portemonnaie').insert(monnaieVal);
				

			  })
			  .catch(function (error) {
			    console.log(error);
			  });
			}

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


