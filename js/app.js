var app = angular.module("workitApp", ["firebase"]);
app.controller("workitCtrl", function($scope, $firebaseArray) {
  //Connect to database.
  var ref = firebase.database().ref().child("work");
  // Create synced array
  $scope.opdrachten = $firebaseArray(ref);

  app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);

  // Simple hack to reload page.
  // Needed after login, need to fix.
  $scope.reloadPage = function(){
    location.reload();
  };

  $scope.login = function () {
    // Sign in with email.
       firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
         .then(function (response) {
           $scope.userEmail = response.email;
           alert('Logged in.');
         }).catch(function (error) {
         // Handle Errors here.
         $scope.error = error;
         $scope.message = error.message;
       });
     };

  $scope.signOut = function () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out succesful.");
      $scope.loggedIn = false;
    }, function(error) {
      console.log(error);
      // An error happened.
    });
  };

  // Check if user is logged in.
  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    $scope.loggedUser = firebaseUser;
  });

  // Add task, sync to firebase.
  $scope.addTask = function() {
    $scope.opdrachten.$add({
      vak: $scope.vak,
      omschrijving: $scope.omschrijving,
      datum: $scope.datum,
      created_at: d.getTime()
    });
  };

});
