/* Helper for sncf api
 *
 *
 *
 */

function Sncfapi(){
	/* Object to manage sncf api */
	this.apikey = "94492bd9-6d4c-4c2a-9287-4a4432165e4f";
	this.endpoint = new URI("https://api.sncf.com/v1/coverage/sncf");

	this.ajax = function(url, ffilter, callback){
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
				ffilter(response, callback);
			},
			error: function (xhr, status, ajaxerror) {
				console.log(status);
				console.log(ajaxerror);
				throw status + " connecting to " + url;
			}
		});
	}

	this.findStation = function(place, callback){
		// Find the place specified
		var url = this.endpoint;
		url.segment("places");
		url.addSearch({q: place, type: "stop_area"});
		this.ajax(url, this.filter_places, callback);
	}

	this.filter_places = function(response, callback) {
		var station = [];
		//console.log(response.places);
		if (response.places.length > 0){
			response.places.forEach(function(item){
				//console.log(item);
				//if(item.embedded_type == "stop_area"){
					station.push({label: item.name, value: item.id});
				//}
			});
		}
		console.log(station);
		callback(station);
	}
}
