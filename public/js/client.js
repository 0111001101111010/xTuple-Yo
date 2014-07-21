$( "div" ).click(function() {
  //alert( "Alerting:" );
  //console.log($(this).html());
  var number = $(this).find(".phone").text();
  text(number);
});


var text = function(number){
  //use jquery to send the request to text number
  $.ajax({
    type: 'POST',
  //  dataType: 'jsonp',
    url: 'http://localhost:3000/text',
    data: {}
  })

  .done(
    function (json) {
      console.log(json);
  });
};
