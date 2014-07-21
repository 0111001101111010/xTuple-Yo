var express = require('express'),
  app = express(),
  path = require('path'),
  http = require('http'),
  Client = require('xtuple-rest-client'),
  twilio = require('twilio')('ACCOUNT_SID', 'AUTH_TOKEN');

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
  res.send("hello!");
  res.end();
  //Send an SMS text message
  client.sendMessage({

      to:'+13476479140', // Any number Twilio can deliver to
      from: '+14506667788', // A number you bought from Twilio and can use for outbound communication
      body: 'word to your mother.' // body of the SMS message

  }, function(err, responseData) { //this function is executed when a response is received from Twilio
      if (!err) { // "err" is an error received during the request, if any
          // "responseData" is a JavaScript object containing data received from Twilio.
          // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
          // http://www.twilio.com/docs/api/rest/sending-sms#example-1
          console.log(responseData.from); // outputs "+14506667788"
          console.log(responseData.body); // outputs "word to your mother."
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
