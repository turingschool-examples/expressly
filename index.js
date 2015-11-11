const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

app.use(express.static('public'));

app.get('/', function (req, res){
  res.send(`<html><body>
    <form action="/poll/new" method="post">
      <label for="name">Title</label><br>
      <input id="name" type="text" name="poll[title]"><br>
      <hr>
      <input id="name" type="text" name="poll[responses][]" placeholder="Response #1"><br>
      <input id="name" type="text" name="poll[responses][]" placeholder="Response #1"><br>
      <input id="name" type="text" name="poll[responses][]" placeholder="Response #1"><br>
      <input type="submit" value="Save">
    </form>
    </body></html>`);
});

app.post('/poll/new', function (req, res) {
  console.log(req.body);
  res.send('You submited: ' + JSON.stringify(req.body) + '.');
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
