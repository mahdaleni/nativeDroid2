/**
 * Manage documentready event
 *
 */
$( document ).ready(function() {
	console.log( "Document ready !" );
	app.initialize();
	var attachFastClick = Origami.fastclick;
	attachFastClick(document.body);

	// Document stuff should go here
	$("#DateCountdown").TimeCircles({
		"animation": "smooth",
		"bg_width": 1.2,
		"fg_width": 0.1,
		"circle_bg_color": "#60686F",
		"time": {
			"Days": {
				"text": "Days",
				"color": "#FFCC66",
				"show": false
			},
			"Hours": {
				"text": "Hours",
				"color": "#99CCFF",
				"show": true
			},
			"Minutes": {
				"text": "Minutes",
				"color": "#BBFFBB",
				"show": true
			},
			"Seconds": {
				"text": "Seconds",
				"color": "#FF9999",
				"show": true
			}
		}
	});
});

/**
 * Manage deviceready event
 *
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
	onDeviceReady: function() {
		console.log( "Device ready !" );
		console.log(navigator.notification);

		var counting=true;
		$("#restart").click(function(){
			console.log("Restart clicked");
			timestamp();
			dialogAlert();
			//playBeep();
			//sncf();
			if (counting==true) {
				counting=false;
				$("#DateCountdown").TimeCircles().stop();
			}
			else{
				counting=true;
				$("#DateCountdown").TimeCircles().start();
			}
		});
	}
};

/**
 * Function
 *
 */
function timestamp() {
	var d = new Date();
	var year = d.getFullYear().toString();
	var month = d.getMonth() + 1;
	month = month.toString();
	var day = d.getDate().toString();
	var hour = d.getHours().toString();
	var minute = d.getMinutes().toString();
	var seconde = d.getSeconds();
	if (seconde < 10) {
		var zero = "0";
		seconde = zero.concat(seconde.toString());
	}
	var timestamp = year.concat("-", month, "-", day, " ", hour, ":", minute, ":", seconde);
	console.log(timestamp);
}

function sncf() {
	$.ajax({
    	beforeSend: function (xhr) {
	        xhr.setRequestHeader('Authorization', 'Basic ' + btoa('94492bd9-6d4c-4c2a-9287-4a4432165e4f'));
			},
        url: "https://api.sncf.com/v1/coverage/sncf/physical_modes",
        type: "GET",
	    //username: "94492bd9-6d4c-4c2a-9287-4a4432165e4f",
		crossDomain:true,
        success: function (response) {
            //var resp = JSON.parse(response)
            console.log(response);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function dialogAlert() {
   var message = "I am Alert Dialog!";
   var title = "ALERT";
   var buttonName = "Alert Button";

   navigator.notification.alert(message, alertCallback, title, buttonName);

   function alertCallback() {
      console.log("Alert is Dismissed!");
   }
}

function dialogBeep() {
   var times = 2;
   navigator.notification.beep(times);
}


