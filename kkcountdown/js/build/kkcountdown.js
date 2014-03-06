(function() {
  var KKCountdown;

  KKCountdown = (function() {
    KKCountdown.prototype.version = '1.4.1';

    KKCountdown.prototype.defaults = {
      dayText: 'day ',
      days2Text: 'days ',
      daysText: 'days ',
      hourText: 'hour ',
      hours2Text: 'hours ',
      hoursText: 'hours ',
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
      rusNumbers: false,
      boxContenerClass: 'kkcountdown-box',
      boxDaysClass: 'kkc-days',
      boxHoursClass: 'kkc-hours',
      boxMinClass: 'kkc-min',
      boxSecClass: 'kkc-sec',
      boxDaysTextClass: 'kkc-days-text',
      boxHoursTextClass: 'kkc-hours-text',
      boxMinTextClass: 'kkc-min-text',
      boxSecTextClass: 'kkc-sec-text',
      theme: false,
      themeSize: 'default'
    };

    function KKCountdown(el, options) {
      var _this;
      _this = this;
      this.opts = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.countdowns = [];
      this.prepareHTML();
      this.countdownInit(this.$el);
    }

    KKCountdown.prototype.prepareHTML = function() {
      var box, boxDays, boxDaysText, boxHours, boxHoursText, boxMin, boxMinText, boxSec, boxSecText, _this;
      _this = this;
      box = $(document.createElement('span')).addClass(_this.opts.boxContenerClass);
      boxDays = $(document.createElement('span')).addClass(_this.opts.boxDaysClass);
      boxHours = $(document.createElement('span')).addClass(_this.opts.boxHoursClass);
      boxMin = $(document.createElement('span')).addClass(_this.opts.boxMinClass);
      boxSec = $(document.createElement('span')).addClass(_this.opts.boxSecClass);
      boxDaysText = $(document.createElement('span')).addClass(_this.opts.boxDaysTextClass);
      boxHoursText = $(document.createElement('span')).addClass(_this.opts.boxHoursTextClass);
      boxMinText = $(document.createElement('span')).addClass(_this.opts.boxMinTextClass);
      boxSecText = $(document.createElement('span')).addClass(_this.opts.boxSecTextClass);
      if (_this.opts.addClass) {
        box.addClass(_this.opts.addClass);
      }
      boxHoursText.html(_this.opts.hoursText);
      boxMinText.html(_this.opts.minutesText);
      boxSecText.html(_this.opts.secondsText);
      box.append(boxDays).append(boxDaysText).append(boxHours).append(boxHoursText).append(boxMin).append(boxMinText).append(boxSec).append(boxSecText);
      return this.$el.append(box);
    };

    KKCountdown.prototype.countdownInit = function(obj) {
      var count, event, now, _this;
      count = 0;
      _this = this;
      if (obj.id === void 0) {
        obj.id = 'kk_' + Math.random(new Date().getTime());
      }
      if (_this.countdowns[obj.id] || _this.countdowns[obj.id] === 0) {
        count = _this.countdowns[obj.id];
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
      _this.countdowns[obj.id] = count - 1;
      if (_this.opts.warnClass && count < _this.opts.warnSeconds) {
        obj.addClass(_this.opts.warnClass);
      }
      if (count <= 0) {
        obj.html(_this.opts.textAfterCount);
        if (_this.opts.callback) {
          return _this.opts.callback.call(obj);
        }
      } else if (count <= 24 * 60 * 60) {
        this.countdown(true, obj, count);
        return setTimeout(function() {
          return _this.countdownInit(obj);
        }, 1000);
      } else {
        this.countdown(false, obj, count);
        return setTimeout(function() {
          return _this.countdownInit(obj);
        }, 1000);
      }
    };

    KKCountdown.prototype.countdown = function(warning, obj, count) {
      var days, hours, minutes, seconds, _this;
      _this = this;
      seconds = this.fixTime(count % 60);
      count = Math.floor(count / 60);
      minutes = this.fixTime(count % 60);
      count = Math.floor(count / 60);
      hours = this.fixTime(count % 24);
      count = Math.floor(count / 24);
      days = count;
      if (_this.opts.oneDayClass && warning) {
        obj.addClass(_this.opts.oneDayClass);
      }
      if (_this.opts.displayZeroDays && days >= 0) {
        obj.find('.' + _this.opts.boxDaysClass).html(days);
        obj.find('.' + _this.opts.boxDaysTextClass).html(this.formatText(days, 'day'));
      }
      obj.find('.' + _this.opts.boxHoursClass).html(hours);
      obj.find('.' + _this.opts.boxHoursTextClass).html(this.formatText(hours, 'hour'));
      obj.find('.' + _this.opts.boxMinClass).html(minutes);
      return obj.find('.' + _this.opts.boxSecClass).html(seconds);
    };

    KKCountdown.prototype.formatText = function(nr, text) {
      var daysText, lastDigit, _this;
      _this = this;
      daysText = _this.opts[text + 'sText'];
      if (_this.opts.rusNumbers) {
        if (nr >= 5 && nr < 20) {
          return daysText = _this.opts[text + 'sText'];
        } else {
          lastDigit = ("" + nr).replace(/^\d+(\d)$/, '$1') * 1;
          if (lastDigit === 1) {
            return daysText = _this.opts[text + 'Text'];
          } else {
            if (lastDigit >= 2 && lastDigit <= 4) {
              return daysText = _this.opts[text + 's2Text'];
            } else {
              return daysText = _this.opts[text + 'sText'];
            }
          }
        }
      } else {
        if (nr === 1) {
          return daysText = _this.opts[text + 'Text'];
        } else {
          return daysText = _this.opts[text + 'sText'];
        }
      }
    };

    KKCountdown.prototype.fixTime = function(nr) {
      if (nr < 10) {
        return nr = '0' + nr;
      } else {
        return nr = nr;
      }
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
