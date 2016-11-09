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
