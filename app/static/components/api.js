var axios = require('axios');

var baseURL = "http://52.201.212.202/api/";

module.exports = {

    // ************************************************************************
    // Begin scraping model homepages, returns 6 individual instances per query
    // ************************************************************************

    getCharacters: function(page) {

        // Endpoint is character... but returns many characters...
        // (╯°□°)╯︵ ┻━┻ 

        var encodedURI = window.encodeURI(baseURL + "character");

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    'page': page
                }
            })
            .then(function(response) {
                console.log("In getCharacters: ");
                console.log(response);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    getCreators: function() {
        var encodedURI = window.encodeURI(baseURL + "creator");

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getCreators: " + response.data);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    getEvents: function() {
        var encodedURI = window.encodeURI(baseURL + "event");

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getEvents: " + response.data);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    getSeries: function() {
        var encodedURI = window.encodeURI(baseURL + "series");

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getSeries: " + response.data);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    // *******************************************************************
    // Begin scraping individual model instances, one instance is returned
    // *******************************************************************

    getCharacter: function(id) {
        var encodedURI = window.encodeURI(baseURL + "character/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getCharacter: " + response.data);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getCreator: function(id) {
        var encodedURI = window.encodeURI(baseURL + "creator/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getCreator: " + response.data);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getEvent: function(id) {
        var encodedURI = window.encodeURI(baseURL + "event/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getEvent: " + response.data);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    // Downsides of being both plural and singular, and no method overloading
    // ┬─┬﻿ ︵ /(.□. \）

    getOneSeries: function(id) {
        var encodedURI = window.encodeURI(baseURL + "series/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getOneSeries: " + response.data);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

};
