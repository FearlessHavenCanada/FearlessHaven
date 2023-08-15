const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');


const app = express()
const port = 3000


app.use(express.static('public'))
app.use(express.static('artwork'))

app.use(bodyParser.text());


app.post('/submitArtwork', (req, res) => {


// Create Variable with Base64 Image String
var base64Data = req.body.replace(/^data:image\/png;base64,/, "");

// Store Image into Server
fs.writeFile("artwork/piece_" + (Math.random().toString()) + ".png", base64Data, 'base64', function(err) {
	console.log(err);
});

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
	res.sendFile(path.join(__dirname, '/public/index.html'));
});
app.get('/artworkEditor', function(req, res) {
	res.sendFile(path.join(__dirname, '/public/ArtworkEditor.html'));
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})