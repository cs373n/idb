var axios = require('axios');

var baseURL = "http://52.207.193.92/api/";

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

    getModel: function(id, modelType) {
        var encodedURI = window.encodeURI(baseURL + modelType + "s/" + id);

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
    /*
    postModel: function(modelInfo) {
        var encodedURI = window.encodeURI(baseURL + "characters");
        axios({
              method: 'post',
              url: encodedURI,
              data: {
                name: 'paul',
                desc: "hes aight",
                img: "test.jpg",
                num_comics: 0, 
                num_series: 0, 
                num_events: 0,
                events: [ {id: 29}, {id: 32} ]
              }
            }).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });*/

    postModel: function(modelType, infoToPost) {
        if(modelType != 'series'){
            modelType += "s";
        }
        var encodedURI = window.encodeURI(baseURL + modelType);
        axios({
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
              })
              .catch(function (error) {
                console.log(error);
              });

    /*postModel: function(modelType, infoToPost, formInput) {
        var requestURL;
        if(modelType != 'series')
            modelType += "s";

        var encodedURI = window.encodeURI(baseURL + modelType);
        axios({
              method: 'post',
              url: encodedURI,
              headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },
              data: {
                data: {
                    type: modelType,
                    attributes: infoToPost
                }
              }
            }).then(function (response) {
                console.log(response);
                return axios({
                    method: 'post',
                    url: response.data.data.links.self + "/relationships/events",
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json'
                    },
                    data:{
                        data: [
                            {
                                type: 'events',
                                id: 116
                            },

                            {
                                type: 'events',
                                id: 314
                            }
                        ]
                    }   

                }).then(function(response){console.log(response)}).catch(function(error){console.log(error)});
              }).catch(function (error) {
                console.log(error);
              });
              */
        /*
        return axios.post(encodedURI, {
                headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                },

                data: {
                    type: modelType,
                    attributes: JSON.stringify(infoToPost)
                }
            })
            .then(function(response) {
                console.log("In getModelConnections: ");
                console.log(response);
                return response.data.data;

            }).catch(function(error) {
                console.log(error);
            });*/
    },

    deleteModel: function(modelType, id) {
        if(modelType != 'series'){
            modelType += "s";
        }
        var encodedURI = window.encodeURI(baseURL + modelType + "/" + id);
        axios({
              method: 'delete',
              url: encodedURI,
              headers: {
                    'Accept': 'application/vnd.api+json',
                    'Content-Type': 'application/vnd.api+json'
                }
              }
            ).then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
              
    }

};