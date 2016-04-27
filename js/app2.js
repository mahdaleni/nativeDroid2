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
	$("#DateCountdown").attr("data-date", timestamp());
	inittc();
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
				sncf.station_start = ui.item.value;
    		},
    		focus: function(event, ui) {
        		event.preventDefault();
        		$("#station_start").val(ui.item.label);
    		},
		});

		// Button restart clicked
		var counting = true;
		var duration;
		$("#restart").click(function(){
			console.log("Restart clicked");
			$("#DateCountdown").attr("data-date", timestamp());
			$("#DateCountdown").data("date", timestamp());
			$("#DateCountdown").TimeCircles().start();
			$("#save").attr("class", "ui-btn ui-btn-raised clr-warning");
			counting = true;
		});

		// Button saved clicked
		$("#save").click(function(){
			console.log("Save clicked");
			$("#DateCountdown").TimeCircles().stop();
			duration = $("#DateCountdown").TimeCircles().getTime();
			duration = Math.abs(duration * 1000);
			console.log("Duration: " + duration);
			$("#save").attr("class", "ui-btn ui-btn-raised ui-disabled");
			counting = false;
		});

		// Button beep clicked
		$("#beep").click(function(){
			device = new Device("log.txt");
			device.beep(1);
		});

		// Button alert clicked
		$("#alert").click(function(){
			device = new Device("log.txt");
			device.alert("Alert msg", "ALERT !!!", "Close");
		});

		// Button create clicked
		$("#create").click(function(){
			device = new Device("log.txt");
			device.createfile();
		});

		// Button write clicked
		$("#write").click(function(){
			device = new Device("log.txt");
			device.writefile("Blablabla !!!");
		});

		// Button read clicked
		$("#read").click(function(){
			device = new Device("log.txt");
			device.readfile();
			$("#blabla").html("Coucou");
		});

		// Button delete clicked
		$("#delete").click(function(){
			device = new Device("log.txt");
			device.removefile();
		});
	}
};


/**
 * Functions
 *
 */
function inittc(){
	// Init time circle
	$("#DateCountdown").TimeCircles({
		"start":true,
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
}


function timestamp() {
	var d = new Date();
	var year = d.getFullYear().toString();
	var month = d.getMonth() + 1;
	month = month.toString();
	var day = d.getDate().toString();
	var hour = d.getHours().toString();
	var minute = d.getMinutes().toString();
	if (minute < 10) {
		var zero = "0";
		minute = zero.concat(minute.toString());
	}
	var seconde = d.getSeconds();
	if (seconde < 10) {
		var zero = "0";
		seconde = zero.concat(seconde.toString());
	}
	var timestamp = year.concat("-", month, "-", day, " ", hour, ":", minute, ":", seconde);
	console.log(timestamp);
	return timestamp;
}


function hideKeyboard() {
  //this set timeout needed for case when hideKeyboard
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
