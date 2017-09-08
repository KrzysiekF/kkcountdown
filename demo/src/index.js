import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.css';
import 'normalize.css';
import 'gridlex/docs/gridlex.min.css';
import moment from 'moment';

import KKCountdown from '../../src/index';

import './style.css';

class Demo {
  constructor() {
    console.log('==> DEMO <==');

    this.demoStart();
  }

  demoStart() {
    const countdown = new KKCountdown({
      textAfterCount: '',
      oneDayClass: 'kk-test',
      displayDays: true,
      displayZeroDays: true,
      customClass: 'kk-custom',
      afterFinish: () => {},
      warnSeconds: 60,
      warnClass: 'kk-warn',
    });
    countdown.container = document.getElementById('app-1');
    countdown.countTo = moment().add(10, 'd');
    countdown.start();

    document.getElementById('app-1-start').addEventListener('click', () => {
      countdown.start();
    });

    document.getElementById('app-1-stop').addEventListener('click', () => {
      countdown.stop();
    });

    const countdown1 = new KKCountdown();
    countdown1.container = document.getElementById('app-2');
    countdown1.countTo = '2018-12-01T12:00:00.00';
    countdown1.start();

    const countdown2 = new KKCountdown({
      textAfterCount: '',
      oneDayClass: 'kk-test',
      customClass: 'kk-custom',
      afterFinish: () => { console.log('===> FINISH!!!'); },
      warnSeconds: 60,
      warnClass: 'kk-warn',
    });
    countdown2.container = document.getElementById('app-3');
    countdown2.countTo = 65;
    countdown2.start();
  }
}

window.onload = function() {
  new Demo();
};
