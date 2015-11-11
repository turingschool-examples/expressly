const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const crypto = require('crypto');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const path = require('path');

app.use(express.static('public'));

const polls = {};

app.get('/', function (req, res){
  res.send(`<html><body>
    <form action="/polls/new" method="post">
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

app.get('/polls/:id', function (req, res) {
  var poll = polls[req.params.id];
  res.send(`<html><body>
      <h1>${poll.title}</h1>
    </body></html>`);
});

app.post('/polls/new', function (req, res) {
  var poll = req.body.poll;
  var id = crypto.randomBytes(20).toString('hex');

  poll.id = id;
  poll.voterId = crypto.randomBytes(20).toString('hex');
  poll.voterUrl = '/vote/' + voterId;

  polls[id] = poll;
  res.redirect('/polls/' + id);
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Your server is up and running on Port 3000. Good job!');
});
