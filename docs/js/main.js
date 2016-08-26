(function() {
  var $scrollBlocks, animationInProgress, scroll, setTimeLimit, slide, toggleSlides, wheelAction, wheelTimer;
  slide = 0;
  scroll = void 0;
  wheelTimer = void 0;
  animationInProgress = false;
  setTimeLimit = false;
  $scrollBlocks = $('.js-scrollBlock');
  toggleSlides = function() {
    animationInProgress = true;
    $scrollBlocks.each(function(i) {
      $(this).removeClass('is-current is-prev is-next');
      if (i === slide) {
        return $(this).addClass('is-current').on('transitionend', function() {
          return animationInProgress = false;
        });
      } else if (i === (slide - 1)) {
        return $(this).addClass('is-prev');
      } else if (i === (slide + 1)) {
        return $(this).addClass('is-next');
      }
    });
  };
  wheelAction = function() {
    console.log('wheeled');
    if (scroll === 'down' && slide < ($scrollBlocks.length - 1)) {
      slide++;
      toggleSlides();
    } else if (scroll === 'up' && slide > 0) {
      slide--;
      toggleSlides();
    }
  };
  window.addEventListener('wheel', function(e) {
    var limitTimer;
    console.log(e);
    e.preventDefault();
    if (animationInProgress) {
      scroll = void 0;
    } else {
      if (e.deltaY > 1) {
        scroll = 'down';
      } else if (e.deltaY < -1) {
        scroll = 'up';
      }
    }
    if (wheelTimer) {
      clearTimeout(wheelTimer);
    }
    if (!setTimeLimit) {
      setTimeLimit = true;
      limitTimer = setTimeout(function() {
        console.log('time out.');
        clearTimeout(wheelTimer);
        setTimeLimit = false;
      }, 1000);
    }
    wheelTimer = setTimeout(function() {
      return wheelAction();
    }, 100);
  });
  window.addEventListener('touchmove', function(e) {
    var event;
    e.preventDefault();
    event = document.createEvent('HTMLEvents');
    event.initEvent('wheel', true, false);
    return window.dispatchEvent(event);
  });
})();
