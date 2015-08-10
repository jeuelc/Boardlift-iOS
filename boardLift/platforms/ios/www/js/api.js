var secureHost = "http://jeuel.dev.boardlift.com:3000/api/",
    storingSingleSessionData = {};

var bodyTypeInfo = {
    1 : "wheels-sedan.png",
    2 : "wheels-wagon.png",
    3 : "wheels-hatch.png",
    4 : "wheels-suv.png",
    5 : "wheels-ute.png",
    6 : "wheels-4wd.png",
    7 : "wheels-van.png",
    8 : "wheels-other.png"
};

var carCompanies = {
    1 : "Abarth",
    2 : "AC",
    3 : "Alfa Romeo",
    4 : "Audi",
    5 : "BMW",
    6 : "Chevrolet",
    7 : "Chrysler",
    8 : "Citroen",
    9 : "Daewoo",
    10 : "Daihatsu",
    11 : "Dodge",
    12 : "Fiat",
    13 : "Ford",
    14 : "Holden",
    15 : "Hyundai",
    16 : "Isuzu",
    17 : "Jaguar",
    18 : "Jeep",
    19 : "Kia",
    20 : "Land Rover",
    21 : "Lexus",
    22 : "Mazda",
    23 : "Mercedez-Benz",
    24 : "MINI",
    25 : "Mitsubishi",
    26 : "Nissan",
    27 : "Peugeot",
    28 : "Porsche",
    29 : "Renault",
    30 : "Skoda",
    31 : "Subaru",
    32 : "Suzuki",
    33 : "Toyota",
    34 : "Volkswagen",
    35 : "Volvo",
    36 : "Other"
};

var bookingStatus={
    1:"Open",
    2:"Pending",
    3:"Approval",
    4:"Active",
    5:"Complete",
    6:"New",
    7:"Cancelled",
    8:"Deleted"
};

var boardSkillTypes = {
    1 : "Short Board",
    2 : "Mini Mal",
    3 : "Long Board",
    4 : "SUP",
    5 : "Skate Board",
    6 : "Body Board",
    7 : "Wake Board",
    8 : "Snow Board",
    9 : "Kite Board",
    10 : "Skis"
};


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
            app.curUserId = data['userId']; // stores access_token
            app.curAccessToken = data['id'];
            app.userCreated = data['created'];
            $.mobile.changePage('dashboard.html');
            getUserData();
            getUserProfileCompleteness();
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

function getUserData(callback){
    console.log('getUserData');
    $.ajax({
        url: secureHost + "UserProfiles?filter[where][id]=" +app.curUserId+ "&filter[include]=addresses&filter[include]=contactDetails&filter[include]=userWheels&filter[include]=userPreferences&filter[include]=profileCompleteness&filter[include]=userFavorites&filter[include]=sessions",
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            // console.log(JSON.stringify(data));
            app.userData = data[0];
            if(callback)
                callback();
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

function getUserFavoritesSport(callback){
    console.log('getUserFavoritesSport');
    $.ajax({
        url: secureHost + "UserFavorites?filter[where][userProfileId]=" +app.curUserId+ "&access_token="+app.curAccessToken,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            // console.log(JSON.stringify(data));
            app.userData.favorite = data[0];
            callback();
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

function getUserBoardSkills(callback){
    console.log('getUserBoardSkills');
    $.ajax({
        url: secureHost + "UserProfiles/" +app.curUserId+ "/boardSkills?access_token="+app.curAccessToken,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            // console.log(JSON.stringify(data));
            callback(data);
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

function getUserWheels(callback){
    console.log('getUserWheels');
    $.ajax({
        url: secureHost + "UserProfiles/" +app.curUserId+ "/userWheels?access_token="+app.curAccessToken,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            // console.log(JSON.stringify(data));
            callback(data, carCompanies);
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

function getAllComponents(){
    console.log('getAllComponents');
    $.ajax({
        url: secureHost + "ProfileComponentTypes?access_token="+app.curAccessToken,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            // console.log(JSON.stringify(data));
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

function getComponent(id, element, callback){
        console.log('getComponent');
        var sessionQuery = '{"where":{"userId":'+app.curUserId+',"componentTypeId":"'+id+'"}}';
    $.ajax({
        url: secureHost + "ProfileCompleteness?filter=" + sessionQuery,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            // console.log(JSON.stringify(data));
            callback(element, data); 
        },
        error: function(data){
            console.log("Cannot get data");
        }
    });
}

$(document).on('appIsReady', function(){
    $('#index-login').on('click', function(){
        console.log('click happen');
        boardLiftLogin($("#email").val(),$("#password").val());
    });
});

function profileStatus(page, callback){
    console.log('profileStatus');
    $.ajax({
    url: secureHost + "UserProfiles/"+app.curUserId+"?access_token="+app.curAccessToken,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    success: function (data) {
      callback(page, data);
    },
    error: function(data){
      console.log("Cannot get data");
    }
    });
}

function getNotification(){
    console.log('getNotification');
    $.ajax({
    url: secureHost + "Notifications/getUserNotifications?profileId="+app.curUserId+"&access_token="+app.curAccessToken,
    type: 'GET',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    success: function (data) {
      console.log(JSON.stringify(data));
    },
    error: function(data){
      console.log("Cannot get data");
    }
    });
}

function getUserProfileCompleteness(){
    $.ajax({
        url: secureHost + "UserProfiles/" + app.curUserId + "/completeness?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            if(d.length > 0){
                // app.currentAppCompleteness = d[0]['percentage'];
                $('#progress-bar').progressbar({value: d[0]['percentage']});
            }else{
                // app.currentAppCompleteness = 0;
                $('#progress-bar').progressbar({value: 0});
            }
            $('#user-profile-percent span').text(d[0]['percentage']);

            getUserSessionsAsDriver();
        },
        error: function(error){
            console.log(error);
        }
    });
}

function getUserSessionsAsDriver(){
    // console.log('this call is going, catch it');
    var sessionQuery = '{"where":{"driverId":'+app.curUserId+',"sessionStatusId":{"inq":[1,2,4,6]}}}',
        sessionHtml = "";
    // console.log(secureHost + "Sessions?filter=" + sessionQuery + "&access_token=" + app.curAccessToken);
    $.ajax({
        url: secureHost + "Sessions?filter=" + sessionQuery + "&access_token" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){

            if(d.length > 0){
                $('#total-session').text(d.length);

                for(var item in d){

                    var ts = Date.parse(d[item]['travelStartDate']);
                    var h = new Date(ts);
                    var sessionDate = h.dateFormat('d/m/Y');
                    
                    // sessionHtml += '<a href="http://web.boardlift.com/account/sessions/view/'+item['id']+'">';
                    sessionHtml += '<li class="single-session-driver" data-session-id="'+d[item]['id']+'"><h4>'+d[item]['name']+'</h4>';
                    sessionHtml += '<span class="time-msg"><div class="alert-icon"></div>';
                    sessionHtml += sessionDate+'</span><div class="gt-link-to-node">&gt;</div>';
                    sessionHtml += '<div class="v-spacer"></div></li><div class="v-spacer"></div>';

                }
                // console.log('this is html');
                // console.log(sessionHtml);

                $('#session-list').html(sessionHtml);

            }else{
                $('#session-list').html("<span style='float:left!important;font:14px AvenirLTStdLight;'>You don't have any sessions yet.</span><div class='v-spacer'></div>");
            }

            getUserBookingsAsPassenger();
        },
        error: function(error){
            console.log(error);
        }
    });
}

function getUserBookingsAsPassenger(){
    // console.log('this call is going, try & catch it');

    var bookingsQuery = '{"include":["session", "sessionFeedbacks"],"order":"statusModificationDate DESC","where":{"userProfileId":'+app.curUserId+',"bookingStatusId":{"inq":[1,5,2,7]}},"offset":0}';

    $.ajax({
        url: secureHost + "SessionBookings?filter=" + bookingsQuery + "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            var bookingsHtml = "";
            // console.log(d);

            if(d.length > 0){

                for(var item in d){

                    var ts = Date.parse(d[item]['travelStartDate']);
                    var h = new Date(ts);
                    var bookingDate = h.dateFormat('d/m/Y');
                    
                    // bookingsHtml += '<a href="http://web.boardlift.com/account/sessions/view/'+item['id']+'">';
                    bookingsHtml += '<li class="single-booking-user" data-booking-id="'+d[item]['sessionId']+'"><h4>'+d[item]['name']+'</h4>';
                    bookingsHtml += '<span class="time-msg"><div class="alert-icon"></div>';
                    bookingsHtml += bookingDate+'</span><div class="gt-link-to-node">&gt;</div>';
                    bookingsHtml += '<div class="v-spacer"></div></li></a><div class="v-spacer"></div>';

                }

                $('#bookings-list').html(bookingsHtml);

            }else{
                $('#bookings-list').html("<span style='float:left!important;font:14px AvenirLTStdLight;'>You don't have any bookings yet.</span><div class='v-spacer'></div>");
            }


            getUserMessages();
        },
        error: function(error){
            console.log(error);
        }
    });
}

function getUserMessages(){
    // console.log('messages call this is it');
    $.ajax({
        url: secureHost + "UserProfiles/" + app.curUserId + "/thread?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            var messagesHtml = "";

            if(d.length > 0){

                for(var item in d){

                    var ts = Date.parse(d[item]['message_date']);
                    var h = new Date(ts);
                    var messageDate = h.dateFormat('d/m/Y');
                    
                    messagesHtml += '<a href="http://web.boardlift.com/account/sessions/view/'+item['id']+'">';
                    messagesHtml += '<li><h4>'+d[item]['message']+'</h4>';
                    messagesHtml += '<span class="time-msg"><div class="alert-icon"></div>';
                    messagesHtml += messageDate+'</span><div class="gt-link-to-node">&gt;</div>';
                    messagesHtml += '<div class="v-spacer"></div></li></a><div class="v-spacer"></div>';

                }

                $('#messages-list').html(messagesHtml);

            }else{
                $('#messages-list').html("<span style='float:left!important;font:14px AvenirLTStdLight;'>You don't have any messages yet.</span><div class='v-spacer'></div>");
            }

        },
        error: function(error){
            console.log(error);
        }
    });
}

function getUserDetails(){}



// updates ride-details page with current session data
function showSingleSessionDriver(id, fromBack){
    $.ajax({
        url: secureHost + "Sessions/" + parseInt(id) + "?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            // console.log(d);
            d['from_src'] = fromBack;
            $.mobile.changePage('ride-details.html', {data:d});
        },
        error: function(error){
            console.log(error);
        }
    });

    // }
}

function updateRideDetailsPage(){
        console.log('this is the data thnat ais sent from the previous page');
        console.log(window.location.href);
        
        $('#session-name').text(getUrlParams('name'));
        $('#session-from').text(getUrlParams('origin'));
        $('#session-to').text(getUrlParams('destination'));
        
        var tsd = getUrlParams('travelStartDate'),
            ted = getUrlParams('travelEndDate');

        tsd = new Date(Date.parse(tsd));
        ted = new Date(Date.parse(ted));

        $('#session-start-time').text(tsd);
        $('#session-return-time').text(ted);
        $('#session-pickup-loc').text(getUrlParams('pickup'));

        var numSeats = parseInt(getUrlParams("numSeats"));
        var numSeatsHtml = "";

        for(var i=0; i<numSeats; i++){
            numSeatsHtml += '<li><img src="http://web.boardlift.com/assets/images/left-icon.png"></li>';
        }
        $('#avail-seats').html(numSeatsHtml);
        $('#seats-cost span').text(getUrlParams("seatCost"));

        // if came from booking page, then show driver profile tab
        if(getUrlParams("from_src") === "booking"){
            $("#ride-driver-details").show();
            $('.ride-form-holder').show();
        }

        $('#ride-driver-details').attr('data-driver-id', getUrlParams("driverId"));

        getSessionVehicleInfo();
        getSessionPickupDetails(getUrlParams("from_src"));

    // }
}

function getSessionPickupDetails(fromSrc){
    // console.log("inside pick up location");
    var pickupQuery = '{"where":{"sessionId":'+getUrlParams('id')+'}}';


        $.ajax({
        url: secureHost + "SessionPreferences/findOne?filter=" +pickupQuery+ "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            console.log("session data:"+d);
            // if(d['pickupTypeId'] == 1 || d['pickupTypeId'] == null){
            //     $("#session-pickup-loc").text("Passenger's can specify location (reasonable distance)");
            // }else if(d['pickupTypeId'] == 2){
            //     if(d['pickupLocation'] != undefined){
            //         console.log(d[pickupLocation]);
            //         $("#session-pickup-loc").text("Meet and leave from folowing pickup location: "+d[pickupLocation]);
            //     }
            // }
            if(fromSrc == "booking"){
                getDriverProfile($('#ride-driver-details').attr('data-driver-id'));
            }

        },
        error: function(error){
            console.log(error);
        }
    });
}


function getUrlParams(param){

    var curUrl = window.location.href;

    var curParams = curUrl.split('?')[1];

    if(curParams == undefined){
        return false;
    }

    var allParams = curParams.split('&');

    for(var item in allParams){
        var values = allParams[item].split('=');
        if(values[0] == param){
            values[1] = values[1].replace(/\+/g, " ");
            return values[1]
        }
    }

}


// this gets current session user's vehicle
function getSessionVehicleInfo(){
    // console.log(secureHost + "UserProfiles/" + app.curUserId + "/userWheels?access_token=" + app.curAccessToken);
    $.ajax({
        url: secureHost + "UserProfiles/" + app.curUserId + "/userWheels?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            // console.log('inside vehicle call');
            // console.log(d);
            if(d['error']){

            }else{
                if(d.length > 0){
                    d = d[0];
                    // console.log('this is image');
                    var carImage = "http://web.boardlift.com/assets/images/"+bodyTypeInfo[d['bodyType']];
                    // console.log(carImage);
                    $('#wheels-image').attr("src", carImage);
                    var vehDesc = carCompanies[d['vehicleMakeModelId']];

                    if(d['hasRoofRack'] == "yes"){
                        vehDesc += " with roof rack";
                    }else{
                        vehDesc += " without roof rack";
                    }
                    $('.wheel-detail').text(vehDesc);

                    initializeMap(getUrlParams('originLatitude'), getUrlParams('originLongitude'), getUrlParams('destinationLatitude'), getUrlParams('destinationLongitude'));

                }
                
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}


function showSingleMessage(id){
    $.ajax({
        url: secureHost + "Messages/" + parseInt(id) + "?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            $.mobile.changePage('ride-details.html', {data:d});
        },
        error: function(error){
            console.log(error);
        }
    });
}

function getAllMessage(callback){
    console.log('getAllMessage');
    $.ajax({
        url: secureHost + "UserProfiles/" + app.curUserId + "/thread?filter=[where][and][0][reservations]=0&filter=[where][and][1][archived]=0&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
        console.log('getAllMessage success');
            console.log(d);
            callback(d);
        },
        error: function(error){
            console.log(error);
        }
    });
}

// function getMessageConversation(callback){
//     console.log('getMessageConversation');
//     $.ajax({
//         url: secureHost + "Messages?filter={where:{sessionId:" ++ "}}&access_token=" + app.curAccessToken,
//         type: 'GET',
//         dataType: "json",
//         contentType: 'application/json',
//         processData: false,
//         success: function(d){
//         console.log('getMessageConversation success');
//             console.log(d);
//             callback(d);
//         },
//         error: function(error){
//             console.log(error);
//         }
//     });
// }

// initialize the google map
function initializeMap(latOrigin, lonOrigin, latDest, lonDest){   
    var latlng = new google.maps.LatLng(latDest, lonDest);
    var myOptions = {
        zoom: 15,
        center: latlng,
        draggable: false,
        mapTypeControl: false,
        keyboardShortcuts: false,
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        scrollwheel: false,
        streetViewControl: false,
        zoomControl: false,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($("#map-session")[0], myOptions);
    
    var lat_lng = new Array();
    var latlngbounds = new google.maps.LatLngBounds();
    var myLatlng = new google.maps.LatLng(latOrigin, lonOrigin);
    lat_lng.push(myLatlng);
    
    // create marker image
    var originImage = {
        url: 'http://web.boardlift.com/assets/images/map_icons/origin-icon2.png',
        // This marker is 32 pixels wide by 32 pixels tall.
        size: new google.maps.Size(20, 20),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is at 16,32.
        anchor: new google.maps.Point(10, 10)
    };
    
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: originImage,
        title: "Origin"
    });
    latlngbounds.extend(marker.position);
    
    var myLatlng = new google.maps.LatLng(latDest, lonDest);
    lat_lng.push(myLatlng);
    
    // create marker image
    var destinationImage = {
        url: 'http://web.boardlift.com/assets/images/map_icons/destination-icon2.png',
        // This marker is 32 pixels wide by 32 pixels tall.
        size: new google.maps.Size(22, 37),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0,0),
        // The anchor for this image is at 16,32.
        anchor: new google.maps.Point(11, 27)
    };
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: destinationImage,
        title: "Destination"
    });
    latlngbounds.extend(marker.position);
    
    map.setCenter(latlngbounds.getCenter());
    map.fitBounds(latlngbounds);
    
    // ROUTING 

    //Initialize the Path Array
    var path = new google.maps.MVCArray();

    //Initialize the Direction Service
    var service = new google.maps.DirectionsService({durationInTraffic: true});

    //Set the Path Stroke Color
    var poly = new google.maps.Polyline({ map: map, strokeColor: '#4986E7', strokeWeight: 5, strokeOpacity: 0.8 });
    
    var src = lat_lng[0];
    var des = lat_lng[1];
    
    path.push(src);
    poly.setPath(path);
    service.route({
        origin: src,
        destination: des,
        travelMode: google.maps.DirectionsTravelMode.DRIVING//,
        //optimizeWaypoints: true
    }, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            /*
            for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                //path.push(result.routes[0].overview_path[i]);
            }
            */
            var myRoute = result.routes[0].legs[0];
            
            for (var i = 0; i < myRoute.steps.length; i++) {
                for (var j = 0; j < myRoute.steps[i].path.length; j++) {
                    path.push(myRoute.steps[i].path[j]);
                }
                
                if(i == parseInt(myRoute.steps.length/2))
                {
                    var infowindow = new google.maps.InfoWindow({
                        content: "<img src='http://web.boardlift.com/assets/images/car-map.jpg' style='width:20px;height:20px;border:0px !important;'><font size='3px' style='font-weight: bold;'> " + myRoute.duration.text + "</font><br>" + myRoute.distance.text,
                        position: myRoute.steps[i].start_point
                    });
                    infowindow.open(map);
                    google.maps.event.addListener(infowindow, 'domready', function(){
                        $(".gm-style-iw").next("div").hide();
                    });
                }
            }
        }
    });
}


// get all bookings for a user, for bookings.html page
function getAllUserBookings(){

    var fullBookingsQuery = '{"include":["session", "sessionFeedbacks"],"order":"statusModificationDate DESC","where":{"userProfileId":'+app.curUserId+',"bookingStatusId":{"inq":[1,2,3,4,5,6,7,8,9,10]}},"offset":0}';

    $.ajax({
        url: secureHost + "SessionBookings?filter=" + fullBookingsQuery + "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            var allbookingsHtml = "",
                allSessionIdsOrigin = {};
            console.log('these are all bookings');
            console.log(d);
            console.log('all bookings ends');
            // console.log(d);
            for(var item in d){

                var ts = Date.parse(d[item]['session']['travelStartDate']);
                var h = new Date(ts);
                var sessionDate = h.dateFormat('d/m/Y');

                allSessionIdsOrigin[d[item]['sessionId']] = d[item]['session']['origin'];

                allbookingsHtml += '<div class="ride-request-holder" data-booking-id="'+d[item]['sessionId']+'"><div class="lift-img"><a href="ride-details.html">';
                allbookingsHtml += '<img class="pic-venue" alt="" src="http://web.boardlift.com/assets/images/sessions/session-1.jpg" data-unique-session-id="'+d[item]['sessionId']+'"></a></div>';
                allbookingsHtml += '<div class="ride-details-mobile" style="display:none;"><ul>';
                allbookingsHtml += '<li class="ride_request_booking_status '+bookingStatus[d[item]['bookingStatusId']]+'"><span>Booking request '+bookingStatus[d[item]['bookingStatusId']]+'</span></li>';
                allbookingsHtml += '<li><span class="title">Session: </span><span class="info"><a href="ride-details.html">'+d[item]['session']["name"]+'</a></span></li>';
                allbookingsHtml += '<li><span class="title">To :</span><span class="info">'+d[item]['session']["destination"]+'</span></li>';
                allbookingsHtml += '<li><span class="title">Date: </span><span class="info">'+sessionDate+'</span></li>';
                allbookingsHtml += '<li><span class="title">Time: </span><span class="info"> 6am/12-2pm</span></li>';
                allbookingsHtml += '<li><span class="title">Cost/seats: </span><span class="info">$'+d[item]["totalCost"]+'</span></li>';
                allbookingsHtml += '<li><span class="title">Request seat: </span><span class="info">'+d[item]["numSeats"]+'</span></li>';
                allbookingsHtml += '</ul></div><div class="action-buttons-holder">';
                allbookingsHtml += '<div class="v-spacer"></div><a href="javascript:void(0)"class="cancel-booking-button">Cancel</a>';
               allbookingsHtml += '<a href="javascript:void(0)" class="dispute-booking-button">Dispute</a>';
                allbookingsHtml += '<a href="javascript:void(0)" class="complete-booking-button">Complete</a>';
                allbookingsHtml += '<div class="v-spacer"></div></div><div class="v-spacer"></div></div>';
            }
            $(".user-profile-main-panel").html(allbookingsHtml);

            getLocationInfo(allSessionIdsOrigin);
            
        },
        error: function(error){
            console.log(error);
        }
    });
}

// get all sessions as driver for user, for session-current-listings.html
function getAllSessionsForUser(){
    console.log("inside get all session for user");
    var sessionQuery = '{"where":{"driverId":'+app.curUserId+',"sessionStatusId":{"inq":[1,2,3,4,5,6,7,8,9,10]}}}';
    // console.log(secureHost + "Sessions?filter=" + sessionQuery + "&access_token=" + app.curAccessToken);
    $.ajax({
        url: secureHost + "Sessions?filter=" + sessionQuery + "&access_token" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
                // console.log(d);
            var completeSessionHtml = "";
            if(d.length > 0){
                // console.log('inside this now');
                // $('#total-session').text(d.length);

                for(var item in d){

                    var ts = Date.parse(d[item]['travelStartDate']);
                    var h = new Date(ts);
                    var sessionDate = h.dateFormat('d/m/Y');

                    completeSessionHtml += '<div class="ssn_row">';
                    completeSessionHtml += '<a data-session-id="'+d[item]['id']+'" id="single-session-view">';
                    completeSessionHtml += '<table width="100%"><tbody><tr><td class="main-details-holder" style="width:86%"><div class="ssn_list_row">';
                    completeSessionHtml += '<div class="ssn_list_lt"><span class="drkgray_txt26 ssn_list_font1">Session:</span></div>';
                    completeSessionHtml += '<div class="ssn_list_rt"><span class="gray_txt26 ssn_list_font2">'+d[item]['name']+'</span></div>';
                    completeSessionHtml += '<div class="clearboth"></div>';
                    completeSessionHtml += '</div>';
                    completeSessionHtml += '<div class="ssn_list_row"><div class="ssn_list_lt">';
                    completeSessionHtml += '<span class="drkgray_txt26 ssn_list_font1">To:</span></div><div class="ssn_list_rt">';
                    completeSessionHtml += '<span class="gray_txt26 ssn_list_font2">'+d[item]['destination']+'</span>';
                    completeSessionHtml += '</div><div class="clearboth"></div></div><div class="ssn_list_row"><div class="ssn_list_lt">';
                    completeSessionHtml += '<span class="drkgray_txt26 ssn_list_font1">Date:</span></div><div class="ssn_list_rt">';
                    completeSessionHtml += '<span class="gray_txt26 ssn_list_font2">'+sessionDate+'</span></div><div class="clearboth"></div></div>';
                    completeSessionHtml += '<div class="ssn_list_row"><div class="ssn_list_lt"><span class="drkgray_txt26 ssn_list_font1">Cost per seat:</span>';
                    completeSessionHtml += '</div><div class="ssn_list_rt"><span class="gray_txt26 ssn_list_font2">$'+d[item]['seatCost']+'</span></div><div class="clearboth"></div></div>';
                    completeSessionHtml += '<div class="ssn_list_row"><div class="ssn_list_lt">';
                    completeSessionHtml += '<span class="drkgray_txt26 ssn_list_font1">Status:</span></div><div class="ssn_list_rt">';
                    completeSessionHtml += '<span class="gray_txt26 ssn_list_font2 ssn_list_blue_txt">'+bookingStatus[d[item]['sessionStatusId']]+'</span></div><div class="clearboth"></div></div>';
                    completeSessionHtml += '</td><td class="gt-link-holder"></td>';
                    completeSessionHtml += '</tr></tbody></table></a>';
                    completeSessionHtml += '<div class="ssn_list_btn">';

                    // multiple conditions over here, based on sessionStatusId, buttons changes
                    var ssid = d[item]['sessionStatusId'];

                    switch(ssid){
                        case 1:
                            completeSessionHtml += '<a class="cancel-session-link" id="session-cancel-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Cancel</button></a>';
                            break;
                        case 2:
                            completeSessionHtml += '<a class="cancel-session-link" id="session-cancel-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Cancel</button></a>';
                            break;
                        case 3:
                            completeSessionHtml += '<a class="cancel-session-link" id="session-cancel-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Cancel</button></a>';
                            break;
                        case 4:
                            completeSessionHtml += '';
                            break;
                        case 5:
                            completeSessionHtml += '<a class="remove-session-link" id="session-remove-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Remove</button></a><a class="complete-session-link" id="session-complete-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Complete</button></a>';
                            break;
                        case 6:
                            completeSessionHtml += '<a class="publish-session-link" id="session-publish-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Publish</button></a><a class="edit-session-link" id="session-edit-btn" data-session-id="'+d[item]['id']+'"><button class="main_btn btn btn_gap">Edit</button></a>';
                            break;
                        case 7:
                            completeSessionHtml += '';
                            break;
                        case 8:
                            completeSessionHtml += '';
                            break;
                    }
                    completeSessionHtml += '</div>'; // end of ssn_list_btn
                    completeSessionHtml += '</div>'; // end of a single session element

                }
                // console.log('this is html');
                // console.log(completeSessionHtml);

                $('#session-page-all-listing').html(completeSessionHtml);

            }else{
                $('#session-page-all-listing').html("<span style='float:left!important;font:14px AvenirLTStdLight;'>You don't have any sessions yet.</span><div class='v-spacer'></div>");
            }

        },
        error: function(error){
            console.log(error);
        }
    });
}

function getDriverProfile(id){
    console.log("inside get driver profile id");
   $.ajax({
        url: secureHost + "UserProfiles/"+id+"?access_token="+app.userData.id,
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (d) {
                console.log(d);
                $('#driver-name').text(d['fname']+" "+d['lname']);
                $('.driver-photo-holder').css({'background-image':'url('+d['avatar']+')'});
                $('#driver-bio').text(d['bio']);
                var genderurl="http://web.boardlift.com/assets/images/mobile-images/gender-"+ d['gender'] + ".png";
                $('#driver-gender img').attr('src',genderurl);
                getUserFavouriteSpot($('#ride-driver-details').attr('data-driver-id'));
              
        },
        error: function(data){
          console.log("Cannot get data");
        }
    });
}

function getUserFavouriteSpot(id){

    console.log("inside get user favorite spot:");
    var locQuery = '{"where":{"userProfileId":"'+id+'"}}';
        $.ajax({
        url: secureHost + "UserFavorites?filter=" + locQuery + "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            $("#driver-favorite-spot").text(d[0]['favoriteDetail']);
            userMusicNSmokePref($('#ride-driver-details').attr('data-driver-id'));
        },
        error: function(error){
            console.log(error);
        }
    });
}

function userMusicNSmokePref(id){
    console.log("inside music preference function");
    $.ajax({
        url: secureHost + "UserProfiles/" + id + "/userPreferences?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            var smoking = "",
                allMusic = [];
            for(var item in d){
                if(d[item]['preferenceTypeId'] == 2){
                    smoking = d[item]['value'];
                }else if(d[item]['preferenceTypeId'] == 1){
                    if(allMusic.indexOf(d[item]['value']) == -1){
                        allMusic.push(d[item]['value']);
                    }
                }
            }

            $('#driver-music-preference').text(allMusic.toString());

            var imagePath = "";
            if(smoking == "non-smoking"){
                imagePath = "";
            }else{
                imagePath = "http://web.boardlift.com/assets/images/smoking-dontmind.png";
            }
            $('#driver-smoke-preference').attr('src', imagePath);
            getDriverBoardSkills($('#ride-driver-details').attr('data-driver-id'));
        },
        error: function(error){
            console.log(error);
        }
    });
}

function getDriverBoardSkills(id){
    console.log("inside board skills function");
        $.ajax({
        url: secureHost + "UserProfiles/" + id + "/boardSkills?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            var boardRatings="";
            
                    for(var item in d){
                        var boardimage=boardSkillTypes[d[item]['boardTypeId']];
                        boardimage=boardimage.replace(" ","%20");
                     boardRatings +='<ul class="board-matrix-head" id="board-skill-ratings"><li class="boardtype lightfont"><img src=http://web.boardlift.com/assets/images/boards/'+boardimage+'.jpg><br>'+boardSkillTypes[d[item]['boardTypeId']]+'</li>';
                    boardRatings +='<li class="boardrate"><img src=http://web.boardlift.com/assets/images/mobile_skill_rate_'+d[item]['skillRate']+'.png></li><div class="v-spacer"></div></ul>';
                      }
                      console.log(boardRatings);
                      $(".sesn-board-rating").after(boardRatings);

        },
        error: function(error){
            console.log(error);
        }
    });
}


// to show when listing a session
function getUserBoardSkills(id){
    console.log("inside board skills function");
        $.ajax({
        url: secureHost + "UserProfiles/" + id + "/boardSkills?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            var boardRatings="";
            
                    for(var item in d){
                        var boardimage=boardSkillTypes[d[item]['boardTypeId']];
                        boardimage=boardimage.replace(" ","%20");
                        boardRatings += '<div class="board_rtng_row"><div class="board_rtng_col1">';
                        boardRatings += '<div class="board_img2"><img src="http://web.boardlift.com/assets/images/boards/'+boardimage+'.jpg" alt=""></div></div>';
                        boardRatings += '<div class="board_rtng_col2"><div class="rating_star"><img src="http://web.boardlift.com/assets/images/mobile_skill_rate_'+d[item]['skillRate']+'.png" class="list_star_gap" alt=""></div></div>';
                        boardRatings += '<div class="board_rtng_col3"><div class="radio txt_center"><input  data-role="none" id="board_skill_mask_'+boardSkillTypes[d[item]['boardTypeId']]+'" type="checkbox" class="checkbox board-skill-session" name="skills[]" value="'+d[item]['boardTypeId']+'"><label for="board_skill_mask_'+boardSkillTypes[d[item]['boardTypeId']]+'"><span></span></label></div></div><div class="clearboth"></div></div>';
                      }
                      console.log(boardRatings);
                      $(".board_rtng_box").append(boardRatings);

        },
        error: function(error){
            console.log(error);
        }
    });
}
// get location info, arg is object
function getLocationInfo(args){
// console.log("inside get location info");
    for(var item in args){

        // make query
        var locQuery = '{"where":{"fullDestination":"'+args[item]+'"}}';
        console.log(locQuery);

        $.ajax({
            url: secureHost + "SurfSpots?filter=" + locQuery + "&access_token=" + app.curAccessToken,
            type: 'GET',
            dataType: "json",
            contentType: 'application/json',
            processData: false,
            success: function(d){
                console.log(d);
                getLocationImageUI(d[0]['surfSpotPhoto'], item);
            },
            error: function(error){
                console.log(error);
            }
        });

    }

}

function getUserProfile(){
    console.log('getUserProfile');
    $.ajax({
        url: secureHost + "UserProfiles/" + app.curUserId + "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            console.log('getUserProfile success');
            console.log(d);
        },
        error: function(error){
            console.log(error);
        }
    });

}

// get location images and update ui
function getLocationImageUI(id, where){
// console.log("inside get location image: " + id + "-----" + where);
    $.ajax({
        url: secureHost + "SurfSpotPhotos/" + id + "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            // d['link'] is image
            var finalImage = "https://boardlift-staging.s3-ap-southeast-2.amazonaws.com/destinations/" + d['surfSpotId'] + "/" + d['link'];
            // console.log("final image: "+finalImage);
            // console.log($('[data-unique-session-id="'+where+'"]').attr('src'));
            $('[data-unique-session-id="'+where+'"]').attr('src', finalImage);
        },
        error: function(error){
            console.log(error);
        }
    });
}
/*
//get messages thread chat
function getSingleMessage(){
//{where:{and :[{or:[{and:[{sender:44},{recipient:11}]},{and:[{sender:11},{recipient:44},{accepted:1}]}]},{sessionId:68}]},order:messageDate DESC,include:[{relation:senderProfile},{relation:2recipientProfile}]}
    var messageQuery = '{"where":{"fullDestination":"'+args[item]+'"}}';
var messageQuery = '{where:{and :[{or:[{and:[{sender:'+app.curUserId+'},{recipient:11}]},{and:[{sender:11},{recipient:44},{accepted:1}]}]},{sessionId:68}]},order:messageDate DESC,include:[{relation:senderProfile},{relation:2recipientProfile}]}';

    $.ajax({
        url: secureHost + "Messages?filter=" + id + "&access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            // d['link'] is image
            var finalImage = "https://boardlift-staging.s3-ap-southeast-2.amazonaws.com/destinations/" + d['surfSpotId'] + "/" + d['link'];
            // console.log("final image: "+finalImage);
            // console.log($('[data-unique-session-id="'+where+'"]').attr('src'));
            $('[data-unique-session-id="'+where+'"]').attr('src', finalImage);
        },
        error: function(error){
            console.log(error);
        }
    });
}
*/

// to show custom confirm popups
function showConfirm(message, callback, buttonLabels, title){
    // set default
    buttonLabels = buttonLabels || 'Ok,Cancel';

    title = title || "default title";

    if(navigator.notification && navigator.notification.confirm){

        var _callback = function(index){
            if(callback){
                callback(index == 1);
            }
        };

        navigator.notification.confirm(
            message,
            _callback,
            title,
            buttonLabels
        );

    }else{
        invoke(callback, confirm(message));
    }

}

// eg. usage for showConfirm function
/*
var message = "Would you like to proceed?";
var title = "Important Question";
var buttonLabels = "Yes,No";

var callback = function(yes){
    if(yes){
        console.log('yes by user');
    }else{
        console.log('no by user');
    }
};

showConfirm(message, callback, buttonLabels, title);

*/

// cancel a user session
var cancelUserSingleSession = function(yes){
    if(yes){
        // means user clicked on no thanks
        
    }else{
        // means user clicked on yes
        // get data for this session and then send call to cancel it
        getDataForSingleSession(app.currentCancelSessionId, "cancel");
    }
};

// publish a user session
var publishUserSingleSession = function(yes){
    if(yes){
        // means user clicked on no thanks

    }else{
        // means user clicked on yes
        // get data for this session and send call for publishing it
        getDataForSingleSession(app.currentPublishSessionId, "publish");
    }
};

// single function that takes data and either cancels the session or published it
function cancelOrPublishSession(type){
    console.log('call got here: ' + type);
    var message = "";
    if(type == "cancel"){
        storingSingleSessionData['sessionStatusId'] = 7;
        message = "The session has been cancelled.";
    }else{
        storingSingleSessionData['sessionStatusId'] = 2;
        console.log("The session has been submitted for publishing.");
    }

    console.log(storingSingleSessionData);
    console.log(typeof(storingSingleSessionData));
    
    var query = JSON.stringify(storingSingleSessionData);

    $.ajax({
        url: secureHost + "Sessions",
        beforeSend: function(request){
            request.setRequestHeader('access_token', app.curAccessToken);
        },
        type: 'PUT',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify(query),
        success: function(d){
            console.log(d);
            $('.success_message').text(message);
            // all-sessions-page
            getAllSessionsForUser();
        },
        error: function(error){
            console.log(error);
        }
    });
}

// update edit session page to put all the set values in their fields
function updateEditSessionPage(){
    console.log('updating edit session page now.....');
    
    console.log(storingSingleSessionData);

    $("#name").val(storingSingleSessionData['name']);
    
    // update date and time
    // var tsd = storingSingleSessionData['travelStartDate'];
    // tsd = new Date(Date.parse(tsd));
    // $("#startDate").val();
    // $("#travelStartTime").val();
    // ("#travelEndTime").val();
    
    // $("#destination").val(storingSingleSessionData['destination']);
    $("#destinationLatitude").val(storingSingleSessionData['destinationLatitude']);
    $("#destinationLongitude").val(storingSingleSessionData['destinationLongitude']);
    $("#origin").val(storingSingleSessionData['origin']);
    $("#originLatitude").val(storingSingleSessionData['originLatitude']);
    $("#originLongitude").val(storingSingleSessionData['originLongitude']);
    //$('input[name=pickupTypeId]:checked').val();
    // $("#pickupLocation").val();
    $("#seatCost").val(storingSingleSessionData['seatCost']);
    $("#numSeats").val(storingSingleSessionData['numSeats']);

    // updating region and destination
    var fullOrigin = storingSingleSessionData['origin'];
    fullOrigin = fullOrigin.split(',');
    $('#region').val(fullOrigin[1].trim());
    $('#destination').val(fullOrigin[2].trim());
}

/* this function stores a single session data in a global variable, useful for edit page, probably for publish and cancel session too
*/

function getDataForSingleSession(id, call_from){
    $.ajax({
        url: secureHost + "Sessions/" + parseInt(id) + "?access_token=" + app.curAccessToken,
        type: 'GET',
        dataType: "json",
        contentType: 'application/json',
        processData: false,
        success: function(d){
            // console.log('output from getDataForSingleSession');
            // console.log(d);
            storingSingleSessionData = d;
            if(call_from == "edit"){
                updateEditSessionPage();
            }else if(call_from == "cancel"){
                cancelOrPublishSession("cancel");
            }else if(call_from == "publish"){
                cancelOrPublishSession("publish");
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

