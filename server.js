let express = require("express");
let path = require("path");
let fs = require('fs');

let app = express();
let PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

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
        return data;
    })
})

//receives new note
app.post('/api/notes', function(req, res) {
    let note = JSON.stringify(req.body);
    fs.appendFile('db/db.json', note, function(err) {
        if(err) throw err;
    })
    return note;
})


//port that server will be listening on
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

module.exports = fs;