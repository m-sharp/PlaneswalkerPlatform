angular.module('NavigationController', [])
	.controller('NavigationController', ['$location', '$route',
        function ($location, $route) {
	        function stripTrailingSlash(routeString) {
	            if (routeString.substr(-1) === '/')
	                return routeString.substr(0, routeString.length - 1);
	            return routeString;
	        }

	        var routes = [];
	        angular.forEach($route.routes, function (config, route) {
	            if (route !== 'null' && config.friendlyPageName != undefined)
	                routes.push({ "path": stripTrailingSlash(route), "name": config.friendlyPageName });
	        });
        
	        this.isActive = function (path) {
	            if ($location.path().substr(0, path.length) === path)
	                return true;
	            return false;
	        };

	        this.Routes = function (includeHome) {
	            if (includeHome == 'false')
	                return routes.filter(function (route) {
	                    return route.name !== "Home"
	                });
                return routes;
	        };
}]);