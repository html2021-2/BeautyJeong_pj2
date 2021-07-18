$(document).ready(function () {
  
  //pc, mobiile공통
  // 1) 본문1 슬라이더, 하단 배너 텍스트 잘라 태그로 감싸기 / 애니메이션 지연시간 설정
  $('#container .txt').each(function () {
    let wordArray = $(this).html().split(' ');
    // console.log(wordArray);
    let tagWrite = '';
    for (let i = 0; i < wordArray.length; i++) {
      $(this).html(''); //기존 태그 우선 지우기
      if (wordArray[i] === '<br>') {
        tagWrite += '<br>';
       } else {
        let spanArray = wordArray[i].split(''); //한글자씩 잘라서 배열에 저장
        // console.log(spanArray);
        // 반복문을 통해 각 span 부모 안에 막내 자식으로 span 동적생성
        tagWrite += ` <span class="word">`;
        for (let j = 0; j < spanArray.length; j++) {
          tagWrite += `<span class="up">${spanArray[j]}</span>`;
        }
        tagWrite += '</span>';
      }
      $(this).append(tagWrite);
    }
  });

  // delay 시간 지정
  $('#container .txtwrap').each(function () {
    $(this).find('.up').each(function (idx) {
      $(this).css('animationDelay', (idx * 0.03) + 0.3 + 's');
    });
  });

  //#cnt2 
  //hover
  $('.photo .hover_circle').on('mouseenter focus', function () {
    $(this).next().addClass('on');
  });
  $('.photo .hover_circle').on('mouseleave blur', function () {
    $(this).next().removeClass('on');
  });


  //parallax
  $(window).on('scroll', function () {
    //스크롤바의 수직 이동거리
    const scrollY = $(this).scrollTop() + $(this).height();
    $('#cnt2 .photo').each(function () {
      if (scrollY > $(this).offset().top) $(this).addClass('fade');
      else $(this).removeClass('fade');
    });
  });

  //홈퍼니싱 pc , 모바일 제어
  let isMobile;
  $(window).on('resize', function () {
    const winWid = $(this).width();
    const winHei = $(this).height();
    if(winWid > 1024) {//pc
      // $('#cnt2 .mcnt2_tit').hide(); 이건 스크립트 대신 미디어쿼리에서 px는 display: none; 모바일은 display: block 처리

      // 창크기에 변화가 생길때 언제나 동적생성 하지 않고 모바일에서 pc로 바뀌는 순간에 한번만 동작
      if (isMobile) {
        // 처음 열린 창이 모바일이라면 이미지가 변경되었을 것이고 그럼 창크기를 변화해서 pc가 되면 다시 이미지를 pc로 변경해 주어야죠
        $('#cnt2 .photo2 img').attr({src: "images/furnishing/p-furnish2.jpg", alt: "야외피크닉을 즐길 수 있는 야외마당"});
        $('#cnt2 .photo3 img').attr({src: "images/furnishing/p-furnish3.jpg", alt: "바람에 날리는 커텐과 식물들이 있는 방"});
        $('#cnt2 .photo4 img').attr({src: "images/furnishing/p-furnish4.jpg", alt: "화이트 톤의 어린이 방"});

        $('#cnt2 .photo .btn_more').remove();
      }
      isMobile = false;
    } else {//모바일
      // 창크기에 변화가 생길때 언제나 동적생성 하지 않고 pc에서 모바일로 바뀌는 순간에 한번만 동작
      if (!isMobile) {
        // 이건 모두 스타일에서
        // $('#cnt2 .mcnt2_tit').show();
        // $('#cnt2 .border p').hide().next().hide();
        // $('#cnt2 .photo5').hide().next().hide();
        
        $('#cnt2 .photo2 img').attr({src: "images/furnishing/m-furnish2.jpg", alt: "이케아 주방"});
        $('#cnt2 .photo3 img').attr({src: "images/furnishing/m-furnish3.jpg", alt: "이케아 주방"});
        $('#cnt2 .photo4 img').attr({src: "images/furnishing/m-furnish4.jpg", alt: "이케아 주방"});
      
        $('#cnt2 .photo .hover_box').after('<a href="" class="btn_more yellow">view more</a>');
      }
      isMobile = true;
    }
  });
  
  //페럴렉스
  $(window).on('scroll', function () {
    //2) 스크롤바의 수직이동거리
    // 스크롤바의 이동거리에 $(this).height()을 추가한 이유는 사용자가 스크롤바를 빨리 조작해서 컨텐츠가 보여지지 않을 경우를 대비 - 브라우저 한칸만큼 먼저 보여질 수 있도록 제어함(보여질 켄텐츠의 크기에 따라 값은 알아서 조절)
    const scrollY = $(this).scrollTop() + $(this).height();
    //console.log(scrollY);

    //4) #container section 9개를 하나씩 제어 each() => 컨텐츠와 가까워지면 .fade를 추가하고 멀어지면 제거
    $('#cnt2 .photo').each(function (idx) {
        if (scrollY > $(this).offset().top) {
            $(this).addClass('fade');
        } else {
            $(this).removeClass('fade');
        }
    });
  });


  //atc2 탭브라우징 제어
  	/* 1) 초기값 */
    $('.tab:first-of-type, .tabpanel:first-of-type').addClass('active').attr('tabIndex', 0);
    $('.tab:first-of-type').attr('aria-selected', true).siblings().attr('aria-selected', false);
    $('.tabpanel:first-of-type').attr('aria-hidden', false).siblings('.tabpanel').attr('aria-hidden', true);
  
    /* 2) 탭버튼에서 키보드를 누르는 이벤트(keydown) - 키보드 제어 */
    $('.tab').on('keydown', function (e) {
      var key = e.keyCode;
      console.log(key); //왼쪽방향키 37 , 오른쪽 방향키 39, 스페이스바 32 , 엔터 13
      switch (key) {
        case 37:    //왼쪽 방향키
          $(this).attr('tabIndex', -1);
          if ($(this).hasClass('first')) $(this).siblings('.last').attr('tabIndex', 0).focus();
          else $(this).prev().attr('tabIndex', 0).focus();
          break;
        case 39:  //오른쪽 방향키
          $(this) .attr('tabIndex', -1);
          if ($(this).hasClass('last')) $(this).siblings('.first').attr('tabIndex', 0).focus();
          else $(this).next().attr('tabIndex', 0).focus();
          break;
        case 36:  //HOME 키는 가장 처음으로
          e.preventDefault();
          $(this).siblings('.first').attr('tabIndex', 0).focus();
          break;
        case 35:  //END 키는 가장 마지막으로
          e.preventDefault();
          $(this).siblings('.last').attr('tabIndex', 0).focus();
          break;
        case 32:  //스페이스바
        case 13:  //엔터
          var $tg = $(this);
          activeOn($tg);
          break;
      }
    });
  
    //3) 탭 클릭 이벤트
    $('.tab').on('click', function () {
      var $tg = $(this);
      activeOn($tg);
    });
  
    function activeOn($target) {
      $target.addClass('active').attr({'aria-selected': true, tabIndex: 0}).siblings().removeClass('active').attr({'aria-selected': false, tabIndex: -1});
      $('#' + $target.attr('aria-controls')).addClass('active').attr({'aria-hidden': false, tabIndex: 0}).siblings('.tabpanel').removeClass('active').attr({'aria-hidden': true, tabIndex: -1});
    }

    //swiper slider
    const swiper1 = new Swiper('#tabpanel1 .swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      effect: 'fade',
      
      fadeEffect: {
        crossFade: true
      },

      pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
      },

      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },

      scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
      },

      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },

      observer: true,
      observeParents: true //해당 요소와 부모 요소를 감지하여 DOM에 변화가 있으면 swiper를 초기화하여 문제를 해결

  });
  const swiper2 = new Swiper('#tabpanel2 .swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      effect: 'fade',

      fadeEffect: {
        crossFade: true
      },

      pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
      },

      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },

      scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
      },

      observer: true,
      observeParents: true //해당 요소와 부모 요소를 감지하여 DOM에 변화가 있으면 swiper를 초기화하여 문제를 해결

  });
  const swiper3 = new Swiper('#tabpanel3 .swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      effect: 'fade',

      fadeEffect: {
        crossFade: true
      },

      pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
      },

      // Navigation arrows
      navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
      },

      scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
      },

      observer: true,
      observeParents: true //해당 요소와 부모 요소를 감지하여 DOM에 변화가 있으면 swiper를 초기화하여 문제를 해결

  });

  $('.swiper-scrollbar').attr({style:'transform: translate3d(0px, 0px, 0px), width: 142.857px, transition-duration: 0ms'})
  

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
    autoplaySpeed: 6000,
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
    } else if(winWid <= 1024) {
      point2 = winWid * 0.4;
      point3 = winWid * 0.8;
      $('.slick-slide svg polygon').attr({points: `0 0, 0 ${winHei}, ${point3} ${winHei}, ${point2} 0`});
      $('.slick-slide .reverse polygon').attr({points: `0 0, 0 ${winHei}, ${point2} ${winHei}, ${point3} 0`});
    }

  });
  $(window).trigger('resize');


  // cnt4 이케아 라이브 남은 시간
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= $('#cnt4').offset().top) {
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
        $('.cnt4_wrap .date').text(dd + 1);
      }
    
      // 텍스트 변환 시간이 2초 여서 1초 뒤부터 dDay() 함수를 1초 단위로 호출해서 출력한다
      setTimeout(function () {
          setInterval(dDay, 1000);
      }, 1000); 
    }

  });

});

