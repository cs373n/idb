var axios = require('axios');

var baseURL = "http://52.91.216.189/api/";
module.exports = {

    // ************************************************************************
    // Begin scraping model homepages, returns 6 individual instances per query
    // ************************************************************************

    getCharacters: function(page, filter, orderBy) {

        var encodedURI = window.encodeURI(baseURL + "characters");
        return axios.get(encodedURI, {

                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                params: {
                    'page[number]': page,
                    'filter[objects]': JSON.stringify(filter),
                    'sort': orderBy 
                    //'filter[objects]': JSON.stringify({"order_by": orderBy, 'filters': filter})
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
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                params: {
                    'page[number]': page,
                    'filter[objects]': JSON.stringify(filter),
                    'sort': orderBy 
                    //'filter[objects]': JSON.stringify({"order_by": orderBy, 'filters': filter})
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
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                params: {
                    'page[number]': page,
                    'filter[objects]': JSON.stringify(filter),
                    'sort': orderBy 
                    //'filter[objects]': JSON.stringify({"order_by": orderBy, 'filters': filter})
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
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                params: {
                    'page[number]': page,
                    'filter[objects]': JSON.stringify(filter),
                    'sort': orderBy 
                    //'filter[objects]': JSON.stringify({"order_by": orderBy, 'filters': filter})
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
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                params: {
                    'page[number]': page,
                    'filter[objects]': JSON.stringify(filter),
                    'sort': orderBy 
                    //'filter[objects]': JSON.stringify({"order_by": orderBy, 'filters': filter})
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
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getCharacter: ");
                console.log(response);
                return response.data.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getCreator: function(id) {
        var encodedURI = window.encodeURI(baseURL + "creators/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getCreator: " + response.data);
                return response.data.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getEvent: function(id) {
        var encodedURI = window.encodeURI(baseURL + "events/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getEvent: " + response.data);
                return response.data.data;

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
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getOneSeries: ");
                console.log(response.data);
                return response.data.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    getComic: function(id) {
        var encodedURI = window.encodeURI(baseURL + "comics/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getComic: " + response.data);
                console.log(response);
                return response.data.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    /*
        CAREFUL when refactoring this. Returns the ENTIRE JSON response.
        You will need to change states in the landing and instance pages.
        Make sure those are recieving response.data.data
    */
    getModel: function(id, modelType) {
        if(modelType != 'series'){
            modelType += 's';
        }
        var encodedURI = window.encodeURI(baseURL + modelType + "/" + id);

        return axios.get(encodedURI, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getModel of " + modelType + ":");
                console.log(response);
                return response;

            }).catch(function(error) {
                console.log(error);
                return error;
            });
    },

    getModelConnections: function(instanceURL, modelType) {
        var encodedURI = window.encodeURI(instanceURL + "/" + modelType);

        return axios.get(encodedURI, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
            })
            .then(function(response) {
                console.log("In getModelConnections: ");
                console.log(response);
                return response.data.data;

            }).catch(function(error) {
                console.log(error);
            });
    },

    postModel: function(modelType, infoToPost){
        if(modelType != 'series'){
            modelType += "s";
        }
        var encodedURI = window.encodeURI(baseURL + "eval/" + modelType);

        return axios({
            method: 'get',
            url: encodedURI,
            headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
            },
            params: {
                functions: JSON.stringify([{'name': 'max', 'field': 'id'}])
            }
        }).then(function(response){
            console.log("POSTMODEL:");
            console.log(response);
            console.log(infoToPost);
            infoToPost['id'] = response.data.data[0] + 1;
            var encodedURI = window.encodeURI(baseURL + modelType);
            return axios({
              method: 'post',
              url: encodedURI,
              headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
              data: {
                data: infoToPost
              }
            }).then(function (response) {
                console.log(response);
                return response;
              })
              .catch(function (error) {
                return error;
                console.log(error);
              });
        })
    },

    patchModel: function(modelType, id, infoToPatch) {
        if(modelType != 'series'){
            modelType += "s";
        }
        var encodedURI = window.encodeURI(baseURL + modelType + "/" + id);
        return axios({
              method: 'patch',
              url: encodedURI,
              headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
              data:{
                data: infoToPatch
              }
              }
            ).then(function (response) {
                console.log(response);
                return response;
                
              })
              .catch(function (error) {
                console.log(error);
                return error;
              });     
    },

    deleteModel: function(modelType, id) {
        if(modelType != 'series'){
            modelType += "s";
        }
        var encodedURI = window.encodeURI(baseURL + modelType + "/" + id);
        return axios({
              method: 'delete',
              url: encodedURI,
              headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
              }
            ).then(function (response) {
                console.log(response);
                return response;
              })
              .catch(function (error) {
                console.log(error);
                return error;
              });     
    }

};
