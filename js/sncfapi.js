/* Helper for sncf api
 *
 *
 *
 */

function Sncfapi(){
	/* Object to manage sncf api */
	this.apikey = "94492bd9-6d4c-4c2a-9287-4a4432165e4f";
	this.endpoint = new URI("https://api.sncf.com/v1/coverage/sncf");

	this.ajax = function(url, fcallback){
		// Build the base64 token
		var token = "Basic " + btoa(this.apikey);
		var response = $.ajax({
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', token);
			},
			url: url,
			type: "GET",
			crossDomain:true,
			success: function (response) {
				//console.log(response);
				fcallback(response);
			},
			error: function (xhr, status, ajaxerror) {
				console.log(status);
				console.log(ajaxerror);
				throw status + " connecting to " + url;
			}
		});
	}

	this.findStation = function(place, response){
		// Find the place specified
		var url = this.endpoint;
		url.segment("places");
		url.addSearch({q: place, type: "stop_area"});
		this.ajax(url, response);
	}

	this.filter_places = function(response) {
		var table = [];
		console.log(response.places);
		response.places.forEach(function(i){
			console.log(i);
			if(i.embedded_type == "stop_area"){
				table.push({label: i.name, value: i.id});
			}
		});
		console.log(table);
	}
}
