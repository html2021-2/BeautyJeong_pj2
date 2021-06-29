$(document).ready(function () {
  //#pcCnt1
  //slick 슬라이더 - pc
  $('#pcCnt1 .slick-wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false,

    dots: true,
    dotsClass: 'pc-slick-dots',
    appendDots: $('.pc-slick-pagination'),
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
  });

  //마우스따라다니기
  $('#pcCnt1 .slick-slide .slide_bg').on({
    mousemove: function (e) {
      const mouseX = e.pageX;
      const mouseY = e.pageY;
      console.log(mouseX, mouseY);
      $(this).parents('.slick-container').next().css('visibility', 'visible');
      gsap.to('.cursorDrag', {left: mouseX + 20,top: mouseY,duration: 0.2})
    },
    mouseleave: function () {
      $(this).parents('.slick-container').next().css('visibility', 'hidden');
    }
  });

  //pc슬라이더 클릭 이벤트 추가 - 왼쪽 이미지 클릭하면 다음슬라이더로 이동하기
  $('#pcCnt1 .slide_bg img').on('click', function () {
    if ($(window).width() >= 1440) {
      let slideNo = $(this).parents('.slick-slide').data('slick-index');
      console.log(slideNo);
      $('#pcCnt1 .slick-wrapper').slick('slickGoTo', slideNo + 1);
    }
  });

  //#mCnt1
  //slick 슬라이더 - mobile
  $('#mCnt1 .slick-wrapper').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    vertical: false,

    dots: true,
    dotsClass: 'm-slick-dots',
    appendDots: $('.m-slick-pagination'),
    autoplay: true, 
    speed: 2000, //슬라이드 전환되는 시간 - 기본값 300
    autoplaySpeed: 4000,
    easing: 'easeInOutQuint',
    pauseOnHover: false, //마우스 오버하면 슬라이더 정지
    draggable: false, //드래그 가능 여부
  });

  //play, stop버튼
  $('#mCnt1 .slick-auto button').on('click', function () {
    // 첫번째 버튼이 일시정지인 경우
    if ($(this).index() === 0) $('#mCnt1 .slick-wrapper').slick('slickPause');
    // 그렇지 않고 두번째 버튼이 자동실행인 경우
    else $('#mCnt1 .slick-wrapper').slick('slickPlay');
    // 공통으로 클릭한 버튼은 숨기고 나머지 형제를 보이게 처리
    $(this).removeClass('visible').siblings().addClass('visible');
  });
  $('#mCnt1 .slick-pause').addClass('visible');

  //polygon 좌표 변경
  $(window).on('resize', function () {
    const winWid = $(this).width();
    const winHei = $(this).height();
    let point2, point3;
    if(winWid <= 414) {
      point2 = winWid * 0.4;
      point3 = winWid * 0.98;
      $('.slick-slide svg polygon').attr({points: `0 0, 0 ${winHei}, ${point3} ${winHei}, ${point2} 0`});
      $('.slick-slide .reverse polygon').attr({points: `0 0, 0 ${winHei}, ${point2} ${winHei}, ${point3} 0`});
    } else if(winWid <= 768) {
      point2 = winWid * 0.4;
      point3 = winWid * 0.8;
      $('.slick-slide svg polygon').attr({points: `0 0, 0 ${winHei}, ${point3} ${winHei}, ${point2} 0`});
      $('.slick-slide .reverse polygon').attr({points: `0 0, 0 ${winHei}, ${point2} ${winHei}, ${point3} 0`});
    }

  });
  $(window).trigger('resize');


});

