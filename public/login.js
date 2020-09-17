const socket = io();

function login() {
    window.location.href = '/loginSalesforce';
    console.log('socket id ', socket.id)
    // window.open("/loginSalesforce");
}
// var settings = {
//     "url": "/getData",
//     "async": true,
//     "crossDomain": true,
//     "method": "GET"
// }
// function getData() {
//     if (settings) {
//         $.ajax(settings).done(function (response) {
//             console.log('response ', response)
//             if (response === 'whatdaupupup') {
//                 $('#loginPart').hide();
//                 $('#cartPart').show();
//             }
//         });
//     }
// }
