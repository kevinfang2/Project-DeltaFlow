var path = require("path"),
    express = require("express");
var bodyParser = require('body-parser')

var PORT = process.env.port || 8000,
    app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname)));

let port = process.env.PORT || 8000;

app.get('/', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'index'));
});

app.get('/Mregister', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'Mregister'));
});

app.get('/Mlogin', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'Mlogin'));
});

app.get('/Iregister', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'Iregister'));
});

app.get('/Ilogin', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'Ilogin'));
});

app.get('/Iprofile', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'Iprofile'));
});

app.get('/Mprofile', (req, res) => {
	res.render(path.resolve(__dirname, 'views', 'Mprofile'));
});

app.get('/details', (req, res) => {
  // res.send('m: ' + req.query.m);
  // res.send('duration: ' + req.query.duration);
  // res.send('price: ' + req.query.price);
  // res.send('premium: ' + req.query.premium);
	res.render(path.resolve(__dirname, 'views', 'details'), {
    m:req.query.m,
    duration:req.query.duration,
    price:req.query.price,
    premium:req.query.premium
  });
});


app.post('/update', (req, res)=> {
	var same = Object.keys(req.body);
	console.log(req.body["user"]);
	let sketchbody = same[0];
	let test = JSON.parse(sketchbody);

	console.log("user name is")
	console.log(test.user);

	var same1 = String(test.values)
	console.log(same1);
	console.log(test.user);

	chaincode.invoke.write([test.user, ... same1], (err, body) => {
		console.log(body);
		res.send(body);
	});
});


app.get('/read', (req, res) => {
	var same=req.query
	console.log(same.user);

	chaincode.query.read([same.user], function(err, data){
    	console.log('read abc:', data, err);
    	if(data != undefined){
	    	var array = data.split(",");

	    	var x;
	    	for(x=0; x<=array.count - 1; x++) {
	    		console.log(array[0]);
			}
	    	res.send(array);
    	}
	});
});


app.listen(port, () => {
	console.log('listening on port ' + port);
});
