var app = angular.module('BugTrackerApp', []);
var services = {
	'github': 'https://api.github.com'
};
var selectedService = 'github';

function APIEndpoint (location) {
	return services[selectedService] + location;
}

app.controller('IssueController', function ($rootScope, $scope, $http) {
	
	$scope.theme = 'light';
	$rootScope.profile = 'AceXintense';
	$rootScope.personalToken = 'd9ba727184a608e1abade0108ee942dbd2db96ee';
	$scope.settings = false;
	$scope.createIssue = false;
    $scope.errors = [];
	
	$scope.selectProject = function (projectName) {
		$rootScope.selectedProject = projectName;
		$scope.getIssuesForProject();
	};
	
	$scope.changeProfile = function () {
		$scope.init();
	};
	
	$scope.init = function () {
		$http({
		  method: 'GET',
		  url: APIEndpoint('/users/' + $rootScope.profile + '/repos')
		}).then(function successCallback(response) {
			 // this callback will be called asynchronously
			 // when the response is available
			$scope.projects = response.data;
		  }, function errorCallback(response) {
			 // called asynchronously if an error occurs
			 // or server returns response with an error status.
		  });	
	};
	$scope.init();

    function Error(title, message) {
        this.title = title;
        this.message = message;
        $scope.errors.push(this);
    }
    new Error('title', 'message');

	$scope.getIssuesForProject = function () {		
		$http({
		  method: 'GET',
		  url: APIEndpoint('/repos/' + $rootScope.profile + '/' + $rootScope.selectedProject + '/issues')
		}).then(function successCallback(response) {
			 // this callback will be called asynchronously
			 // when the response is available
			$scope.issues = response.data;
		  }, function errorCallback(response) {
			 // called asynchronously if an error occurs
			 // or server returns response with an error status.
		  });
	};
});

app.run(function($http, $rootScope) {
	// Create Base64 Object
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

	var Authorization = 'AceXintense:d9ba727184a608e1abade0108ee942dbd2db96ee';
	var encodedString = Base64.encode(Authorization);
	$http.defaults.headers.common.Authorization = 'Basic ' + encodedString;
});

app.controller('createIssueController', function ($rootScope, $scope, $http) {
	console.log(APIEndpoint('/repos/' + $rootScope.profile + '/' + $rootScope.selectedProject + '/issues'));
	$scope.submitNewIssue = function () {
		$http({
			method: 'POST',
			url: APIEndpoint('/repos/' + $rootScope.profile + '/' + $rootScope.selectedProject + '/issues'),
			data: {
				'title': $scope.title,
				'body': $scope.body
			}
			}).then(function successCallback(response) {
			 // this callback will be called asynchronously
			 // when the response is available
		  }, function errorCallback(response) {
			 // called asynchronously if an error occurs
			 // or server returns response with an error status.
			console.log(response);
		  });
	};
});

angular.element(function() {
	angular.bootstrap(document, ['BugTrackerApp']);
});