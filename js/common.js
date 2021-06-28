$(document).ready(function () {
  //header : 배너 슬라이더
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    }
  });

  $('#pcGnb .swiper-container').on('mousemove', function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    console.log(mouseX, mouseY);
    gsap.to('#cursorDrag', {left: mouseX, top: mouseY}); 
  });

  //top 이동
  $('.btn_top').on('click', function () {
    $("html, body").stop().animate({scrollTop: 0});
    $('#pcHeader .logo a').focus();
		return false;
  });

});