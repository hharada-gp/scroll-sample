do ->
  slide = 0
  scroll = undefined
  wheelTimer = undefined
  animationInProgress = false
  setTimeLimit = false
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
    console.log 'wheeled'
    if scroll == 'down' && slide < ($scrollBlocks.length - 1)
      slide++
      toggleSlides()
    else if scroll == 'up' && slide > 0
      slide--
      toggleSlides()
    return

  window.addEventListener 'wheel', (e)->
    console.log e
    e.preventDefault()
    if animationInProgress
      scroll = undefined
    else
      if e.deltaY > 1
        scroll = 'down'
      else if e.deltaY < -1
        scroll = 'up'

    if wheelTimer
      clearTimeout wheelTimer

    if !setTimeLimit
      setTimeLimit = true
      limitTimer = setTimeout ->
        console.log 'time out.'
        clearTimeout wheelTimer
        setTimeLimit = false
        return
      , 1000

    wheelTimer = setTimeout ->
      wheelAction()
    , 100
    return

  window.addEventListener 'touchmove', (e)->
    e.preventDefault()
    event = document.createEvent 'HTMLEvents'
    event.initEvent 'wheel', true, false
    return window.dispatchEvent(event)

  return
