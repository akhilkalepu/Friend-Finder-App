// Load Data
// =============================================================
var friends = require("../data/friends");


// Routes
// =============================================================
module.exports = function (app) {

    // API GET requests
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST requests
    app.post("/api/friends", function (req, res) {

        var user = req.body;
        console.log(user);

        for (i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }

        var bestFriendIndex = 0;
        var minimumDifference = 100;

        for (i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            
            for (j = 0; j < friends[i].scores.length; j++) {
                totalDifference += Math.abs(user.scores[j] - friends[i].scores[j]);
            }

            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        res.json(friends[bestFriendIndex]);
        console.log(friends[bestFriendIndex]);

        friends.push(user);
    });
};