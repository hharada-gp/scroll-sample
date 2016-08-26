do ->
  flag = 0
  scroll = undefined
  wheelTimer = undefined
  animationInProgress = false
  $scrollBlocks = $('.js-scrollBlock')

  toggleFlags = ->
    animationInProgress = true
    $scrollBlocks.each (i)->
      $(this).removeClass('is-current is-prev is-next')
      if i == flag
        $(this).addClass('is-current').on('transitionend', ->
          animationInProgress = false
        )
      else if i == (flag-1)
        $(this).addClass('is-prev')
      else if i == (flag+1)
        $(this).addClass('is-next')

  window.addEventListener 'touchmove', (e)->
    e.preventDefault()
    event = document.createEvent 'HTMLEvents'
    event.initEvent 'wheel', true, false
    return window.dispatchEvent(event)

  window.addEventListener 'wheel', (e)->
    console.log e
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
        toggleFlags()
      else if scroll == 'up' && flag > 0
        flag--
        toggleFlags()
      return
    , 100

    return
  , { passive: true }