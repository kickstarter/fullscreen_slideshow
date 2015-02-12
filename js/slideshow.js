/**
 * Kickstarter Year in Review 2013
 *
 * @version 0.0.1
 * @copyright Copyright 2014 Kickstarter, Inc.
 * @license MIT
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

$(document).ready(function(){

  var index = 0,                          // current location in slideshow
      $slides = $('.slide'),              // array of slide elements
      slide = $slides[index],              // currently focused slide
      video = $(slide).find('video')[0],  // current video element
      videos = [],                        // array of video elements
      queued,                                  // video to be played next
      is_touch = Modernizr.touch,
      flipsnap = new Flipsnap('.slideshow', {transitionDuration: 600});

  flipsnap.element.addEventListener('fspointmove', function(e) {
    $('.shifty').removeClass('show-menu');
    $slides.removeClass('active');
    index = e.newPoint; // customized flipsnap event to provide this
    slide = $slides[index];
    if(slide){
      location.hash = index + '-' + slide.id;
    }
    $(slide).addClass('active');
    if (!is_touch){
      unloadVideos();
      loadVideo(index);
      loadVideo(index+1);
      loadVideo(index-1);
      queued = $(slide).find('video')[0];
      setTimeout(function(){
        playVideo();
      });
    }
    $('body').removeClass().addClass( $($slides[index]).attr('id') ).addClass( $($slides[index]).attr('data-color') );
    // if( ($('.js-slide-previous').css('display') !== 'none') && ($('.js-slide-next').css('display') !== 'none') ){
    if ($('.js-slide-previous').is(':visible') || $('.js-slide-next').is(':visible')){
      if (!flipsnap.hasNext()) {
        $('.js-slide-next').addClass('hide');
      } else if (!$('.js-slide-next').is(':visible')){
        $('.js-slide-next').removeClass('hide');
      }
      if (!flipsnap.hasPrev()) {
        $('.js-slide-previous').addClass('hide');
        $('.js-coach-mark').removeClass('hide').addClass('table-cell');
      } else if (!$('.js-slide-previous').is(':visible')){
        $('.js-slide-previous').removeClass('hide');
        $('.js-coach-mark').removeClass('table-cell').addClass('hide');
      } else if ($('.js-coach-mark').is(':visible')){
        $('.js-coach-mark').removeClass('table-cell').addClass('hide');
      }
    }
  }, false);

  function createVideos(){
    $($slides).each(function(i){
      var has_video = $($slides[i]).attr('data-mp4'),
          $new_video,
          $mp4_source,
          $webm_source;
      if(has_video) {
        $new_video = $('<video>');
        $mp4_source = $('<source>');
        $webm_source = $('<source>');
        $new_video.append($mp4_source).append($webm_source);
        $new_video.attr('muted', true);
      }
      videos.push($new_video);
    });
  }

  if(!is_touch){
    createVideos();
  }

  function unloadVideos(){
    $($slides).each(function(i){
      if ( i < (index - 2) || i > (index + 2) ) {
        $($slides[i]).find('video').detach();
      }
    });
  }

  function loadVideo(i){
    var container = $($slides[i]).find('.bg-video-wrap')[0];
    if(container) {
      if (!$(videos[i]).find('source').attr('src')) {
        var mp4 = $($slides[i]).attr('data-mp4'),
            webm = $($slides[i]).attr('data-webm');
        $($(videos[i]).find('source')[0]).attr('src', mp4);
        $($(videos[i]).find('source')[1]).attr('src', webm);
        videos[i].load();
      }
      $(videos[i]).appendTo(container);
    }
  }

  function playVideo(){
    if(video) {
      video.pause();
    }
    if(queued) {
      video = queued;
    }
    if(video) {
      video.play();
      $(video).bind('timeupdate', function(){
        if(video.currentTime > video.duration - 0.3){
          video.currentTime = 0;
          video.play();
        }
      });
    }
  }

  if(location.hash) {
    var $slideshow = $('.slideshow');
    $slideshow.css({transition: 'none'});
    setTimeout(function(){
      $slideshow.css({transition: ''});
    },500);
    index = parseInt(location.hash.split('-')[0].split('#')[1], 10);
    flipsnap.moveToPoint(index);
  }

  $('.js-slide-btn').click(function(e){
    e.preventDefault();
    index = $($(this).attr('href')).index('.slide');
    flipsnap.moveToPoint(index);
  });

  $('.js-slide-next').click(function(){
    closeModals();
    flipsnap.toNext();
  });

  $('.js-slide-previous').click(function(){
    closeModals();
    flipsnap.toPrev();
  });

  if (!flipsnap.hasPrev()) {
    $('.js-slide-previous').addClass('hide');
  }

  function toggleMenu(){
    closeModals();
    if ($('.shifty').hasClass('show-menu')) {
      $('.shifty').removeClass('show-menu');
    } else {
      $('.shifty').addClass('show-menu');
    }
  }

  $('.js-shifty-toggle').click(function(){
    toggleMenu();
  });

  function closeModals(){
    $('.js-modal').fadeOut();
    $('.js-modal').find('.fluid-width-video-wrapper').remove();
  }

  $('.js-show-modal').click(function(){
    var $modal = $(this).parents('.slide').find('.js-modal'),
        $iframe = $('<iframe>'),
        src = $modal.attr('data-src'),
        container = $modal.find('.js-embed-wrap')[0];
    $modal.show();
    $iframe.attr('src', src).attr('frameborder', 0);
    $(container).append($iframe);
    $(container).fitVids();
  });

  $('.js-hide-modal').click(function(){
    closeModals();
  });

  $(document).keydown(function(e){
    if (e.keyCode === 37) {
      closeModals();
      flipsnap.toPrev();
      return false;
    }
    if (e.keyCode === 39) {
      closeModals();
      flipsnap.toNext();
      return false;
    }
    if(e.keyCode === 38 || e.keyCode === 40){
      e.preventDefault();
      closeModals();
      toggleMenu();
    }
  });

});
