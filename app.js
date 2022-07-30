const express = require("express");




const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");



app.use(express.static("public"));


app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/signup.html");
});




app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields : {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

const jsonData = JSON.stringify (data);

const url = "https://us14.api.mailchimp.com/3.0/lists/aa879c469d";
const options = {
  method : "POST",
  auth : "angela1:2765ddcf437251ecab3a662139bdcff-us14"
}
const request = https.request (url, options, function (response){
   if (response.statusCode === 200) {
     res.sendFile(__dirname + "/success.html");

   } else {
     res.sendFile(__dirname + "/failure.html");

   }

 response.on ("data", function (data){
   console.log(JSON.parse(data));
 })
});

request.write (jsonData);
request.end();
});

  app.post ("/failure", function (req, res){
    res.redirect ("/");
  })

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on Port 3000.");
})


// API KEY

// 22765ddcf437251ecab3a662139bdcff-us14


// Audience or list or unque id
//
// aa879c469d
