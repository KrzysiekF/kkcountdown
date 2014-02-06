(function() {
  var KKCountdown,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  KKCountdown = (function() {
    var countdowns, opts;

    KKCountdown.prototype.defaults = {
      dayText: 'day ',
      days2Text: 'days ',
      daysText: 'days ',
      hourText: ':',
      hours2Text: 'hours ',
      hoursText: ':',
      minutesText: ':',
      secondsText: '',
      textAfterCount: '---',
      oneDayClass: false,
      displayDays: true,
      displayZeroDays: true,
      addClass: false,
      callback: false,
      warnSeconds: 60,
      warnClass: false,
      rusNumbers: false
    };

    opts = null;

    countdowns = [];

    function KKCountdown(el, options) {
      opts = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.prepareHTML();
      this.countdownInit(this.$el);
    }

    KKCountdown.prototype.prepareHTML = function() {
      var box, boxDni, boxDniText, boxGodz, boxGodzText, boxMin, boxMinText, boxSec, boxSecText;
      box = $(document.createElement('span')).addClass('kkcountdown-box');
      boxDni = $(document.createElement('span')).addClass('kkc-dni');
      boxGodz = $(document.createElement('span')).addClass('kkc-godz');
      boxMin = $(document.createElement('span')).addClass('kkc-min');
      boxSec = $(document.createElement('span')).addClass('kkc-sec');
      boxDniText = $(document.createElement('span')).addClass('kkc-dni-text');
      boxGodzText = $(document.createElement('span')).addClass('kkc-godz-text');
      boxMinText = $(document.createElement('span')).addClass('kkc-min-text');
      boxSecText = $(document.createElement('span')).addClass('kkc-sec-text');
      if (opts.addClass) {
        box.addClass(opts.addClass);
      }
      boxGodzText.html(opts.hoursText);
      boxMinText.html(opts.minutesText);
      boxSecText.html(opts.secondsText);
      box.append(boxDni).append(boxDniText).append(boxGodz).append(boxGodzText).append(boxMin).append(boxMinText).append(boxSec).append(boxSecText);
      return this.$el.append(box);
    };

    KKCountdown.prototype.countdownInit = function(obj) {
      var count, event, now, _ref;
      count = 0;
      if (obj.id === void 0) {
        obj.id = 'kk_' + Math.random(new Date().getTime());
      }
      if (_ref = obj.id, __indexOf.call(countdowns, _ref) >= 0) {
        count = countdowns[obj.id];
      } else {
        count = obj.data('seconds');
      }
      if (count === void 0) {
        now = new Date();
        now = Math.floor(now.getTime() / 1000);
        event = obj.data('time');
        if (event === void 0) {
          event = obj.attr('time');
        }
        count = event - now;
      }
      return typeof console !== "undefined" && console !== null ? console.log(count) : void 0;
    };

    return KKCountdown;

  })();

  $.fn.extend({
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

}).call(this);
