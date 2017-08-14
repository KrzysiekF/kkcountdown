# kkcountdown

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

KK Countdown counts down to specific dates in the future.

Installation / Download
-----------------------

#### NPM
`COMING SOON`

Import
--------
#### ES6:
`import KKCountdown from 'kkcountdown';`

Examples
--------
```javascript
const countdown = new KKCountdown();
countdown.container = document.getElementById('app-1');
countdown.countTo = '2017-12-12T14:33:00.00';
countdown.start();
```

Options
-------

| option      | default         | description |
|-------------|-----------------|-------------|
| `textAfterCount`      | `'---'` (`string`) |             |
||||
| `dayText`      | `day ` (`string`) |             |
| `daysText`      | `days ` (`string`) |             |
| `hourText`      | `hour ` (`string`) |             |
| `hoursText`      | `hours ` (`string`) |             |
| `minuteText`      | `:` (`string`) |             |
| `minutesText`      | `:` (`string`) |             |
| `secondText`      | `''` (`string`) |             |
| `secondsText`      | `''` (`string`) |             |
||||
| `containerClass`      | `kkcd-container` (`string`) |             |
| `secondsClass`      | `kkcd-seconds` (`string`) |             |
| `minutesClass`      | `kkcd-minutes` (`string`) |             |
| `hoursClass`      | `kkcd-hours` (`string`) |             |
| `daysClass`      | `kkcd-days` (`string`) |             |
||||
| `secondsTextClass`      | `kkcd-seconds-text` (`string`) |             |
| `minutesTextClass`      | `kkcd-minutes-text` (`string`) |             |
| `hoursTextClass`      | `kkcd-hours-text` (`string`) |             |
| `daysTextClass`      | `kkcd-days-text` (`string`) |             |


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
