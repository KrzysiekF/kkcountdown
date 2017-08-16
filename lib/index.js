'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KKCountdown = function () {
  _createClass(KKCountdown, [{
    key: 'countTo',
    get: function get() {
      return this._countTo;
    },
    set: function set(value) {
      console.log('-> countTo: ', value);
      this._countTo = value;
    }
  }, {
    key: 'container',
    get: function get() {
      return this._container;
    },
    set: function set(value) {
      console.log('-> container: ', value);
      this._container = value;
    }
  }]);

  function KKCountdown() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, KKCountdown);

    this.defaults = {
      dayText: 'day ',
      daysText: 'days ',
      hourText: 'hour ',
      hoursText: 'hours ',
      minuteText: ':',
      minutesText: ':',
      secondText: '',
      secondsText: '',

      textAfterCount: '---',
      oneDayClass: '',
      displayDays: true,
      displayZeroDays: true,
      customClass: '',
      afterFinish: false,
      warnSeconds: 60,
      warnClass: '',

      containerClass: 'kkcd-container',
      secondsClass: 'kkcd-seconds',
      minutesClass: 'kkcd-minutes',
      hoursClass: 'kkcd-hours',
      daysClass: 'kkcd-days',

      secondsTextClass: 'kkcd-seconds-text',
      minutesTextClass: 'kkcd-minutes-text',
      hoursTextClass: 'kkcd-hours-text',
      daysTextClass: 'kkcd-days-text'
    };
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.days = 0;
    this.loop = null;

    this._container = null;
    this._countTo = null;

    this.setOptions(options);
  }

  KKCountdown.prototype.setOptions = function setOptions(options) {
    this.options = Object.assign({}, this.defaults, options);
    console.log('=> options: ', this.options);
  };

  KKCountdown.prototype.stop = function stop() {
    clearInterval(this.loop);
  };

  KKCountdown.prototype.start = function start() {
    var _this = this;

    this.countdown();
    this.loop = setInterval(function () {
      _this.countdown();
    }, 1000);
  };

  KKCountdown.prototype.finish = function finish() {
    this.stop();
    this.container.innerHTML = this.prepareFinishString();
  };

  KKCountdown.prototype.countdown = function countdown() {
    var now = Math.floor(new Date().getTime() / 1000);
    var dateTo = Math.floor(new Date(this.countTo).getTime() / 1000);
    var count = dateTo - now;

    if (count <= 0) {
      this.finish();
      this.options.afterFinish.call(this);
      return false;
    }

    this.seconds = this.fixNumber(count % 60);
    count = Math.floor(count / 60);
    this.minutes = this.fixNumber(count % 60);
    count = Math.floor(count / 60);
    this.hours = this.fixNumber(count % 24);
    count = Math.floor(count / 24);
    this.days = count;

    this.container.innerHTML = this.prepareCountdownString();

    return this;
  };

  KKCountdown.prototype.formatText = function formatText(number, text) {
    return number > 1 ? this.options[text + 'sText'] : this.options[text + 'Text'];
  };

  KKCountdown.prototype.checkLastMoment = function checkLastMoment() {
    return parseInt(this.days, 10) === 0 && parseInt(this.hours, 10) === 0 && parseInt(this.minutes, 10) === 0;
  };

  KKCountdown.prototype.prepareCountdownString = function prepareCountdownString() {
    var _options = this.options,
        containerClass = _options.containerClass,
        secondsClass = _options.secondsClass,
        minutesClass = _options.minutesClass,
        hoursClass = _options.hoursClass,
        daysClass = _options.daysClass,
        secondsTextClass = _options.secondsTextClass,
        minutesTextClass = _options.minutesTextClass,
        hoursTextClass = _options.hoursTextClass,
        daysTextClass = _options.daysTextClass,
        oneDayClass = _options.oneDayClass,
        displayDays = _options.displayDays,
        displayZeroDays = _options.displayZeroDays,
        customClass = _options.customClass,
        warnSeconds = _options.warnSeconds,
        warnClass = _options.warnClass;


    var secondsText = '<span class="' + secondsTextClass + '">' + this.formatText(this.seconds, 'second') + '</span>';
    var seconds = '<span class="' + secondsClass + '">' + this.seconds + secondsText + '</span>';

    var minutesText = '<span class="' + minutesTextClass + '">' + this.formatText(this.minutes, 'minute') + '</span>';
    var minutes = '<span class="' + minutesClass + '">' + this.minutes + minutesText + '</span>';

    var hoursText = '<span class="' + hoursTextClass + '">' + this.formatText(this.hours, 'hour') + '</span>';
    var hours = '<span class="' + hoursClass + '">' + this.hours + hoursText + '</span>';

    var daysText = '<span class="' + daysTextClass + '">' + this.formatText(this.days, 'day') + '</span>';
    var days = '<span class="' + daysClass + '">' + this.days + daysText + '</span>';

    return '\n      <span class="\n        ' + containerClass + ' \n        ' + (oneDayClass && this.days < 1 ? oneDayClass : '') + ' \n        ' + customClass + ' \n        ' + (warnSeconds && this.checkLastMoment() && this.seconds <= warnSeconds ? warnClass : '') + '\n      ">\n        ' + (displayDays ? !displayZeroDays && this.days === 0 ? '' : days : '') + hours + minutes + seconds + '\n      </span>\n    ';
  };

  KKCountdown.prototype.prepareFinishString = function prepareFinishString() {
    var _options2 = this.options,
        containerClass = _options2.containerClass,
        textAfterCount = _options2.textAfterCount;


    return '<span class="' + containerClass + '">' + textAfterCount + '</span>';
  };

  KKCountdown.prototype.fixNumber = function fixNumber(number) {
    return number >= 10 ? number : '0' + number;
  };

  return KKCountdown;
}();

exports.default = KKCountdown;
module.exports = exports['default'];