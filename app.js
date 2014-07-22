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

http.createServer(app).listen(app.get("port"), function () {
  console.log("xTuple Move-Ur-Car app is running at localhost:", app.get("port"));
});
