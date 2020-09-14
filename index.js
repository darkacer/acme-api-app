const express = require("express")
const app = express()
const path = require('path');
let port = process.env.PORT || 3000;

let dataInput = 'im before data'

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/setData', (req, res) => {
    dataInput = req.query.code
    res.send(dataInput);
})

app.get("/getData", function (req, res) {
    res.send(dataInput)
});

app.listen(port, () => {
    console.log('im listening on port ', port)
})