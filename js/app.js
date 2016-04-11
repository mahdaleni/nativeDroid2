$( document ).ready(function() {
	console.log( "ready!" );
	var counting=true;
	var attachFastClick = Origami.fastclick;
	attachFastClick(document.body);

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




	$("#restart").click(function(){
		console.log("Restart clicked");
		timestamp();
		sncf();
		if (counting==true) {
			counting=false;
			$("#DateCountdown").TimeCircles().stop();
		}
		else{
			counting=true;
			$("#DateCountdown").TimeCircles().start();
		}
	});
});

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
/*	$.get("https://94492bd9-6d4c-4c2a-9287-4a4432165e4f@api.sncf.com/v1/coverage/sncf/physical_modes", function( data  ) {
		  console.log(data);
	} );
*/
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
