const express = require("express")
const app = express()
const fetch = require('node-fetch');
const path = require('path');
let port = process.env.PORT || 3000;

let dataInput = 'im before data'

app.get('/', function(req, res) {
    res.send('hello world')
}) 

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/setData', (req, res) => {
    dataInput = req.query.code
    res.send(dataInput);
})

app.get('/oauthcallback', (req, res) => {
    let code = req.query.code
    console.log('code is ', code)
    code = decodeURIComponent(code)
    const url ='https://login.salesforce.com/services/oauth2/token';
    const headers = {
        "grant_type": "authorization_code",
        "Content-Type": "application/x-www-form-urlencoded",
        "client_id": "3MVG9d8..z.hDcPIA4C3lokx_ddUobFVY2b_LLeemoWaWaTizjDd0pj_7WCz5KLVmXlZ25F8tz5WV2kjcsszB",
        "client_secret": "E210A8C1A61FAB465DF79642B7A3149D356C40A91448ED5D3582BA61A8E7E8EB",
        "code": code,
        "redirect_uri": "https://acme-api-app.herokuapp.com/oauthcallback"
    }

    fetch(url, { method: 'POST', headers: headers})
    .then((res) => {
        return res.json()
    })
   .then((json) => {
      // Do something with the returned data.
     console.log(json);
   
   });

})

app.get("/getData", function (req, res) {
    res.send(dataInput)
});

app.get('/google', function(req, res) {
    res.redirect('https://google.com');
})

app.listen(port, () => {
    console.log('im listening on port ', port)
})