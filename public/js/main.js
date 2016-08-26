(function() {
  var $scrollBlocks, animationInProgress, flag, scroll, wheelTimer;
  flag = 0;
  scroll = void 0;
  wheelTimer = void 0;
  animationInProgress = false;
  $scrollBlocks = $('.js-scrollBlock');
  return window.addEventListener('wheel', function(e) {
    if (animationInProgress) {
      scroll = void 0;
    } else {
      if (e.deltaY > 1) {
        scroll = 'down';
      } else if (e.deltaY < -1) {
        scroll = 'up';
      }
      if (wheelTimer) {
        clearTimeout(wheelTimer);
      }
    }
    wheelTimer = setTimeout(function() {
      if (scroll === 'down' && flag < ($scrollBlocks.length - 1)) {
        flag++;
        $scrollBlocks.removeClass('is-visible');
        animationInProgress = true;
        $scrollBlocks.eq(flag).addClass('is-visible').on('transitionend', function() {
          return animationInProgress = false;
        });
      } else if (scroll === 'up' && flag > 0) {
        flag--;
        $scrollBlocks.removeClass('is-visible');
        animationInProgress = true;
        $scrollBlocks.eq(flag).addClass('is-visible').on('transitionend', function() {
          return animationInProgress = false;
        });
      }
    }, 100);
  }, {
    passive: true
  });
})();
