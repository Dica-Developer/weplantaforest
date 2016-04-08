'use strict';

/**
 * I Plant A Tree API v1
 */
angular.module('api', [])

/**
 * This provider is used as the main interface for communicating with RESTful web resources.
 */
.provider('Api', function() {
  var self = this;
  var baseApiUrl = null;
  var suffix = '';

  /**
   * Sets the base api url. This value must lead with a '/'
   *
   * @param {String} url The value to set as the base api url
   */
  self.setApiBaseUrl = function(url) {

    if (angular.isString(url)) {
      var cleanUrl = angular.copy(url);
      var match = cleanUrl.match(/(http|https):\/\//i);
      var httpPrefix = 'http://';

      if (match && match.length > 0) {
        httpPrefix = match[0];
      }

      cleanUrl = cleanUrl.replace(httpPrefix, '');
      cleanUrl = cleanUrl.replace(/\/+/g, '/');
      cleanUrl = cleanUrl.split('/');

      // remove all of the last entries if they are empty string.
      while(cleanUrl.length > 0 && cleanUrl[cleanUrl.length - 1] === '') {
        cleanUrl.pop();
      }

      baseApiUrl = httpPrefix + cleanUrl.join('/');
    }
  };

  /**
   * Sets the value of the suffix to append to the end of the url before making the request.
   *
   * @param {String} value The value the set the suffix of the request url.
   */
  self.setRequestSuffix = function(value) {
    suffix = value;
  };

  self.$get = ['$http', function($http) {

    /**
     * Main method that calls the api
     *
     * @param {String} type The HTTP verb to use. eg: GET, POST, PUT, DELETE
     * @param {String} resourceName The name of the resource to calls
     * @param {Number=} [id] The id of the resource.
     * @param {String=} [query] The query string to append.
     * @param {Object=} [data] The data to post with the request.
     * @returns {*}
     */
    var callApi = function(type, resourceName, id, query, data) {
      return $http({
        method: type,
        url: buildUrl(resourceName, id, query),
        data: data
      });
    };

    /**
     * Constructs the request url to call using the base api url and resource data provided.
     *
     * @param {String} resourcePath The relative path of the resource.
     * @param {Number=} [id] The id of the resource.
     * @param {String=} [query] The query string to append.
     * @returns {string} The complete url to request.
     */
    var buildUrl = function(resourcePath, id, query) {

      // If the resource path doesn't start with a '/' then prefix it.
      if (resourcePath.indexOf('/') !== 0) {
        resourcePath = '/' + resourcePath;
      }

      var parts = [resourcePath];

      if (angular.isDefined(id) && id !== null) {
        parts.push(id);
      }

      return baseApiUrl + parts.join('/') + suffix + (query ? query : '');
    };

    return {
      /**
       * Calls the api with the get http verb.
       *
       * @param {String} resourceName The name of the resource to call.
       * @param {Number=} [id] The id of the resource.
       * @param {String=} [query] The query string to append.
       * @returns {Object} The promise object which made the request.
       */
      get: function(resourceName, id, query) {
        return callApi('GET', resourceName, id, query);
      },

      /**
       * Calls the api with the post http verb sending the data object provided with the request.
       *
       * @param {String} resourceName The name of the resource to call.
       * @param {Object} data The object to post with the request.
       * @returns {Object} The promise object which made the request.
       */
      post: function(resourceName, data) {
        return callApi('POST', resourceName, null, null, data);
      },

      /**
       * Calls the api with the put http verb sending the data object provided with the request.
       *
       * @param {String} resourceName The name of the resource to call.
       * @param {Number} id The id of the resource.
       * @param {Object} data The object to post with the request.
       * @returns {Object} The promise object which made the request.
       */
      put: function(resourceName, id, data) {
        return callApi('PUT', resourceName, id, null, data);
      },

      /**
       * Calls the api with the delete http verb.
       *
       * @param {String} resourceName The name of the resource to call.
       * @param {Number=} id The id of the resource.
       * @returns {Object} The promise object which made the request.
       */
      delete: function(resourceName, id) {
        return callApi('DELETE', resourceName, id);
      }
    };
  }];

  return self;
})

/**
 * Sets up the api base url.
 */
.config(['ApiProvider', function(ApiProvider) {
  ApiProvider.setApiBaseUrl('http://localhost:8081');
}])

/**
 * Collection of available treetypes.
 */
.factory('TreetypeApi', ['Api', function(Api) {
  return {
    
    /**
     * Get a list of treetypes.
     */
    query: function(query) {
      return Api.get('/treetypes', null, query);
    },
    
    /**
     * Get the treetype with treetypes/id
     */
    get: function(id) {
      return Api.get('/treetypes', id);
    }
  };
}])

/**
 * Collection of available trees.
 */
.factory('TreeApi', ['Api', function(Api) {
  return {
    
    /**
     * Get a list of trees.
     */
    query: function(query) {
      return Api.get('/trees', null, query);
    },
    
    
    put: function(entity) {
      return Api.put('/trees', entity.id, entity);
    },
    
    /**
     * Get the tree with trees/id
     */
    get: function(id) {
      return Api.get('/trees', id);
    }
  };
}])

/**
 * Collection of available projects.
 */
.factory('ProjectApi', ['Api', function(Api) {
  return {
    
    /**
     * Get a list of projects.
     */
    query: function(query) {
      return Api.get('/projects', null, query);
    },
    
    
    put: function(entity) {
      return Api.put('/projects', entity.id, entity);
    },
    
    
    search: {
      
      
      query: function(query) {
        return Api.get('/projects/search', null, query);
      },
      
      /**
       * Collection of available active.
       */
      active: {
        
        /**
         * Get a list of active.
         */
        query: function(query) {
          return Api.get('/projects/search/active', null, query);
        }
      }
    },
    
    /**
     * Entity representing a recommend
     */
    recommend: {
      
      /**
       * Get the recommend with recommend/id
       */
      query: function(query) {
        return Api.get('/projects/recommend', null, query);
      }
    },
    
    /**
     * Get the project with projects/id
     */
    get: function(id) {
      return Api.get('/projects', id);
    },
    
    
    delete: function(id) {
      return Api.delete('/projects', id);
    },
    
    
    patch: function() {
      return Api.patch('/projects');
    },
    
    /**
     * Collection of available treetypes.
     */
    treetypes: {
      
      /**
       * Get a list of treetypes.
       */
      query: function(projectId, query) {
        return Api.get('/projects/' + projectId + '/treetypes', null, query);
      }
    },
    
    /**
     * Collection of available trees.
     */
    trees: {
      
      /**
       * Get a list of trees.
       */
      query: function(projectId, query) {
        return Api.get('/projects/' + projectId + '/trees', null, query);
      }
    }
  };
}])

/**
 * Collection of available users.
 */
.factory('UserApi', ['Api', function(Api) {
  return {
    
    /**
     * Get a list of users.
     */
    query: function(query) {
      return Api.get('/users', null, query);
    },
    
    
    put: function(entity) {
      return Api.put('/users', entity.id, entity);
    },
    
    /**
     * Get the user with users/id
     */
    get: function(id) {
      return Api.get('/users', id);
    },
    
    
    patch: function() {
      return Api.patch('/users');
    },
    
    
    delete: function(id) {
      return Api.delete('/users', id);
    }
  };
}])


.factory('ReportApi', ['Api', function(Api) {
  return {
    
    
    co2: {
      
      
      query: function(query) {
        return Api.get('/reports/co2', null, query);
      }
    },
    
    
    plantsnewest: {
      
      
      query: function(query) {
        return Api.get('/reports/plants/newest', null, query);
      }
    },
    
    
    usersnewest: {
      
      
      query: function(query) {
        return Api.get('/reports/users/newest', null, query);
      }
    },
    
    
    usersbest: {
      
      
      query: function(query) {
        return Api.get('/reports/users/best', null, query);
      }
    },
    
    
    teamsnewest: {
      
      
      query: function(query) {
        return Api.get('/reports/teams/newest', null, query);
      }
    },
    
    
    teamsbest: {
      
      
      query: function(query) {
        return Api.get('/reports/teams/best', null, query);
      }
    },
    
    
    commentsnewest: {
      
      
      query: function(query) {
        return Api.get('/reports/comments/newest', null, query);
      }
    }
  };
}]);