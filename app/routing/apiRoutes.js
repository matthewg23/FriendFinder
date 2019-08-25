// API Routes
// =============================================================

// First, load the data from friends.js
var friends = require('../data/friends.js');
var bodyParser = require('body-parser');

// Creating Routes
module.exports = function(app) {

	// Search for Specific Character (or all characters) - provides JSON
	app.get('/api/friends', function(req, res){
		// res.status(200).json({message: 'connected.'})
		res.json(friends);
	});


	app.post("/api/friends", function(req, res) {

        // Set up variables
        var formData = req.body;
        var userScores;
        var totalDifference;

        // Fix scores key of submitted object
     Object.defineProperty(formData, 'scores',
         Object.getOwnPropertyDescriptor(formData, 'scores[]'));
     delete formData['scores[]'];

     // Set up variable
     userScores = req.body["scores"]

     // Change values of scores key to integers
     for (var k = 0; k<userScores.length; k++) {
         userScores[k] = parseInt(userScores[k]);
     }

        // Create best match object
     var bestMatch = {
         name: "",
         photo: "",
         // Set high initial totalDifference limit since we want the lowest difference possible
         totalDifference: 100000
     };

     // Loop through all friends best match
     for (var i = 0; i < friendData.length; i++) {
         totalDifference = 0;

         // Loop through scores of each friend
         for (var j = 0; j < friendData[i].scores.length; j++) {
             totalDifference += (Math.abs(parseInt(userScores[j]) - parseInt(friendData[i].scores[j])));

             // Update best match if current friend is even more similar
             if (totalDifference <= bestMatch.totalDifference) {
                   bestMatch.name = friendData[i].name;
                   bestMatch.photo = friendData[i].photo;
                   bestMatch.totalDifference = totalDifference;
             }
         }
     }

       // Add form data to API
       friendData.push(formData);

       // Respond with best match
       res.json(bestMatch);
   });
};