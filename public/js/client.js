var once = true;
var name;
var message;
$(document).ready(function () {
    $('.modalLink').modal({
        trigger: '.modalLink',
        olay: 'div.overlay',
        modals: 'div.modal',
        animationEffect: 'slidedown',
        animationSpeed: 400,
        moveModalSpeed: 'fast',
        background: '00c2ff',
        opacity: 0.2,
        openOnLoad: false,
        docClose: true,
        closeByEscape: true,
        moveOnScroll: true,
        resizeWindow: true,
        close: '.closeBtn'
    });
    if(once){
      $('.modalLink').click();
      once = false;
    }
});
$("div").click(function() {
  console.log("clicked now waiting");
  var self = this;
  var number = $(this).find(".phone").text();
  text(number);
  console.log(number);
  $(this).addClass('shake shake-horizontal"');
  setTimeout(function(){
    $(self).removeClass('shake shake-horizontal"');
  },1000);

});

$("#myClick").click( function () {
  console.log("clicked");
  var modal = $("#modal");
  modal.removeClass('modal');
  modal.attr("hidden",'true');
  modal.attr("_csrf",'true');
  $("#overlay").removeClass("overlay");
  name = $("#myName").val();
  message = $("#myMsg").val();
});

var text = function(number){
  //use jquery to send the request to text number
  $.ajax({
    type: 'POST',
  //  dataType: 'jsonp',
    url: 'http://localhost:3000/text',
    data: {
      "number": number,
      "name": name,
      "message": message
    }
  })

  .done(
    function (json) {
      console.log(json);
      console.log('Response finished');
  });
};
