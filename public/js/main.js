(function() {
  var $scrollBlocks, flag, scroll, wheelTimer;
  flag = 0;
  scroll = void 0;
  wheelTimer = void 0;
  $scrollBlocks = $('.js-scrollBlock');
  return window.addEventListener('wheel', function(e) {
    if (e.deltaY > 1) {
      scroll = 'down';
    } else if (e.deltaY < -1) {
      scroll = 'up';
    }
    if (wheelTimer) {
      clearTimeout(wheelTimer);
    }
    wheelTimer = setTimeout(function() {
      if (scroll === 'down' && flag < ($scrollBlocks.length - 1)) {
        flag++;
        $scrollBlocks.removeClass('is-visible');
        $scrollBlocks.eq(flag).addClass('is-visible');
      } else if (scroll === 'up' && flag > 0) {
        flag--;
        $scrollBlocks.removeClass('is-visible');
        $scrollBlocks.eq(flag).addClass('is-visible');
      }
    }, 100);
  }, {
    passive: true
  });
})();
