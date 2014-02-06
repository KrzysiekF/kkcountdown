(function() {
  (function($, window) {
    var KKCountdown;
    KKCountdown = (function() {
      KKCountdown.prototype.defaults = {
        paramA: 'foo',
        paramB: 'bar'
      };

      function KKCountdown(el, options) {
        this.options = $.extend({}, this.defaults, options);
        this.$el = $(el);
        this.myMethod('ccc');
      }

      KKCountdown.prototype.myMethod = function(echo) {
        return this.$el.html(this.options.paramA + ': ' + echo);
      };

      return KKCountdown;

    })();
    return $.fn.extend({
      kkcountdown: function(option) {
        return this.each(function() {
          var $this, data;
          $this = $(this);
          data = $this.data('kkcountdown');
          if (!data) {
            $this.data('kkcountdown', (data = new KKCountdown(this, option)));
          }
          if (typeof option === 'string') {
            return data[option].apply(data, args);
          }
        });
      }
    });
  })(window.jQuery, window);

}).call(this);
