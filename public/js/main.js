(function() {
  var $scrollBlocks, animationInProgress, flag, scroll, toggleFlags, wheelTimer;
  flag = 0;
  scroll = void 0;
  wheelTimer = void 0;
  animationInProgress = false;
  $scrollBlocks = $('.js-scrollBlock');
  toggleFlags = function() {
    animationInProgress = true;
    return $scrollBlocks.each(function(i) {
      $(this).removeClass('is-current is-prev is-next');
      if (i === flag) {
        return $(this).addClass('is-current').on('transitionend', function() {
          return animationInProgress = false;
        });
      } else if (i === (flag - 1)) {
        return $(this).addClass('is-prev');
      } else if (i === (flag + 1)) {
        return $(this).addClass('is-next');
      }
    });
  };
  return window.addEventListener('wheel', function(e) {
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
      if (scroll === 'down' && flag < ($scrollBlocks.length - 1)) {
        flag++;
        toggleFlags();
      } else if (scroll === 'up' && flag > 0) {
        flag--;
        toggleFlags();
      }
    }, 100);
  }, {
    passive: true
  });
})();
