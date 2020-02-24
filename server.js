let express = require("express");
let path = require("path");

let app = express();
let PORT = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});