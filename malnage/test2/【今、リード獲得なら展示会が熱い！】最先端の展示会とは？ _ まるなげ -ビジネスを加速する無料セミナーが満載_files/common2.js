// JavaScript Document

//▼ナビ
$(function () {
  $("#sp-menu").on('click', function () {
    if ($('body').hasClass('side-open')) {
      // 表示されている場合の処理 MENUを隠す
      $('#navi').animate({
        'right': '-400px'
      }, 300);
      $('body').removeClass('side-open');
    } else {
      // 非表示の場合の処理 MENUを表示する
      $('#navi').animate({
        'right': '0'
      }, 300);
      $('body').addClass('side-open');
    }
  });
  $(".overlay").on('click', function () {
    $('#navi').animate({
      'right': '-400px'
    }, 300);
    $('body').removeClass('side-open');
  });
});
//Scroll
$(function () {
  const topBtn = $("#page-top");
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $("body,html").animate({
      scrollTop: 0,
    }, 500);
    return false;
  });
});
//QA
$(function () {
  $('#faq dt').click(function () {
    $(this).next('dd').slideToggle();
    $(this).parent().toggleClass("active");
  });
});
/*ページ内アンカー
var this_element;
jQuery(window).on('load', function () {
  this_element = jQuery('#bn-form').offset().top + jQuery('#bn-form').outerHeight();
});
*/
/*
jQuery(window).scroll(function () {
  if (jQuery(window).scrollTop() + jQuery(window).height() > this_element) {
    jQuery('.stiky_cta').fadeOut();
  } else {
    jQuery('.stiky_cta').fadeIn();
  }
});
*/
jQuery(document).on('click', '.smooth', function () {
  var speed = 1000;
  var href = $(this).attr("href");
  var target = $(href == "#" || href == "" ? 'html' : href);
  var position = target.offset().top;
  $("html, body").animate({
    scrollTop: position
  }, speed, "easeOutExpo");
  return false;
});