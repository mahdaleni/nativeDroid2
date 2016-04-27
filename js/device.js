/**
 * Device management
 *
 */
function Device(filename){

	this.filetype = window.PERSISTENT;
	this.filename = filename;
	this.quota = 1024;

	this.alert = function(message, title, button_name) {

		navigator.notification.alert(message, alertcallback, title, button_name);

		function alertcallback() {
			console.log("Alert is Dismissed!");
		}
	}


	this.beep = function(times) {
		navigator.notification.beep(times);
	}


	this.createfile = function () {

		filename = this.filename;  // Get filename in the local scope
		window.requestFileSystem(this.filetype, this.quota, function(fs){successCallback(fs, filename)}, errorCallback)

		function successCallback(fs, filename) {
			fs.root.getFile(filename, {create: true, exclusive: true}, function(fileEntry) {
				console.log('File creation successfull!');
			}, errorCallback);
		}

		function errorCallback(error) {
			console.error("ERROR: " + error.message);
		}

	}


	this.writefile = function () {

		filename = this.filename;  // Get filename in the local scope
		window.requestFileSystem(this.filetype, this.quota, function(fs){successCallback(fs, filename)}, errorCallback)

		function successCallback(fs, filename) {

			fs.root.getFile(filename, {create: true}, function(fileEntry) {

				fileEntry.createWriter(function(fileWriter) {
					fileWriter.onwriteend = function(e) {
						console.log('Write completed.');
					};

					fileWriter.onerror = function(e) {
						console.log('Write failed: ' + e.toString());
					};

					var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
					fileWriter.write(blob);
				}, errorCallback);

			}, errorCallback);

		}

		function errorCallback(error) {
			console.error("ERROR: " + error.message);
		}

	}


	this.readfile = function () {

		filename = this.filename;  // Get filename in the local scope
		window.requestFileSystem(this.filetype, this.quota, function(fs){successCallback(fs, filename)}, errorCallback)

		function successCallback(fs, filename) {

			fs.root.getFile(filename, {}, function(fileEntry) {

				fileEntry.file(function(file) {
					var reader = new FileReader();

					reader.onloadend = function(e) {
						var txtArea = document.getElementById('textarea');
						txtArea.value = this.result;
					};

					reader.readAsText(file);

				}, errorCallback);

			}, errorCallback);
		}

		function errorCallback(error) {
			console.error("ERROR: " + error.message);
		}

	}


	this.removefile = function () {

		filename = this.filename;  // Get filename in the local scope
		window.requestFileSystem(this.filetype, this.quota, function(fs){successCallback(fs, filename)}, errorCallback)

		function successCallback(fs, filename) {
			fs.root.getFile(filename, {create: false}, function(fileEntry) {

				fileEntry.remove(function() {
					console.log('File removed.');
				}, errorCallback);

			}, errorCallback);
		}

		function errorCallback(error) {
			console.error("ERROR: " + error.message);
		}

	}
}

