const express= require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");
const { urlencoded } = require("body-parser");
const { post } = require("request");
const app = express();
app.use(express.static("public"));  

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
   const fname = req.body.fName;  
   const lname = req.body.lname;
   const email = req.body.email;

   const data = {
    members: [
        {
            email_address:email,
            status: "subscribed",
            member_fields:{
                FNAME: fname,
                LNAME:lname
            }
        }
    ]
   }
   const jsonData= JSON.stringify(data);
   const url ="https://us14.api.mailchimp.com/3.0/lists/b9f0600978";
 
   const options={
    method:"POST",
    auth: "royal:e2da68479b852e0577afdb58680149f7-us14"
   }

   const request = https.request(url,options,function(responce){
     if(responce.statusCode === 200){
        res.sendFile(__dirname+"/success.html");   
     }  else{
        res.sendFile(__dirname+"/failure.html");   
     }
    
    responce.on("data",function(data){
        console.log(JSON.parse(data));
       })
   })
  request.write(jsonData);
  request.end();

});
app.listen(3000,function(){
    console.log("server is started");
})










// api key   =  e2da68479b852e0577afdb58680149f7-us14
//list id
//b9f0600978