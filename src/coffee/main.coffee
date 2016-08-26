do ->
  flag = 0
  scroll = undefined
  wheelTimer = undefined
  animationInProgress = false
  $scrollBlocks = $('.js-scrollBlock')

  window.addEventListener 'wheel', (e)->
    if animationInProgress
      scroll = undefined
    else
      if e.deltaY > 1
        scroll = 'down'
      else if e.deltaY < -1
        scroll = 'up'

      if wheelTimer
        clearTimeout wheelTimer

    wheelTimer = setTimeout ->
      if scroll == 'down' && flag < ($scrollBlocks.length - 1)
        flag++
        $scrollBlocks.removeClass('is-visible')
        animationInProgress = true
        $scrollBlocks.eq(flag).addClass('is-visible').on('transitionend', ->
            animationInProgress = false
          )
      else if scroll == 'up' && flag > 0
        flag--
        $scrollBlocks.removeClass('is-visible')
        animationInProgress = true
        $scrollBlocks.eq(flag).addClass('is-visible').on('transitionend', ->
            animationInProgress = false
          )
      return
    , 100

    return
  , { passive: true }