(($, window) ->
 
  # Define the plugin class
  class KKCountdown
 
    defaults:
      paramA: 'foo'
      paramB: 'bar'
 
    constructor: (el, options) ->
      @options = $.extend({}, @defaults, options)
      @$el = $(el)
      @myMethod('ccc')
 
    # Additional plugin methods go here
    myMethod: (echo) ->
      @$el.html(@options.paramA + ': ' + echo)

 
  # Define the plugin
  $.fn.extend kkcountdown: (option) ->
    @each ->
      $this = $(this)
      data = $this.data('kkcountdown')
 
      if !data
        $this.data 'kkcountdown', (data = new KKCountdown(this, option))
      if typeof option == 'string'
        data[option].apply(data, args)
 
) window.jQuery, window