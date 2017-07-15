var axios = require('axios');

var baseURL = "http://34.228.83.115/api/";

module.exports = {

    // ************************************************************************
    // Begin scraping model homepages, returns 6 individual instances per query
    // ************************************************************************

    getCharacters: function(page, filter, orderBy) {

        var encodedURI = window.encodeURI(baseURL + "characters");
        return axios.get(encodedURI, {

                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    'page': page,
                    'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
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

    getCreators: function(page, filter, orderBy) {

        var encodedURI = window.encodeURI(baseURL + "creators");
        return axios.get(encodedURI, {

                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    'page': page,
                    'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
                }
            })
            .then(function(response) {
                console.log("In getCreators: ");
                console.log(response);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    getEvents: function(page, filter, orderBy) {

        var encodedURI = window.encodeURI(baseURL + "events");
        console.log(JSON.stringify({"filters": filter}));
        return axios.get(encodedURI, {

                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    'page': page,
                    'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
                }
            })
            .then(function(response) {
                console.log("In getEvents: ");
                console.log(response);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    getSeries: function(page, filter, orderBy) {

        var encodedURI = window.encodeURI(baseURL + "series");
        console.log(JSON.stringify({"filters": filter}));
        return axios.get(encodedURI, {

                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    'page': page,
                    'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
                }
            })
            .then(function(response) {
                console.log("In getSeries: ");
                console.log(response);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    getComics: function(page, filter, orderBy) {

        var encodedURI = window.encodeURI(baseURL + "comics");
        console.log(JSON.stringify({"filters": filter}));
        return axios.get(encodedURI, {

                headers: {
                    'Content-Type': 'application/json'
                },

                params: {
                    'page': page,
                    'q': JSON.stringify({"order_by": orderBy, 'filters': filter})
                }
            })
            .then(function(response) {
                console.log("In getComics: ");
                console.log(response);

                return response.data;
            }).catch(function(error) {
                console.log(error);
            });
    },

    // *******************************************************************
    // Begin scraping individual model instances, one instance is returned
    // *******************************************************************

    getCharacter: function(id) {
        var encodedURI = window.encodeURI(baseURL + "characters/" + id);

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
        var encodedURI = window.encodeURI(baseURL + "creators/" + id);

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
        var encodedURI = window.encodeURI(baseURL + "events/" + id);

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
                console.log("In getOneSeries: ");
                console.log(response.data);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getComic: function(id) {
        var encodedURI = window.encodeURI(baseURL + "comics/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getComic: " + response.data);
                console.log(response);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getModel: function(id, modelType) {
        var encodedURI = window.encodeURI(baseURL + modelType + "s/" + id);
        console.log(encodedURI);

        return axios.get(encodedURI, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(function(response) {
                console.log("In getModel: " + response.data);
                console.log(response);
                return response.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    // *******************************************************************
    // Login/Signup Logic
    // *******************************************************************

    login: function(username, hashedPassword) {
        var encodedURI = window.encodedURI(baseURL + "signUp");

        return axios.get(encodedURI, {

            headers: {
                'Content-Type': 'application/json'
            },

            params: {
                'username': username,
                'hashedPassword': hashedPassword
            }
        })
        .then(function(response) {
            console.log(response);
            return response.data;
        }).catch(function(error) {
            console.log(error);
        });
    },

    // *******************************************************************
    // Adding, Editing, Deleting models
    // *******************************************************************

    postModel: function(modelInfo) {
        var encodedURI = window.encodeURI(baseURL + "characters");
        var request = {
                headers: {
                    'Content-Type': 'application/json'
                },

                data: JSON.stringify(modelInfo)
              }

        console.log(request);

        axios.post(encodedURI, request)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
    }

};
