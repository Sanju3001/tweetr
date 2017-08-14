// function for changing character counter color


$( document ).ready(function(){

  $('textarea').on('keyup', function (){

   var myLength = 140 - ($(this).val().length);

    if (myLength >= 0) {
      $('.counter').html(myLength);
      $('.counter').removeClass("red");
    } else {
      $('.counter').html(myLength);
      $('.counter').addClass("red");
    }

  });

});






