var scrollBlocks;

scrollBlocks = document.getElementsByClassName('js-scrollBlock');

(function() {
  var current;
  current = 0;
  return window.addEventListener('wheel', function(e) {
    if ((e.deltaY > 2) && (current < 2000)) {
      current = current + e.deltaY;
      console.log(current);
    } else if ((e.deltaY < -2) && (current >= 0)) {
      current = current + e.deltaY;
      console.log(current);
    }
    if (current < 500) {
      $('.js-scrollBlock').removeClass('is-visible');
      $('#0').addClass('is-visible');
    } else if (current >= 500 && current < 1000) {
      $('.js-scrollBlock').removeClass('is-visible');
      $('#1').addClass('is-visible');
    } else if (current >= 1000 && current < 1500) {
      $('.js-scrollBlock').removeClass('is-visible');
      $('#2').addClass('is-visible');
    } else if (current >= 1500) {
      $('.js-scrollBlock').removeClass('is-visible');
      $('#3').addClass('is-visible');
    }
  });
})();
