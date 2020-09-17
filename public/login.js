const socket = io();
console.log('sending to server')

// let clientId = '3MVG9d8..z.hDcPIA4C3lokx_ddUobFVY2b_LLeemoWaWaTizjDd0pj_7WCz5KLVmXlZ25F8tz5WV2kjcsszB';
//let clientId = '3MVG9d8..z.hDcPIA4C3lokx_ddUobFVY2b_LLeemoWaWaTizjDd0pj_7WCz5KLVmXlZ25F8tz5WV2kjcsszB';

// let  = 'https://acme-api-app.herokuapp.com/oauthcallback'
//let redirect_uri = 'localhost:3000/oauthcallback'
//let loginUrl = 'https://login.salesforce.com/services/oauth2/authorize?client_id='+clientId+'&redirect_uri=' + redirect_uri + '&response_type=code'
$('#cartPart').hide();
console.log('showing first');
var settings = {
    "url": "/getData",
    "async": true,
    "crossDomain": true,
    "method": "GET"
}
function login() {
    console.log('hi im inside login')
    window.location.href = '/loginSalesforce';
}
function getData() {
    if (settings) {
        $.ajax(settings).done(function (response) {
            console.log('response ', response)
            if (response === 'whatdaupupup') {
                $('#loginPart').hide();
                $('#cartPart').show();
            }
        });
    }
}
