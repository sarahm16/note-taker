let bodyParser = require('body-parser');
let express = require("express");
let path = require("path");
let notes = require('./db/note.js');

//express app
let app = express();

//define which port will be used
let PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//set initial id to 0
let n = 0;

//********** HTML ROUTES HERE ***********************************************

//viewed at http://localhost:3000/
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

//viewed at http://localhost:3000/notes.html
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

//*********** API ROUTES ****************************************************

//get response, returns notes array to client in json format
app.get('/api/notes', function(req, res) {
    res.json(notes);
})

//receives new note, add to notes array, return note in json format to client
app.post('/api/notes', function(req, res) {
    n += 1; //increment id
    let note = req.body;
    note.id = n;
    notes.push(note);
    res.json(note);
})

//find note by id and delete, write updated db.json
app.delete('/api/notes/:id', function(req, res) {
    notes.splice(req.params.id, 1);
    res.json(notes);
})

//port that server will be listening on
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});