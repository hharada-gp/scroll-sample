(function() {
  var $scrollBlocks, animationInProgress, limitPassed, limitTimer, scroll, slide, toggleSlides, wheelAction, wheelTimer;
  slide = 0;
  scroll = void 0;
  wheelTimer = void 0;
  limitTimer = void 0;
  limitPassed = false;
  animationInProgress = false;
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
    if (scroll === 'down' && slide < ($scrollBlocks.length - 1)) {
      slide++;
      toggleSlides();
    } else if (scroll === 'up' && slide > 0) {
      slide--;
      toggleSlides();
    }
  };
  window.addEventListener('wheel', function(e) {
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
    wheelTimer = setTimeout(function() {
      if (!limitPassed) {
        wheelAction();
        clearTimeout(limitTimer);
      }
      limitTimer = void 0;
      limitPassed = false;
    }, 100);
    if (limitTimer === void 0) {
      limitTimer = setTimeout(function() {
        wheelAction();
        limitPassed = true;
      }, 500);
    }
  });
  window.addEventListener('touchmove', function(e) {
    var event;
    e.preventDefault();
    event = document.createEvent('HTMLEvents');
    event.initEvent('wheel', true, false);
    return window.dispatchEvent(event);
  });
})();
