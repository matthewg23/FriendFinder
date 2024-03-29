var express = require('express');
var bodyParser = require('body-parser');


var app = express(); 
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
