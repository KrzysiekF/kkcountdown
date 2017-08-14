class KKCountdown {
  defaults = {
    dayText: 'day ',
    daysText: 'days ',
    hourText: 'hour ',
    hoursText: 'hours ',
    minuteText: ':',
    minutesText: ':',
    secondText: '',
    secondsText: '',

    textAfterCount: '---',
    oneDayClass: false, //TODO: obsłużyć
    displayDays: true, //TODO: obsłużyć
    displayZeroDays: true, //TODO: obsłużyć
    customClass: false, //TODO: obsłużyć - dodatkowe klasy na kontener
    callback: false, //TODO: obsłużyć
    warnSeconds: 60, //TODO: obsłużyć
    warnClass: false, //TODO: obsłużyć

    containerClass: 'kkcd-container',
    secondsClass: 'kkcd-seconds',
    minutesClass: 'kkcd-minutes',
    hoursClass: 'kkcd-hours',
    daysClass: 'kkcd-days',

    secondsTextClass: 'kkcd-seconds-text',
    minutesTextClass: 'kkcd-minutes-text',
    hoursTextClass: 'kkcd-hours-text',
    daysTextClass: 'kkcd-days-text',
  };

  seconds = 0;
  minutes = 0;
  hours = 0;
  days = 0;

  loop = null;

  get countTo() {
    return this._countTo;
  }
  set countTo(value) {
    console.log('-> countTo: ', value);
    this._countTo = value;
  }
  get container() {
    return this._container;
  }
  set container(value) {
    console.log('-> container: ', value);
    this._container = value;
  }

  constructor(options = {}) {
    this._container = null;
    this._countTo = null;

    this.setOptions(options);
  }

  setOptions(options) {
    this.options = Object.assign({}, options, this.defaults);
    console.log('=> options: ', this.options);
  }

  stop() {
    clearInterval(this.loop);
  }

  start() {
    this.countdown();
    this.loop = setInterval(() => { this.countdown(); }, 1000);
  }

  finish() {
    this.stop();
    this.container.innerHTML = this.prepareFinishString();
  }

  countdown() {
    const now = Math.floor(new Date().getTime() / 1000);
    const dateTo = Math.floor(new Date(this.countTo).getTime() / 1000);
    let count = dateTo - now;

    if (count <= 0) {
      this.finish();
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
  }

  formatText(number, text) {
    return number > 1 ? this.options[`${text}sText`] : this.options[`${text}Text`];
  }

  prepareCountdownString() {
    const { containerClass, secondsClass, minutesClass, hoursClass, daysClass, secondsTextClass, minutesTextClass, hoursTextClass, daysTextClass } = this.options;

    const secondsText = `<span class="${secondsTextClass}">${this.formatText(this.seconds, 'second')}</span>`;
    const seconds = `<span class="${secondsClass}">${this.seconds}${secondsText}</span>`;

    const minutesText = `<span class="${minutesTextClass}">${this.formatText(this.minutes, 'minute')}</span>`;
    const minutes = `<span class="${minutesClass}">${this.minutes}${minutesText}</span>`;

    const hoursText = `<span class="${hoursTextClass}">${this.formatText(this.hours, 'hour')}</span>`;
    const hours = `<span class="${hoursClass}">${this.hours}${hoursText}</span>`;

    const daysText = `<span class="${daysTextClass}">${this.formatText(this.days, 'day')}</span>`;
    const days = `<span class="${daysClass}">${this.days}${daysText}</span>`;

    return `<span class="${containerClass}">${days}${hours}${minutes}${seconds}</span>`;
  }

  prepareFinishString() {
    const { containerClass, textAfterCount } = this.options;

    return `<span class="${containerClass}">${textAfterCount}</span>`;
  }

  fixNumber(number) {
    return number >= 10 ? (number) : ('0' + number);
  }
}

export default KKCountdown;