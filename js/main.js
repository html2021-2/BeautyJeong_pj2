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

  //#cnt4
  $('#cnt4 .mask').on('mousemove', function (e) {
    //브라우저를 기준으로 컨텐츠 중심점 구하기
    const cntX = $(this).width()/2 + $(this).offset().left;
    const cntY = $(this).height()/2 + $(this).offset().top;
    //스크롤 포함한 마우스의 이동좌표 구하기(이동거리 축소위해 10으로 나누기)
    const translateX = (e.pageX - cntX) / 10;
    const translateY = (e.pageY - cntY) / 20;

    $(this).find('.photo_effect img').css({transform: 'translate( ' + translateX + 'px,' + translateY + 'px)'});
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


  // cnt4 이케아 라이브 남은 시간
  const arr = [24, 60, 60];  //카운트 될 최대 숫자지정
  $('.remain div').each(function (idx) {
    $({ val : 0 }).animate({ val : arr[idx] }, {
      duration: 2000,  //2초 동안 텍스트 변경
      step: function() {
        // console.log(Math.floor(this.val)); //소수점 제거
        $('.remain div').eq(idx).text(Math.floor(this.val));
      }
    });
  });

  function dDay() {
    const now = new Date();
    const yy = now.getFullYear();
    const mm = now.getMonth() + 1;  //0~11월 => 1월~12월
    const dd = now.getDate();

    // 디데이는 항상 매일 오후 4시로 지정한다
    let dday = new Date(yy, mm-1, dd, 16);

    const nowTime = now.getTime();
    const ddayTime = dday.getTime();
    // console.log(nowTime, ddayTime);
    
    // 만약 오늘의 라이브 방송 시간이 지난 경우라면 디데이를 내일로 변경
    if (nowTime > ddayTime) dday = new Date( dday.setDate(dday.getDate() + 1) );
    // console.log(dday);

    let remain = dday - nowTime;
    let hours = parseInt(remain / (1000*60*60));
    remain = remain - (hours*1000*60*60)
    let minutes = parseInt(remain / (1000*60));
    remain = remain - (minutes*1000*60);
    let seconds = parseInt(remain / 1000);
    // console.log(remain, hours, minutes, seconds);

    // 2자리 숫자로 변경
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    // console.log(hours, minutes, seconds);

    // 텍스트 출력
    $('#remainHour').text(hours);
    $('#remainTime').text(minutes);
    $('#remainSec').text(seconds);
  }

  // 텍스트 변환 시간이 2초 여서 1초 뒤부터 dDay() 함수를 1초 단위로 호출해서 출력한다
  setTimeout(function () {
      setInterval(dDay, 1000);
  }, 1000); 

});

