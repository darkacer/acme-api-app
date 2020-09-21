const express = require("express")
const axios = require('axios');
const qs = require('qs');
const path = require('path');

require('dotenv').config()

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

// const socket = io()


app.use(express.static('public'));
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const redirect_uri = 'https://acme-api-app.herokuapp.com/oauthcallback';

let usersMap = new Map();

let dataInput = 'im before data'

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
        'redirect_uri': redirect_uri,
        'Content-type': 'application/x-www-form-urlencoded' 
    });
    var config = {
        method: 'post',
        url: 'https://login.salesforce.com/services/oauth2/token',
        headers: {},
        data : data
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        // res.sendFile(path.join(__dirname+'/public/startShopping.html'));
        res.render("MyCart.ejs", {sampleJsonData: response.data});
    })
    .catch(function (error) {
        console.log(error);
    });
})

app.post("/setCartDetails", (req, res) => {
    let cartdata = JSON.parse(req.query.cart)
    console.log('cart detials are ' + cartdata + process.env.client_id);
    let respo = ''
    cartdata.forEach(el => respo += JSON.stringify(el))
    res.send(respo)
})

app.get("/getCartDetails", () => {
    console.log('cart detials are ' + process.env);
})

app.post("/resetCart", (req, res) => {
    // socket.emit('broadcast', 'google is good')
    io.emit('broadcast', { data: 'some data' });
})

app.get("/showpage", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/startShopping.html'));
})

app.get("/getData", function (req, res) {
    res.send(dataInput)
});

app.get('/google', function(req, res) {
    res.redirect('https://google.com');
})

app.get('/loginSalesforce', function(req,res) {
    console.log('doing from server' , process.env.client_id)
    let loginUrl = 'https://login.salesforce.com/services/oauth2/authorize?client_id='+process.env.client_id+'&redirect_uri=' + redirect_uri + '&response_type=code'
    res.redirect(loginUrl)
})

app.post('/setCartData', (req, res) => {
    console.log('reciebed ####')
    console.log('req body ', req.body)
    console.log('req body ', req.body.data)
    // let cartData = JSON.parse(req.query.data.cartdata)
    // let orderId = JSON.parse(req.query.data.orderId)
    // console.log('cart data ', cartdata, orderId)
    // let data = {
    //     cartData: cartdata,
    //     orderId: orderId
    // }
    res.send('hi')

    io.emit('broadcast', req.body.data)

})

app.get("/deleteme", (req, res) => {
    res.render("MyCart.ejs", {sampleJsonData: 'response.data'});
})

io.on("connection", function(socket) {
    console.log('process ', process.env.client_id)
    console.log('made connect', socket.id)

	socket.on("login_success", function (data) {
        console.log('user joined ', data);
        usersMap.set(socket.id, {});

    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
        usersMap.delete(socket.id)
    });

});

http.listen(port, function() {
	console.log("Listening on *:" + port);
});