$( "div" ).click(function() {
  console.log("clicked now waiting");
  var self = this;
  var number = $(this).find(".phone").text();
  text(number);
  console.log(number);
  console.log($(this));
  $(this).addClass('shake shake-horizontal"');
  setTimeout(function(){
    $(self).removeClass('shake shake-horizontal"');
  },1000);

});


var text = function(number){
  //use jquery to send the request to text number
  $.ajax({
    type: 'POST',
  //  dataType: 'jsonp',
    url: 'http://localhost:3000/text',
    data: {
      "number":number
    }
  })

  .done(
    function (json) {
      console.log(json);
      console.log('Response finished');
  });
};
