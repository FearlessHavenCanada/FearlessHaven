const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');



const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.static('artwork'));
app.use(bodyParser.text());

let challenges = JSON.parse(fs.readFileSync('challenges/ChallengeSet.json'));
setInterval(() => {
    challenges.prompts.sort(() => (Math.random() > .5) ? 1 : -1);
	console.log("Shuffling Challenge Set... " + new Date().toString());
}, 15 * 1000);





app.get('/challenge', (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	var index = Math.floor(Math.random() * challenges.prompts.length);
	var currentChallenge = challenges.prompts[index];

	res.json({
		challengeText: currentChallenge.prompt,
		options: currentChallenge.options,
		index: index
	});
});


app.post('/submitArtwork', (req, res) => {

	var challengeResponse = (req.headers['challenge-response']);
	var challengeIndex = parseInt(req.headers['challenge-index']);

	console.log(challengeIndex);

	//TODO: Some checks here to test whether the challenge-index header even exists
	if(challenges.prompts[challengeIndex].answer === challengeResponse){

		var base64Data = req.body.replace(/^data:image\/png;base64,/, "");

		fs.writeFile("artwork/piece_" + (Math.random().toString()) + ".png", base64Data, 'base64', function(err) {
			console.log(err);
		});

	}
	else {
		console.log("Submission made to /submitArtwork but the challenge failed");
	}


});

app.get('/artwork', (req, res) => {
	const artworkFolder = path.join(__dirname, 'artwork');
  
	fs.readdir(artworkFolder, (err, files) => {
		if (err) {
			console.error('Error reading artwork folder:', err);
			return res.status(500).json({ error: 'Internal server error.' });
	  	}
  
	  	const imageUrls = files.filter(file => file.endsWith('.png')).map(file => `/${file}`);
	  	res.json(imageUrls);
	});
});


app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/mainsite/Home.html'));
});
app.get('/artworkEditor', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/editor/ArtworkEditor.html'));
});


app.listen(port, () => {
	console.log(`FearlessHaven Server listening on port ${port}`)
});
