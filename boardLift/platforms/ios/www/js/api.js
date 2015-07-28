var secureHost = "http://jeuel.dev.boardlift.com:3000/api/";

function boardLiftLogin(userName, pass){
    var params = '{"email" : "'+userName+'","password" : "'+pass+'"}';
    console.log('boardLiftLogin');
    $.ajax({
    url: secureHost + "users/login",
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    data: params,
    success: function (data) {
      console.log(JSON.stringify(data));
    },
    error: function(data){
      console.log("Cannot get data");
      console.log(JSON.stringify(data));
    }
    });
}