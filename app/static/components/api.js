var axios = require('axios');

var urlEndPoint = "http://gateway.marvel.com/v1/public/";
var ts = new Date().getTime();
var privateKey = ""
var publicKey = "";
var md5 = require('md5');
var md5hash = md5(ts+privateKey+publicKey);

// Construct the required URL params
var params = "?ts=" + ts + "&apikey=" + publicKey + 
	"&hash=" + md5hash;

// Marvel Example URL:
//http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

module.exports = {
  getCharacters: function () {
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

	      // data.data?? .....y tho
	      return response.data.data.results; // Return an array of creators
	   	});
  	},

  	getEvents: function () {
    var encodedURI = window.encodeURI(urlEndPoint + "/events" + params);

	return axios.get(encodedURI)
	    .then(function (response) {

	      // data.data?? .....y tho
	      return response.data.data.results; // Return an array of creators
	   	});
  	},

  	getSeries: function () {
    var encodedURI = window.encodeURI(urlEndPoint + "/series" + params);

	return axios.get(encodedURI)
	    .then(function (response) {

	      // data.data?? .....y tho
	      return response.data.data.results; // Return an array of creators
	   	});
  	}
};