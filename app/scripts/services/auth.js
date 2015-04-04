'use strict';

app.factory('Auth', function($firebaseAuth, FIREBASE_URL, $rootScope) {
	var ref = new Firebase(FIREBASE_URL);
	var auth = $firebaseAuth(ref);

	var Auth = {
		register: function(user) {
			return ref.createUser({
				email: user.email,
				password: user.password

			}, registerHandler);

		},
		login: function(user) {
			return ref.authWithPassword({
				email : user.email,
				password : user.password
			}, authHandler);
		},
		logout: function() {
			return ref.unauth();
		},
		resolveUser: function() {
			return ref.getAuth();
		},
		signedIn: function() {
			return ref.getAuth();
		},
		user: {}
	};

	$rootScope.$on(Auth.login, function(e, user) {
		console.log('root scope logged in');
		angular.copy(user, Auth.user);
	});
	$rootScope.$on(Auth.logout, function() {
		console.log('root scope logged out');
		angular.copy({}, Auth.user);
	});

	function authHandler(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	  }
	}

	function registerHandler(error, userData) {
		if(error) {
			switch(error.code) {
				case "EMAIL_TAKEN" :
					console.log("The new user account cannot be created because the email is already in use.");
					break;
				case "INVALID_EMAIL" :
					console.log("The specified email is not a valid email.");
        			break;
        		default:
        			console.log("Error creating user:", error);
			}
		} else {
			console.log("Successfully created user account with uid:", userData.uid);
		}
	}

	function authDataCallback(authData) {
	  if (authData) {
	    console.log("User " + authData.uid + " is logged in with " + authData.provider);
	    return authData;
	  } else {
	    console.log("User is logged out");
	  }
	}
	return Auth;
});