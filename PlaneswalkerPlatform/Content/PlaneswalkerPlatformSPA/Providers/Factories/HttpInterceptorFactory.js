angular.module('HttpInterceptorFactory', [])
    .factory('HttpInterceptorFactory', [function(){
        var Interceptor = {
            request: function(config) {
                angular.extend(config.headers, { "Access-Control-Allow-Origin": "*" });
                return config;
            }
        };

        return Interceptor;
    }]);