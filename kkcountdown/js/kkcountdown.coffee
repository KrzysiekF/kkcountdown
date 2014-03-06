#  
#  Plugin kkcountdown counts down to specific dates in the future.
# 
#  @example
#  $(".come-class").kkcountdown();
# 
#  @type jQuery Plugin
# 
#  @name kkcountdown
#  @author Krzysztof Furtak :: http://krzysztof-furtak.pl/
#  @version 1.4.1
# 
#  Documentation: http://krzysztof-furtak.pl/kk-countdown-jquery-plugin/
# 

class KKCountdown

  version: '1.4.1'

  defaults:
    # Texts
    dayText         :   'day '
    days2Text       :   'days '
    daysText        :   'days '

    hourText        :   'hour '
    hours2Text      :   'hours '
    hoursText       :   'hours '

    minutesText     :   ':'
    secondsText     :   ''
    textAfterCount  :   '---'

    # Main Settings
    oneDayClass     :   false
    displayDays     :   true
    displayZeroDays :   true
    addClass        :   false
    callback        :   false
    warnSeconds     :   60
    warnClass       :   false
    rusNumbers      :   false

    #Classes
    boxContenerClass  :   'kkcountdown-box'
    boxDaysClass      :   'kkc-days'
    boxHoursClass     :   'kkc-hours'
    boxMinClass       :   'kkc-min'
    boxSecClass       :   'kkc-sec'
    boxDaysTextClass  :   'kkc-days-text'
    boxHoursTextClass :   'kkc-hours-text'
    boxMinTextClass   :   'kkc-min-text'
    boxSecTextClass   :   'kkc-sec-text'

    # Themes 
    theme           :   false       # can choose: dark
    themeSize       :   'default'   # can choose: big, default, small


  constructor: (el, options) ->

    _this = @

    @opts = $.extend({}, @defaults, options)
    @$el = $(el)
    @countdowns = []

    @prepareHTML()
    @countdownInit(@$el)

  
  prepareHTML:  ->
    _this = @
    
    box = $(document.createElement('span')).addClass( _this.opts.boxContenerClass )
    boxDays = $(document.createElement('span')).addClass( _this.opts.boxDaysClass )
    boxHours = $(document.createElement('span')).addClass( _this.opts.boxHoursClass )
    boxMin = $(document.createElement('span')).addClass( _this.opts.boxMinClass )
    boxSec = $(document.createElement('span')).addClass( _this.opts.boxSecClass )
    boxDaysText = $(document.createElement('span')).addClass( _this.opts.boxDaysTextClass )
    boxHoursText = $(document.createElement('span')).addClass( _this.opts.boxHoursTextClass )
    boxMinText = $(document.createElement('span')).addClass( _this.opts.boxMinTextClass )
    boxSecText = $(document.createElement('span')).addClass( _this.opts.boxSecTextClass )


    box.addClass(_this.opts.addClass) if _this.opts.addClass

    
    boxHoursText.html(_this.opts.hoursText)
    boxMinText.html(_this.opts.minutesText)
    boxSecText.html(_this.opts.secondsText)


    box
      .append(boxDays)
      .append(boxDaysText)
      .append(boxHours)
      .append(boxHoursText)
      .append(boxMin)
      .append(boxMinText)
      .append(boxSec)
      .append(boxSecText)


    @$el.append(box);

  countdownInit: (obj) ->
    count = 0
    _this = @

    #Jesli nie istnieje ID obiektu to tworzymy losowe ID
    obj.id = 'kk_'+ Math.random( new Date().getTime() ) if obj.id == undefined

    if _this.countdowns[obj.id] or _this.countdowns[obj.id] == 0
      count = _this.countdowns[obj.id]
    else
      count = obj.data('seconds')

    if count == undefined
      now = new Date()
      now = Math.floor(now.getTime() / 1000)
      
      event = obj.data('time')

      if event == undefined 
        event = obj.attr('time'); # backward-compatibility
        
      count = event - now;

    _this.countdowns[obj.id] = count - 1

    obj.addClass(_this.opts.warnClass) if _this.opts.warnClass and count < _this.opts.warnSeconds

    if count <= 0

      obj.html(_this.opts.textAfterCount)
      _this.opts.callback.call(obj) if _this.opts.callback

    else if count <= 24 * 60 * 60

      @countdown(true, obj, count)

      setTimeout ->
        _this.countdownInit(obj)
      , 1000

    else

      @countdown(false, obj, count)

      setTimeout ->
        _this.countdownInit(obj)
      , 1000


  countdown: (warning, obj, count) ->
    _this = @

    seconds = @fixTime( count % 60 )
    count = Math.floor( count / 60 )

    minutes = @fixTime( count % 60 )
    count = Math.floor( count / 60 )

    hours = @fixTime( count % 24 )
    count = Math.floor( count / 24 )

    days = count

    obj.addClass _this.opts.oneDayClass if _this.opts.oneDayClass and warning

    if _this.opts.displayZeroDays and days >= 0
      obj.find( '.' + _this.opts.boxDaysClass ).html days
      obj.find( '.' + _this.opts.boxDaysTextClass ).html @formatText(days, 'day')

    obj.find('.' + _this.opts.boxHoursClass ).html hours
    obj.find('.' + _this.opts.boxHoursTextClass ).html @formatText(hours, 'hour')

    obj.find('.' + _this.opts.boxMinClass ).html minutes
    obj.find('.' + _this.opts.boxSecClass ).html seconds
    

  formatText: (nr, text) ->
    _this = @

    daysText = _this.opts[text + 'sText']

    if _this.opts.rusNumbers
        if nr >= 5 and nr < 20
            daysText = _this.opts[text + 'sText']
        else
            
            lastDigit = ("" + nr).replace(/^\d+(\d)$/, '$1') * 1

            if lastDigit == 1
              daysText = _this.opts[text + 'Text']
            else
                if lastDigit >= 2 and lastDigit <= 4
                  daysText = _this.opts[text+'s2Text'];
                else
                  daysText = _this.opts[text+'sText'];
                
    else
      if nr == 1
        daysText = _this.opts[text + 'Text']
      else
        daysText = _this.opts[text + 'sText']

        

  fixTime: (nr) ->
    if nr < 10
      nr = '0' + nr
    else
      nr = nr


# Define the plugin
$.fn.extend kkcountdown: (option) ->
  @each ->
    $this = $(this)
    data = $this.data('kkcountdown')

    if !data
      $this.data 'kkcountdown', (data = new KKCountdown(this, option))
    if typeof option == 'string'
      data[option].apply(data, args)

