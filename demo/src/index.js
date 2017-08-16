import KKCountdown from '../../src/index';

class Demo {
  constructor() {
    console.log('==> DEMO <==');

    this.demoStart();
  }

  demoStart() {
    const countdown = new KKCountdown({
      textAfterCount: '---',
      oneDayClass: 'kk-test',
      displayDays: true,
      displayZeroDays: true,
      customClass: 'kk-custom',
      afterFinish: () => { alert('OK :)'); },
      warnSeconds: 60,
      warnClass: 'kk-warn',
    });
    countdown.container = document.getElementById('app-1');
    countdown.countTo = '2017-08-16T08:39:00.00';
    countdown.start();

    document.getElementById('app-1-start').addEventListener('click', () => {
      countdown.start();
    });

    document.getElementById('app-1-stop').addEventListener('click', () => {
      countdown.stop();
    });

    const countdown1 = new KKCountdown;
    countdown1.container = document.getElementById('app-2');
    countdown1.countTo = '2017-08-26T15:45:12.00';
    countdown1.start();
  }
}

window.onload = function() {
  new Demo();
};
