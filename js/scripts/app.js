var app = angular.module("workitApp", ["firebase"]);
app.controller("workitCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
  //Connect to database.
  var ref = firebase.database().ref().child("work");
  // Create synced array
  $scope.opdrachten = $firebaseArray(ref);

  // Add auth
  app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);

  // Date
  $scope.getDatetime = new Date();

  //Array with the names of classes
  $scope.vakken = [
    "Engels",
    "Nederlands",
    "Rekenen",
    "Project",
    "Programmeren",
    "Databases",
    "SLB",
    "Burgerschap",
    "Web",
    "CMS",
    "KD OGD"
  ];


  //Login
  $scope.login = function () {
    // Sign in with email.
       firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
         .then(function (response) {
           $scope.userEmail = response.email;
           $('#login').modal('close');
           location.reload();
         }).catch(function (error) {
         // Handle Errors here.
         $scope.error = error;
         $scope.message = error.message;
       });
     };

  // Sign out
  $scope.signOut = function () {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("Sign-out succesful.");
      location.reload();
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
      created_at: $scope.getDatetime.getTime()
    });
    $('#addWork').modal('close');
  };


  $scope.removeTask = function (opdracht) {
    $scope.opdrachten.$remove(opdracht);
  };

}]);
