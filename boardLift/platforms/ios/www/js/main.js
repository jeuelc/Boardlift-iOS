$(document).on('appIsReady', function(){
    console.log('so this file runs');
    $("#clear_slideup_date").on("click", function() {
        $("#search_departureDate").val("");
        $("#clear_slideup_date").css("visibility", "hidden");
    });
    
    var maybePreventPullToRefresh = false;
    var lastTouchY = 0;
    var touchstartHandler = function(e) {
        if (e.touches.length != 1) return;
        lastTouchY = e.touches[0].clientY;
        if(window.pageYOffset == 0) maybePreventPullToRefresh = true;
    }
    
    var touchmoveHandler = function(e) {
        var touchY = e.touches[0].clientY;
        var touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;

        if (maybePreventPullToRefresh) {
          // To suppress pull-to-refresh it is sufficient to preventDefault the
          // first overscrolling touchmove.
          maybePreventPullToRefresh = false;
          if (touchYDelta > 0) {
            e.preventDefault();
            return;
          }
        }
    }
    
    document.addEventListener('touchstart', touchstartHandler, false);
    document.addEventListener('touchmove', touchmoveHandler, false);

    function search_slide_up() {
        $(".footer_srch").on("click", function(e){
            e.preventDefault();
            var windowWindth = $(window).width()+'px';
            $("#filter_search").css("display", "block");
            $('#login').animate({'top':'100%'},"500");
            $('#signup').animate({'top':'100%'},"500");
            $('#howworks').animate({'height':'0'},"500");
            $('#howworks').css("overflow","hidden");
            $('#howworks').css("padding-bottom","0");
            $('#signup').css("position","fixed");
            $('#login').css("position","fixed");
            $('body').css("overflow", "auto");
            $('#slide_menu').animate({left:'100%'},"300");
            $("#search-filter-options").animate({top:'100%'}, 300, function() {
                $(".submit-filter-holder").hide();
            });
            $("#filter_search").animate({'top':'0%'}, 500, function() {
                $(".filtr_srchBtn").css("display", "block");
            });
        });
        $(".close_srch_popup").on("click", function(e){
            e.preventDefault();
            $("#filter_search").animate({'top':'100%'}, 500, function() {
                $("#filter_search").css("display", "none");
                $(".filtr_srchBtn").css("display", "none");
            });
        });
    }

    search_slide_up();

    function bottom_right_menu() {
        $('.footer_menu').on('click', function(e){
            var windowWindth = $(window).width()+'px';
            $('.main_container').css("display", "inline");
            if($('#slide_menu').css('left') == windowWindth){
                $('#login').animate({'top':'100%'},"500");
                $('#privacy-policy-container').animate({'top':'100%'},"500");
                $('#signup').animate({'top':'100%'},"500");
                $('#howworks').animate({'height':'0'},"500");
                $('#howworks').css("padding-bottom","0");
                $('#signup').css("position","fixed");
                $('#login').css("position","fixed");
                $('body').css("overflow", "auto");
                $("#filter_search").animate({'top':'100%'}, 500, function() {
                    $("#filter_search").css("display", "none");
                    $(".filtr_srchBtn").css("display", "none");
                });
                $("#search-filter-options").animate({top:'100%'}, 300, function() {
                    $(".submit-filter-holder").hide();
                });
                
                $('#toc-container').animate({'top':'100%'},"500");
                $('#toc-container').css("position","fixed");
                
                $('#key-risk-container').animate({'top':'100%'},"500");
                $('#key-risk-container').css("position","fixed");
                
                $('#slide_menu').animate({left:'30%'},"300");

            }else{
                $('#signup').animate({'top':'100%'},"500");
                $('#slide_menu').animate({left:'100%'},"300");
            }
        });
        $('.footer_menu_loggedin').on('click', function(e){
            console.log('just clicked on loggedin footer');
            var windowWindth = $(window).width()+'px';
            $('.main_container').css("display", "inline");
            if($('#slide_menu').css('left') == windowWindth){
                getNotifications();
                $('#howworks').animate({'height':'0'},"500");
                $('#howworks').css("padding-bottom","0");
                $('body').css("overflow", "auto");
                $('#share').animate({'top':'100%'},"500");
                $("#filter_search").animate({'top':'100%'}, 500, function() {
                    $("#filter_search").css("display", "none");
                    $(".filtr_srchBtn").css("display", "none");
                });
                $("#search-filter-options").animate({top:'100%'}, 300, function() {
                    $(".submit-filter-holder").hide();
                });
                $('#toc-container').animate({'top':'100%'},"500");
                $('#toc-container').css("position","fixed");
                
                $('#key-risk-container').animate({'top':'100%'},"500");
                $('#key-risk-container').css("position","fixed");
                
                $('#slide_menu').animate({left:'30%'},"300");

            }else{
                $('#slide_menu').animate({left:windowWindth},"300");
            }
        });
    }

    bottom_right_menu();

    function top_shows(){
        $('#login-session,#login-from-signup, .msg-login-link').on('click', function(){
            window.scrollTo(0,0);
            $('#login').css("position", "fixed");
            $('#login').animate({'top':0},"500");
            $('#signup').css("position", "fixed");
            $('#signup').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
            $('body').css("overflow", "hidden");
            $('.main_container').css("display", "none");
            return false;
        });
        $('.login_mb_close1').on('click', function(){
            $('#login').css("position", "fixed");
            $('#login').animate({'top':'100%'},"500");
            $('body').css("overflow", "auto");
            $('.main_container').css("display", "inline");
        });
        $('.signup-link').on('click', function(){
            window.scrollTo(0,0);
            generateCaptchaImage();
            $('#signup').css("position", "fixed");
            $('#signup').animate({'top':0},"500");
            $('#login').css("position", "fixed");
            $('#login').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
            $('body').css("overflow", "hidden");
            $('.main_container').css("display", "none");
            return false;
        });
        $('#sighnup-fb').on('click', function(){
            window.scrollTo(0,0);
            generateCaptchaImage();
            $('#signup').css("position", "fixed");
            $('#signup').animate({'top':0},"500");
            $('#login').css("position", "fixed");
            $('#login').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
            $('body').css("overflow", "hidden");
            $('.main_container').css("display", "none");
            return false;
        });
        
        $('#menu-login').on('click', function(){
            window.scrollTo(0,0);
            $('#login').css("position", "fixed");
            $('#login').animate({'top':0},"500");
            $('#signup').css("position", "fixed");
            $('#signup').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
            $('body').css("overflow", "hidden");
            $('.main_container').css("display", "none");
            return false;
        });
        $('.login_mb_close2').on('click', function(){
            $('#signup').css("position", "fixed");
            $('#signup').animate({'top':'100%'},"500");
            $('body').css("overflow", "auto");
            $('.main_container').css("display", "inline");
        });
        $('#hows').on('click', function(){
            $('#howworks').animate({'height':"100%"},"500");
            $('#howworks').css("overflow-y", "auto");
            $('#howworks').css("position", "fixed");
            $('#howworks').css("padding-bottom","55px");
            $('#slide_menu').animate({left:'100%'},"300");
            $('body').css("overflow", "hidden");
            $('.main_container').css("display", "none");
            return false;
        });
        $('.how_close').on('click', function(){
            $("#active-close-how").show();
            $("#inactive-close-how").hide();
            $('#howworks').animate({'height':'0'},"500", function(e) {
                $("#active-close-how").hide();
                $("#inactive-close-how").show();
            });
            $('#howworks').css("padding-bottom","0");
           $('body').css("overflow", "auto");
            $('.main_container').css("display", "inline");
        });
        $(".privacy-policy-link").click(function() {
            $("#privacy-policy-container").animate({'top':0},"500");
            $('#signup').animate({'top':'100%'},"500");
        });
        $(".privacy-policy-close").click(function() {
            $("#privacy-policy-container").animate({'top':'100%'},"500");
            $('body').css("overflow", "auto");
            $('.main_container').css("display", "inline");
        });
        
        $(".toc-link").click(function() {
            $("#toc-container").animate({'top':0},"500");
            $('#signup').animate({'top':'100%'},"500");
        });
        $(".toc-close").click(function() {
            $("#toc-container").animate({'top':'100%'},"500");
            $('body').css("overflow", "auto");
            $('.main_container').css("display", "inline");
        });
    }

    top_shows();

    function search_calender(){
                $('#search_departureDate').datetimepicker({
                                format: 'Y-m-d',
                                minDate: 0,
                                timepicker: false,
                                closeOnDateSelect: true,
                                scrollMonth: false,
                                onChangeDateTime: function() {
                                    $("#rideBtn").removeAttr('disabled');
                                }
                            });
                
                            $("#search_departureDate").keydown(function(e) {
                                e.preventDefault();
                });        
    }

    search_calender();

});
