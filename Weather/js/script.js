function InputCheck() {
	if ($('#input-city').val()=="") {
		
		alert('Enter the name of the city!');
	} 
	else {
		city = $("#input-city").val();
		GetCurrentWeather();	
	}
}

function ShiftBlock() {
	$(".h1current-weather").show();
	$("#current-weather").show();
	$(".scroll-top-input").show();
	$(".scroll-down-5Days").show();

	$(".h1Weather5Days").hide();
	$(".weather5Days").hide();
	$(".scroll-top-long").hide();

	$('body,html').animate({scrollTop: $('.current').offset().top }, 1000);
}

function ScrollTop() {
	$('body,html').animate({scrollTop: $('.row').offset().top }, 1000);
}

function ScrollDown() {
	GetWeather5Days();

	$(".h1Weather5Days").show();
	$(".weather5Days").show();
	$(".scroll-top-long").show();
	$(".scroll-current").show();
	$('body,html').animate({scrollTop: $('.weather5Days').offset().top }, 1000);
}

function ScrollTopCurrent() {
	$('body,html').animate({scrollTop: $('.current').offset().top }, 1000);
}


function GetCurrentWeather() {
	var myId = "8216a6dbd829018f449b2d2fb8fcbd86"
	var url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appId=" + myId;
	$.ajax({
		url: url,
		success: function(data) {
   			$("#city").text(data.name);
   			$("#cloudiness").text(data.clouds.all);
   			$("#temperature").text(parseInt(data.main.temp));
   			$("#humidity").text(data.main.humidity);
   			$("#wind").text(data.wind.speed);
   			$("#pressure").text(parseInt(data.main.pressure * 0.75)) ; 

   			ShiftBlock();
		},
		error: function(jqxhr, status, errorMsg) {
			alert('Invalid city name!');
		}
	});
}

function GetWeather5Days() {
	var myId = "8216a6dbd829018f449b2d2fb8fcbd86";
	var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&lang=ru&appId=" + myId;
	$.ajax({
		url: url,
		success: function(data) {
   			var temp = 0;
			for (var count = 0; count <= 4; count++) {
				temp = count * 8;
				$("#date" + count).text(data.list[temp].dt_txt);
				$("#cloudiness" + count).text(data.list[temp].clouds.all);
				$("#temperature" + count).text(parseInt(data.list[temp].main.temp));
				$("#humidity" + count).text(data.list[temp].main.humidity); 	
				$("#wind" + count).text(data.list[temp].wind.speed); 	
				$("#pressure" + count).text(parseInt(data.list[temp].main.pressure * 0.75)); 
			}	
		},
		error: function(jqxhr, status, errorMsg) {
			alert('Invalid city name!');
		}
	});
}

$(document).ready(function() {
      $("#my-form").keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
          InputCheck();
      }
   });
});