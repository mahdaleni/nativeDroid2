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

		window.requestFileSystem(this.filetype, this.quota, successCallback, errorCallback)

		function successCallback(fs) {
			fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
				alert('File creation successfull!')
			}, errorCallback);
		}

		function errorCallback(error) {
			alert("ERROR: " + error.code)
		}

	}


	this.writefile = function () {

		window.requestFileSystem(this.filetype, this.quota, successCallback, errorCallback)

		function successCallback(fs) {

			fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

				fileEntry.createWriter(function(fileWriter) {
					fileWriter.onwriteend = function(e) {
						alert('Write completed.');
					};

					fileWriter.onerror = function(e) {
						alert('Write failed: ' + e.toString());
					};

					var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
					fileWriter.write(blob);
				}, errorCallback);

			}, errorCallback);

		}

		function errorCallback(error) {
			alert("ERROR: " + error.code)
		}

	}


	this.readfile = function () {

		window.requestFileSystem(this.filetype, this.quota, successCallback, errorCallback)

		function successCallback(fs) {

			fs.root.getFile('log.txt', {}, function(fileEntry) {

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
			alert("ERROR: " + error.code)
		}

	}


	this.removefile = function () {

		window.requestFileSystem(this.filetype, this.quota, successCallback, errorCallback)

		function successCallback(fs) {
			fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

				fileEntry.remove(function() {
					alert('File removed.');
				}, errorCallback);

			}, errorCallback);
		}

		function errorCallback(error) {
			alert("ERROR: " + error.code)
		}

	}
}

