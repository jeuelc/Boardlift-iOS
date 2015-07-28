$('document').ready(function(){
    if($(window).width() < 769){
        top_shows()//click functionality of how it works; login ; sighn up
        bottom_right_menu();//home page right to left slide menu
        search_calender();// search calender binded
        search_slide_up();//search slide up and down on home page
		prev_next_div();//next and previous click functionality of list session page
		message_replay();//show hide and arrow change on replay click of message replay page
    }
});
function search_slide_up() {
    $(".footer_srch").on("click", function(e){
        e.preventDefault();
        var windowWindth = $(window).width()+'px';
        $("#filter_search").css("display", "block");
        $('#login').animate({'top':'100%'},"500");
        $('#signup').animate({'top':'100%'},"500");
        $('#howworks').animate({'top':'100%'},"500");
        $('#slide_menu').animate({left:'100%'},"300");
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

function bottom_right_menu(){
    $('.footer_menu').on('click', function(e){
        console.log('footer_menu Click');
        var windowWindth = $(window).width()+'px';

        if($('#slide_menu').css('left') == windowWindth){
        console.log('if footer_menu Click');
            $('#login').animate({'top':'100%'},"500");
            $('#signup').animate({'top':'100%'},"500");
            $('#howworks').animate({'top':'100%'},"500");
            $("#filter_search").animate({'top':'100%'}, 500, function() {
                $("#filter_search").css("display", "none");
                $(".filtr_srchBtn").css("display", "none");
            });
            $('#slide_menu').animate({left:'30%'},"300");

        }else{
        console.log('else footer_menu Click');
            $('#signup').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        }
    });
    $('.footer_menu_loggedin').on('click', function(e){
        var windowWindth = $(window).width()+'px';

        if($('#slide_menu').css('left') == windowWindth){
            $('#howworks').animate({'top':'100%'},"500");
            $('#share').animate({'top':'100%'},"500");
            $("#filter_search").animate({'top':'100%'}, 500, function() {
                $("#filter_search").css("display", "none");
                $(".filtr_srchBtn").css("display", "none");
            });
            $('#slide_menu').animate({left:'30%'},"300");

        }else{
            $('#howworks').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:windowWindth},"300");
        }
    });
}
function top_shows(){
    $('#login-session,#invite').on('click', function(){
        $('#login').animate({'top':0},"500");
        $('#signup').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        return false;
    });
    $('.login_mb_close1').on('click', function(){
        $('#login').animate({'top':'100%'},"500");
    });
    $('#sighnup-fb').on('click', function(){
        $('#signup').animate({'top':0},"500");
            $('#login').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        return false;
    });
    $('#share-fb').on('click', function(){
        $('#share').animate({'top':0},"500");
            $('#login').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        return false;
    });
    $('#share-friends').on('click', function(){
        $('#share').animate({'top':0},"500");
            $('#login').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        return false;
    });
    $('.share_close').on('click', function(){
        $('#share').animate({'top':'100%'},"500");
    });
    $('#menu-login').on('click', function(){
        $('#login').animate({'top':0},"500");
        $('#signup').animate({'top':'100%'},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        return false;
    });
    $('.login_mb_close2').on('click', function(){
        $('#signup').animate({'top':'100%'},"500");
    });
    $('#hows').on('click', function(){
        $('#howworks').animate({'top':0},"500");
            $('#slide_menu').animate({left:'100%'},"300");
        return false;
    });
    $('.how_close').on('click', function(){
        $('#howworks').animate({'top':'100%'},"500");
    });
}
function search_calender(){
            $('#search_departureDate, #search_departureDate2').datetimepicker({
                            format: 'Y-m-d',
                            minDate: 0,
                            timepicker: false,
                            closeOnDateSelect: true,
                            scrollMonth: false,
                            onChangeDateTime: function() {
                                $("#rideBtn").removeAttr('disabled');
                            }
                        });
            
                        $("#search_departureDate, #search_departureDate2").keydown(function(e) {
                            e.preventDefault();
            });        
}
//list my session prev,next btn javascript
function prev_next_div(){
	var $this;
$('#next').on('click', function(){
	$('.list_ssn_wrap .list_ssn_content').map(function(){
		if($(this).is(':visible')){
			$this = $(this);
		}
		});
	if($this.next().length > 0){
		$('#prev').css('visibility','visible');
		$this.hide();
		$this.next().show();
		if($this.next().next().length == 0){
			$(this).hide();
		$('#list_ssn').show();
		}
	}
	});
	$('#prev').on('click', function(){
		$('.list_ssn_wrap .list_ssn_content').map(function(){
		if($(this).is(':visible')){
			$this = $(this);
		}
		});
	if($this.prev().length > 0){
		$('#list_ssn').hide();
		$('#next').show();
		$this.hide();
		$this.prev().show();
		if($this.prev().prev().length == 0){
			$(this).css('visibility','hidden');
		}
	}else{
		$(this).hide();
	}
	});	
};

function message_replay(){
	$('#reply_div').hide();
$( "#reply" ).click(function() {
  $( "#reply_div" ).slideToggle( "slow" );
  if($(this).children('span').hasClass('reply_arrowleft'))
  {
	  $(this).children('span').removeClass('reply_arrowleft');
	  $(this).children('span').addClass('reply_arrowdown');
  }else{
	  $(this).children('span').addClass('reply_arrowleft');
	  $(this).children('span').removeClass('reply_arrowdown');
  }
});	
}

