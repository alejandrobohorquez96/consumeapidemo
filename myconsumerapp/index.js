const http = require('http')
const https = require('https')
const fs = require('fs')

//allow unsecure connections to be made
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

http.createServer(function (req, res) {
        //get the query from the request url
    let query = (req.url.split('?')) ? req.url.split('?')[1] : ""
    //get the url from the request url
    let url = (req.url.split('?')) ? req.url.split('?')[0] : req.url
    console.log(req.url)
    if(url == "/home.html"){
    //if the url path is home.html then get the home.html file from public directory
        fs.readFile("public/home.html", function(err, data){
            if(err){
            //if there is an error respond to the client with an error
              res.statusCode = 500;
              res.end(`Error getting the file: ${err}.`);
            } else {
            //send the home.html file to the client
              res.writeHead(200);
              res.end(data);
            }
        })
    }else if(url == "/customer"){
               //if the url path is customer
        if(query){
               //get the first and last name from the query string
            let fname = query.split('&')[0].split('=')[1]
            let lname = query.split('&')[1].split('=')[1]
            //populate the request settings
            let options = {
                //${datapower_url}
                host: 'api.us-south.apiconnect.appdomain.cloud',
                port: 443,
                //'/${org}/${catalog}/
                path: '/alvarobohorquez1ibmcom-dev/sb/provider-api/customer?fname='+fname+'&lname='+lname,
                //'${application_client_id}'
                headers: {
                    accept: 'application/json',
                'x-ibm-client-id': '7f196859-2da4-4e38-b89d-258e332de0d4',
                }  
             };
             
             //complete a get using https with the options request settings
             request = https.get(options, function(resp){
               //forward the API response to the client
               console.log(request)
                var body = "";
                resp.on('data', function(data) {
                   body += data;
                });
                resp.on('end', function() {
                    res.writeHead(200)
                    res.end(body);
                })
            });
        } else{
                //if there is a no query string redirect back to home
            res.writeHead(302,  {Location: "/home.html"})
            res.end();
        }
    }else{
        //redirect any other url path to home.html
        res.writeHead(302,  {Location: "/home.html"})
        res.end();
    }
  }).listen(6662, function(){
        //listen for client requests on the port 6662
   console.log("server start at port 6662");
  });
