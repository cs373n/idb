var axios = require('axios');

var baseURL = "http://52.201.212.202/api/";

module.exports = { 

	getCharacters: function () {
	    var encodedURI = window.encodeURI(baseURL + "character");

		 return axios.get(encodedURI, {
		 	headers: {
		 		'Content-Type': 'application/json'
		 	}
		 }
		 	)
	    .then(function (response) {
	      	console.log("In getCharacters: " + response.data.objects);
      
   		return response.data.objects; // Return an array of creators
		}).catch(function (error) {
    		console.log(error);
  		});
	},

	getCharacter: function (id) {
	    var encodedURI = window.encodeURI(baseURL + "character/" + id);

		 return axios.get(encodedURI, {
		 	headers: {
		 		'Content-Type': 'application/json'
		 	}
		 }
		 	)
	    .then(function (response) {
	      	console.log(response.data);
   			return response.data; // Return an array of creators

		}).catch(function (error) {
    		console.log(error);
  		});
	}

 };
