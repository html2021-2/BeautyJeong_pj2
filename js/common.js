$(document).ready(function () {
  //pc, mobile 헤더 공통
  //스크롤
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 10) $('.header').addClass('on');
    else $('#pcHeader').removeClass('on');
  });

  //언어선택 - 열기
  $('#pcHeader .lang button').on('mouseenter click focus', function () {
    $(this).next().stop().slideDown('fast');

  });
  //언어선택 - 닫기
  $('#pcHeader .lang').on('mouseleave', function () {
    $(this).children('ul').stop().slideUp('fast');
  });

  $('#pcHeader .lang').find('button,  a:last').on('blur', function () {
    setTimeout(function () {
      if (!$('#pcHeader .lang button, #pcHeader .lang a').is(':focus')) $('#pcHeader .lang').trigger('mouseleave');
    }, 10);
  });

  //pcGnb
  //뎁스1 li에 마우스, 키보드 진입
  const $pcGnb = $('#pcGnb > ul');
  const $gnbDep2 = $pcGnb.find('.dep2');
  const $gnbDep3 = $gnbDep2.find('.dep3');
  //depth2,배너슬라이더 숨기기
  $gnbDep2.hide();
  $gnbDep3.hide();
  $('#pcGnb .swiper-container').hide();
  //뎁스1 a: 마우스, 키보드 진입하면
  $pcGnb.find('> li > a').on('mouseenter focus', function () {
    //초기화: 먼저 열려진 뎁스1 li.on 제거, 자식 ul 숨기기
    $pcGnb.find('> li.on').removeClass('on').children('.dep2').hide().parents('ul').next().hide();
    //현재 활성화
    $(this).next().show().parent().addClass('on').parents('ul').next().show();
    //헤더.active추가 : 뎁스2 없으면 추가하지 말기
    if ($(this).next().length !== 0) $('#pcHeader').addClass('active');
    else $('#pcHeader').removeClass('active');
  });

  //뎁스2 a : 마우스, 키보드 진입하면
  $gnbDep2.find('> ul > li > a').on('mouseenter focus', function () {
    //현재 선택된 a의 바로 뒤 ul(뎁스3)은 보이게 하고 부모 li.on추가, 나머지 형제는 .on제거 및 열려진 뎁스3 숨기기
    if ($(this).next().length !== 0) {//뎁스2 있는 경우
      $(this).next().show().parent().addClass('on').siblings('li.on').removeClass('on').children('ul').hide();
    }
    //뎁스3가 없는 경우 현재 선택된 a의 부모 li.on만 추가시키고, 나머지 형제는 뎁스2 .on제거 및 뎁스3 숨기기
    else $(this).parent().addClass('on').siblings('li.on').removeClass('on').children('ul').hide();
  });

  //마우스 이탈 - 뎁스1 ul에서 마우스 나오면 처음으로 되돌리기-초기화
  $pcGnb.on('mouseleave', function () {
    //초기화 : 먼저 열려진 뎁스1 li.on 제거, 자식 ul과 배너슬라이더 숨기기
    $(this).find('> li.on').removeClass('on').children('.dep2').hide().parents('ul').next().hide();
    $('#pcHeader').removeClass('active');
  });

  $pcGnb.find('a').first().on('keydown', function (e) {
    if ((e.shiftKey === true && e.keyCode === 9) || (e.keyCode === 16)) $pcGnb.trigger('mouseleave');
  });
  $pcGnb.find('a').last().on('keydown', function (e) {
    if ((!e.shiftKey === true && e.keyCode === 9) || (!e.keyCode === 16)) $pcGnb.trigger('mouseleave');
  });

  //배너슬라이더에 마우스,포커스 진입시 gnb.on
  $('#pcGnb .swiper-container').on('mouseenter focusin', function () {
    //현재 활성화
    $pcGnb.find('> li > a').next().show().parents('ul').next().show();
    $('#pcHeader').addClass('active');
  });

  //배너슬라이더에 마우스,포커스 이탈시: 마우스가 아직 헤더 배경안에 있다면 뎁스2 ul은 닫아주지 말고 마우스가 헤더를 벗어났다면 배너 슬라이더와 해더배경과 뎁스2 ul도 닫아주기
  $('#pcGnb .swiper-container').on('mouseleave focusout', function () {
    $pcGnb.find('> li > a').next().hide().parents('ul').next().hide();
    $('#pcHeader').removeClass('active');
  });



  //header : 배너 슬라이더
  const swiper = new Swiper('#pcGnb .swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    observer: true,
    observeParents: true
  });

  $('#pcGnb .swiper-container').on('mousemove', function (e) {
    const mouseX = e.pageX;
    const mouseY = e.pageY;
    //console.log(mouseX, mouseY);
    gsap.to('#cursorDrag', {left: mouseX, top: mouseY}); 
  });

  //top 이동
  $('.btn_top').on('click', function () {
    $("html, body").stop().animate({scrollTop: 0});
    $('#pcHeader .logo a').focus();
		return false;
  });
  
  //top슬라이딩으로 따라다니기
  let btnTop = $('#forTop .btn_top').css('top'); 
  btnTop = parseInt(btnTop);
  if ($(window).width() > 1024) {
    $(window).on('scroll', function () {
      const scrollY = $(this).scrollTop();
      const toCnt2Hei = $('#container .cnt1').height() + $('.cnt2').height();
      console.log(toCnt2Hei);
      const btnPos = btnTop + scrollY - toCnt2Hei + 300;      
      if (scrollY > toCnt2Hei) $('#forTop .btn_top').css({top: btnPos});
      //else if(($(window).width() >= 768) && (scrollY > $('#container .cnt1').height())) $('#forTop .btn_top').css({top: btnPos});
      //else $('#forTop .btn_top').css({top: btnPos + 10});
    }); 
  } 

  //모바일 top버튼 위치
  if ($(window).width() <= 1024) {
    const cntTreeHei = $('#cnt3').height();
    const cntFourHei = $('#cnt4').height();
    const totalHei = cntTreeHei + cntFourHei;
    $('#forTop .btn_top').css({top:totalHei + 70, right: 20});
  }

  //forTop의 높이구하기
  const $forTop = $('#forTop');
  const forTopHei = $forTop.children().height();
  $forTop.css('height', forTopHei);

  

  
});