$(document).ready(function () {
  //cnt1 - pc, mobile 공통
  //slick 슬라이더
  //#pcCnt1
  //slick 슬라이더
  $('#pcCnt1 .slick-wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false,

    dots: true,
    dotsClass: 'slick-dots',
    appendDots: $('.slick-pagination'),
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  });

  // PC 버젼일 경우만 왼쪽 이미지 클릭시 다음으로 전환
  $('#pcCnt1 .slide_bg img').on('click', function() {
    if ($(window).width() >= 1440) {
      var slideNo = $(this).parents('.slick-slide').data('slick-index');
      console.log(slideNo);
      $('#pcCnt1 .slick-wrapper').slick('slickGoTo', slideNo+1);
    }
  });

  //마우스따라다니기
  $('#pcCnt1').on('mousemove', function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    // console.log(mouseX, mouseY);
    $(this).find('.drag').css('visibility', 'visible');
    gsap.to('.drag', {left: mouseX + 20, top: mouseY, duration: 0.2})

  });
  $('#pcCnt1').on('mouseleave', function () {
    $(this).find('.drag').css('visibility', 'hidden');
  });

  //#mCnt1
  //slick 슬라이더
  $('#mCnt1 .slick-wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false,

    //autoplay: true,  //자동실행
    speed: 2000, //이전, 다음 버튼을 클릭하면 전환되는 시간 - 기본값 300
    autoplaySpeed: 4000,
    easing: 'easeInOutQuint',
    pauseOnHover: false, //마우스 오버하면 슬라이더 정지
    prevArrow: $('.slick-prev'), //이전 버튼 선택자
    nextArrow: $('.slick-next'), //다음 버튼 선택자
    draggable: false, //드래그 가능 여부

  });
});