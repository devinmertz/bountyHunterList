var express = require("express");
var app = express();
var cors = require("cors");
var uuid = require("uuid");
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

var bounties = [{
		name: "Darth Vader",
		id: uuid.v4()
	},
	{
		name: "Kylo Ren",
		id: uuid.v4()
	},
	{
		name: "Valkorion",
		id: uuid.v4()
	},
	{
		name: "Boba Fett",
		id: uuid.v4()
	},
	{
		name: "Darth Maul",
		id: uuid.v4()
	}
];

var capturedList = [];

app.get("/bounty", function (req, res) {

	var bountyObj = {
		bounties: bounties,
		capturedList: capturedList
	}
	res.send(bountyObj);
});

app.post("/bounty/:name", function (req, res) {
	var newName = req.params.name;
	var newBounty = {
		name: newName,
		id: uuid.v4()
	}
	bounties.push(newBounty);
	res.send(newBounty);
});

app.post("/capturedList/:name", function (req, res) {
	var newName = req.params.name;
	var capturedBounty;
	for (var i = 0; i < bounties.length; i++) {
		if (bounties[i].name.toLowerCase() === newName.toLowerCase()) {
			capturedBounty = bounties[i];
			capturedList.push(capturedBounty);
			bounties.splice(i, 1);
		};
	}
	res.send(capturedBounty);

});
// create post to /captured/:name 
// find the object that has the same name
// remove that object from the bounties array
// add that object to the captured array
// return the object

app.delete("/capturedList/:name", function (req, res) {
	var newName = req.params.name;
	var deletedCapture = {};

	capturedList.forEach(function (capture, index) {
		if (capturedList[index].name.toLowerCase() === newName.toLowerCase()) {
			deletedCapture = capturedList[index];
			capturedList.splice(index, 1);
			res.send(capturedList);
		}
	})
});

app.put("/bounty/:name", function (req, res) {
	onsole.log(req.params);
	var bountyIndex;

	bounties.forEach(function (bounty, index) {
		if (bounty.name.toLowerCase === req.params.name.toLowerCase) {
			bountyIndex = index;
		}

	})

	var updatedBounty = req.query;
	if (!bounties[bountyIndex].id) {
		updatedBounty.id = uuid.v4();
	} else {
		updatedBounty.id = bounties[bountyIndex].id;
	}
	if (!updatedBounty.name) {
		updatedBounty.name = req.params.name;
	}

	bounties[bountyIndex] = updatedBounty;

	res.send(updatedBounty);
});


app.listen(3000, function () {
	console.log("Your server is running on port 3000.");
});