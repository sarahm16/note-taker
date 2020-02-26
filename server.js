let express = require("express");
let path = require("path");
let fs = require('fs');

//express app
let app = express();

//define port
let PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let n = 0;

//sends user to index.html first
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

//route /notes to notes.html
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

//reads db.json, returns notes
app.get('/api/notes', function(req, res) {
    fs.readFile('db/db.json',  'utf8', function(err, data) {
        res.send({ data });
    })
})

//receives new note
app.post('/api/notes', function(req, res) {
    n += 1;
    let note = req.body;
    note.id = n;
    console.log(note);
    fs.appendFile('db/db.json', note, function(err) {
        if(err) throw err;
    })
    res.send({ note });
})

//find note by id and delete
app.delete('/api/notes/:id', function(req, res) {
    //req.params.id;
})

//port that server will be listening on
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

module.exports = fs;