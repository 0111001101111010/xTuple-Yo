var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  Client = require('xtuple-rest-client'),
  twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.locals.title = "xTuple REST To Do App";
app.set("views", path.join( __dirname, "views" ));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res){
  new Client(function (client) {
    client.query({
      type: 'Contact',
      method: 'list',
      params: { maxResults: 50 },
      callback: function (err, result) {
        if (err) {
          res.send('Error:', err);
        }
        if (result) {
          app.locals.contacts = result.data.data;
          res.render("contact");
        }
      }
    });
  });
});

app.post('/text', function( req, res){
  //Send an SMS text message
  twilio.sendMessage({

      to:'+13473993732', // Any number Twilio can deliver to
      from: '+13476479140', // A number you bought from Twilio and can use for outbound communication
      body: 'Please Move Your Car'
  }, function(err, responseData) {
      console.log(err);
      if (!err) {
      console.log(responseData);
      res.send(responseData.from + " " + responseData.body);
      res.end();
      }
  });
});

app.get("/add_todo", function (req, res){
  new Client(function (client) {
    client.query({
      type: 'ToDo',
      method: 'insert',
      params: {
        dueDate: req.query.duedate,
        status: req.query.status,
        isActive: true,
        description: req.query.description
      },
      callback: function (err, result) {
        if (err) {
          res.send('Error:', err);
          return;
        }
        justAdded = result.data.id;
        res.send('Inserted:', result.data.id);
      }
    });
  });
});

app.get("/get_todo", function (req, res){
  new Client(function (client) {
    client.query({
      type: 'ToDo',
      method: 'get',
      params: {uuid: req.query.id},
      callback: function (err, result) {
        if (err) {
          res.send('Error:', err);
          return;
        }
        res.send('To Do:', result);
      }
    });
  });
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("xTuple REST To Do app is running at localhost:", app.get("port"));
});
