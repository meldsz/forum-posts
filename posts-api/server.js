var express = require('express');
var app = express();
var fs = require("fs");

app.get('/api/posts', function (req, res) {
    fs.readFile( __dirname + "/" + "posts.json", 'utf8', (err, data) => {
        res.end( data );
    });
})

app.listen(3000, () => {
    console.log("Posts api app listening at 3000")
})