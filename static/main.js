/*$(document).ready(function(){
    wimg = $(".img_container").width();
    console.log(wimg);
    $(".img_container").css("height",wimg);
    
    $(window).resize(function(){
       wimg = $(".img_container").width();
       console.log(wimg);
       $(".img_container").css("height",wimg);
    })

    $('#gal .img_container').mouseenter(function(){

        $(this).next(".fullimg").css('display','block');
            $(" #gal .img_container").removeClass("imghover");
            $(this).parent().toggleClass("imghover");
            $("#fullimg").attr("src",("second.jpg"));
             $("#fullimg").show();
    });

    $('#gal .img_container').mouseleave(function(){
             $(this).next(".fullimg").css('display','none');
    });
})*/



function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-opacity-off";
}

