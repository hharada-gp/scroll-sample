do ->
  slide = 0
  scroll = undefined
  wheelTimer = undefined
  limitTimer = undefined
  limitPassed = false
  animationInProgress = false
  $scrollBlocks = $('.js-scrollBlock')

  toggleSlides = ->
    animationInProgress = true
    $scrollBlocks.each (i)->
      $(this).removeClass('is-current is-prev is-next')
      if i == slide
        $(this).addClass('is-current').on('transitionend', ->
          animationInProgress = false
        )
      else if i == (slide-1)
        $(this).addClass('is-prev')
      else if i == (slide+1)
        $(this).addClass('is-next')
    return

  wheelAction = ->
    if scroll == 'down' && slide < ($scrollBlocks.length - 1)
      slide++
      toggleSlides()
    else if scroll == 'up' && slide > 0
      slide--
      toggleSlides()
    return

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
      if !limitPassed
        wheelAction()
        clearTimeout limitTimer
      limitTimer = undefined
      limitPassed = false
      return
    , 100

    if limitTimer == undefined
      limitTimer = setTimeout ->
        wheelAction()
        limitPassed = true
        return
      , 500
    return

  window.addEventListener 'touchmove', (e)->
    e.preventDefault()
    event = document.createEvent 'HTMLEvents'
    event.initEvent 'wheel', true, false
    return window.dispatchEvent(event)

  return
