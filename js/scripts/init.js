//Add Service Worker
if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./service-worker.js', { scope: './' })
    .then(function(registration) {
      console.log("Service Worker Registered");
    })
    .catch(function(err) {
      console.log("Service Worker Failed to Register", err);
    })

}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCF0nadq1Bzpgj-0L6vJgLLSGRtGPxNT7E",
  authDomain: "workit-c5685.firebaseapp.com",
  databaseURL: "https://workit-c5685.firebaseio.com",
  storageBucket: "workit-c5685.appspot.com",
  messagingSenderId: "52768683309"
};
firebase.initializeApp(config);

//Materialize init.
$('.modal').modal({
  starting_top: '4%',
  ending_top: '20%',
});
$(".button-collapse").sideNav();
$('.datepicker').pickadate({
  selectMonths: true,
  selectYears: 1,
  format: 'dd/mm/yyyy',
  formatSubmit: 'MMM d, y h:mm:ss a',
  container: 'body'
});
$('select').material_select();
