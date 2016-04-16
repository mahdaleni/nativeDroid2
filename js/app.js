

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

		sncf = new Sncfapi();

		// Autocomplete field
		$( "#station_start" ).autocomplete({
			source: function(request, response){
				sncf.findStation(request.term, response);
			},
			minLength:3,
			select: function(event, ui) {
    		    event.preventDefault();
        		$("#station_start").val(ui.item.label);
        		$("#station_start").val(ui.item.label);
				hideKeyboard();
    		},
    		focus: function(event, ui) {
        		event.preventDefault();
        		$("#station_start").val(ui.item.label);
    		},
		});

		// Button click
		var counting=true;
		$("#restart").click(function(){
			console.log("Restart clicked");
			timestamp();
			//dialogAlert();
			//playBeep();
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

function hideKeyboard() {
  //this set timeout needed for case when hideKeyborad
  //is called inside of 'onfocus' event handler
  setTimeout(function() {

    //creating temp field
    var field = document.createElement('input');
    field.setAttribute('type', 'text');
    //hiding temp field from peoples eyes
    //-webkit-user-modify is nessesary for Android 4.x
    field.setAttribute('style', 'position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;');
    document.body.appendChild(field);

    //adding onfocus event handler for out temp field
    field.onfocus = function(){
      //this timeout of 200ms is nessasary for Android 2.3.x
      setTimeout(function() {

        field.setAttribute('style', 'display:none;');
        setTimeout(function() {
          document.body.removeChild(field);
          document.body.focus();
        }, 14);

      }, 200);
    };
    //focusing it
    field.focus();

  }, 50);
}
