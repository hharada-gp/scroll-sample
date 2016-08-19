scrollBlocks = document.getElementsByClassName 'js-scrollBlock'

# 現在のスクロール値を取得して、現セクションの半分までスクロールしたら次のセクションの先頭にスクロールする
do ->
  current = 0
  window.addEventListener 'wheel', (e)->
    if (e.deltaY > 2) && (current < 2000)
      current = current + e.deltaY
      console.log current
    else if (e.deltaY < -2) && (current >= 0)
      current = current + e.deltaY
      console.log current

    if current < 500
      $('.js-scrollBlock').removeClass('is-visible')
      $('#0').addClass('is-visible')
    else if current >= 500 && current < 1000
      $('.js-scrollBlock').removeClass('is-visible')
      $('#1').addClass('is-visible')
    else if current >= 1000 && current < 1500
      $('.js-scrollBlock').removeClass('is-visible')
      $('#2').addClass('is-visible')
    else if current >= 1500
      $('.js-scrollBlock').removeClass('is-visible')
      $('#3').addClass('is-visible')
    return
  # smoothScroll = (id)->
  #   speed = 400
  #   $obj = $('#'+id)
  #   target = $obj.offset().top
  #   $('body, html').animate({scrollTop: target}, speed)
  #   return

  # scroll = 0

  # window.addEventListener 'scroll', ->
  #   if scroll < window.pageYOffset #下方向スクロール
  #     scroll = window.pageYOffset
  #     if (window.pageYOffset%window.innerHeight) > window.innerHeight/2 #画面高さの半分より下に来たら
  #       num = window.pageYOffset/window.innerHeight << 0
  #       console.log num+1
  #       document.body.setAttribute 'section-num', (num+1)
  #       window.scrollTo(0, window.innerHeight*(num+1))
  #       # smoothScroll num
  #     else
  #   else if scroll > window.pageYOffset #上方向スクロール
  #     scroll = window.pageYOffset
  #     if (window.pageYOffset%window.innerHeight) < window.innerHeight/2 #画面高さの半分より上に来たら
  #       num = window.pageYOffset/window.innerHeight << 0
  #       console.log num
  #       document.body.setAttribute 'section-num', num
  #       window.scrollTo(0, window.innerHeight*num)
  #       # smoothScroll num
  #     else
  #   return
  # , { passive: true }