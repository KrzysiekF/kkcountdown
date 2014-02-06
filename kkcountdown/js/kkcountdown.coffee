# Define the plugin class
class KKCountdown

  defaults:
    dayText         :   'day '
    days2Text       :   'days '
    daysText        :   'days '
    hourText        :   ':'
    hours2Text      :   'hours '
    hoursText       :   ':'
    minutesText     :   ':'
    secondsText     :   ''
    textAfterCount  :   '---'
    oneDayClass     :   false
    displayDays     :   true
    displayZeroDays :   true
    addClass        :   false
    callback        :   false
    warnSeconds     :   60
    warnClass       :   false
    rusNumbers      :   false

  opts = null
  countdowns = []

  constructor: (el, options) ->
    opts = $.extend({}, @defaults, options)
    @$el = $(el)

    @prepareHTML()
    @countdownInit(@$el)

  
  prepareHTML:  ->
    box = $(document.createElement('span')).addClass('kkcountdown-box')
    boxDni = $(document.createElement('span')).addClass('kkc-dni')
    boxGodz = $(document.createElement('span')).addClass('kkc-godz')
    boxMin = $(document.createElement('span')).addClass('kkc-min')
    boxSec = $(document.createElement('span')).addClass('kkc-sec')
    boxDniText = $(document.createElement('span')).addClass('kkc-dni-text')
    boxGodzText = $(document.createElement('span')).addClass('kkc-godz-text')
    boxMinText = $(document.createElement('span')).addClass('kkc-min-text')
    boxSecText = $(document.createElement('span')).addClass('kkc-sec-text')


    box.addClass(opts.addClass) if opts.addClass

    
    boxGodzText.html(opts.hoursText)
    boxMinText.html(opts.minutesText)
    boxSecText.html(opts.secondsText)


    box
      .append(boxDni)
      .append(boxDniText)
      .append(boxGodz)
      .append(boxGodzText)
      .append(boxMin)
      .append(boxMinText)
      .append(boxSec)
      .append(boxSecText)


    @$el.append(box);

  countdownInit: (obj) -> 
    count = 0

    #Jesli nie istnieje ID obiektu to tworzymy losowe ID
    obj.id = 'kk_'+ Math.random( new Date().getTime() ) if obj.id == undefined

    if obj.id in countdowns
      count = countdowns[obj.id]
    else
      count = obj.data('seconds')

    if count == undefined
      now = new Date()
      now = Math.floor(now.getTime() / 1000)
      
      event = obj.data('time')

      if event == undefined 
        event = obj.attr('time'); # backward-compatibility
        
      count = event - now;

    console?.log(count)


# Define the plugin
$.fn.extend kkcountdown: (option) ->
  @each ->
    $this = $(this)
    data = $this.data('kkcountdown')

    if !data
      $this.data 'kkcountdown', (data = new KKCountdown(this, option))
    if typeof option == 'string'
      data[option].apply(data, args)

