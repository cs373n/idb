var axios = require('axios');

/*
var urlEndPoint = "http://gateway.marvel.com/v1/public/";
var ts = new Date().getTime();
var privateKey = "c0cca37e9e919d673f13d91eadaaa1c7c683c745"
var publicKey = "8097970cb5bc96d3dd151e9f983b76c8";
var md5 = require('md5');
var md5hash = md5(ts+privateKey+publicKey);

var ourURL = "http://52.201.212.202/api/character";

// Construct the required URL params
var params = "?ts=" + ts + "&apikey=" + publicKey + 
	"&hash=" + md5hash; */

var baseURL = "http://52.201.212.202/api/";

// Marvel Example URL:
//http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150



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
  /*getCharacters: function () {
    var encodedURI = window.encodeURI(urlEndPoint + "/characters" + params);

	return axios.get(encodedURI)
	    .then(function (response) {

	      // data.data?? .....y tho
	      return response.data.data.results; // Return an array of characters
	   	});
  	},

  	getCreators: function () {
    var encodedURI = window.encodeURI(urlEndPoint + "/creators" + params);

	return axios.get(encodedURI)
	    .then(function (response) {

	      
	      return response.data.data.results; // Return an array of creators
	   	});
  	},

  	getEvents: function () {
    var encodedURI = window.encodeURI(urlEndPoint + "/events" + params);

	return axios.get(encodedURI)
	    .then(function (response) {

	      
	      return response.data.data.results; // Return an array of creators
	   	});
  	},

  	getSeries: function () {
    var encodedURI = window.encodeURI(urlEndPoint + "/series" + params);

	return axios.get(encodedURI)
	    .then(function (response) {

	      
	      return response.data.data.results; // Return an array of creators
	   	});
  	}, */
