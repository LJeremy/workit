var d = new Date();
var app = angular.module("workitApp", ["firebase"]);
app.controller("workitCtrl", function($scope, $firebaseArray) {
  var ref = firebase.database().ref().child("work");
  // Create synced array
  $scope.opdrachten = $firebaseArray(ref);

  app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);

  $scope.reloadPage = function(){
    location.reload();
  };

  $scope.login = function () {
       firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
         .then(function (response) {
           console.log(response.email);
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

  firebase.auth().onAuthStateChanged(function(firebaseUser) {
    $scope.loggedUser = firebaseUser;
  });

  $scope.addTask = function() {
    $scope.opdrachten.$add({
      vak: $scope.vak,
      omschrijving: $scope.omschrijving,
      datum: $scope.datum,
      created_at: d.getTime()
    });
  };

});
