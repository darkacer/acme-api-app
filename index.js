const express = require("express")
const app = express()
var axios = require('axios');
var qs = require('qs');
const path = require('path');
let port = process.env.PORT || 3000;

let dataInput = 'im before data'
let cartData = [];
let showCart = false;

app.get('/', function(req, res) {
    res.send('hello world')
}) 

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname+'/public/login.html'));
});

app.post('/setData', (req, res) => {
    dataInput = req.query.code
    res.send(dataInput);
})

app.get('/oauthcallback', (req, res) => {
    let code = req.query.code
    console.log('code is ', code)
    code = decodeURIComponent(code)

    var data = qs.stringify({
        'grant_type': 'authorization_code',
        'client_id': process.env.client_id,
        'code': code,
        'client_secret': process.env.client_secret,
        'redirect_uri': 'https://acme-api-app.herokuapp.com/oauthcallback',
        'Content-type': 'application/x-www-form-urlencoded' 
    });
    var config = {
        method: 'post',
        url: 'https://login.salesforce.com/services/oauth2/token',
        headers: { 
            
        },
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.sendFile(path.join(__dirname+'/startShopping.html'));
    })
    .catch(function (error) {
        console.log(error);
    });


})


app.post("/setCartDetails", (req, res) => {
    let cartdata = JSON.parse(req.query.cart)
    console.log('cart detials are ' + cartdata);
    let respo = ''
    cartdata.forEach(el => respo += JSON.stringify(el))
    res.send(respo)
})

app.get("/getCartDetails", () => {
    
})

app.post("/resetCart", (req, res) => {
    showCart = false;
    cartData = [];
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