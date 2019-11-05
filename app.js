var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
  fs.readdir('./public', function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    let files = []
    filenames.forEach(function(filename) {
      files.push(filename)
    });
    let rendering = '<strong>Shared files are:</strong><br>'
    for(let k in files){
      rendering += '<a href="/'+files[k]+'">'+files[k]+'</a><br>'
    }
    res.send(rendering)
  });
});

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('File Sharing service running on port 3000, publish your files on *public* folder.');
  console.log('Open another terminal tab and run ngrok service with: ./ngrok http 3000');
});
