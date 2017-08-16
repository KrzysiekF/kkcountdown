# KKCountdown - v2.0.0-Alpha (please don't use in production)

[![npm package](https://img.shields.io/npm/v/kk-countdown.png?style=flat-square)](https://www.npmjs.org/package/kk-countdown)
[![Travis](https://travis-ci.org/KrzysiekF/kkcountdown.svg?style=flat-square)](https://travis-ci.org/KrzysiekF/kkcountdown)
[![Coverage Status](https://coveralls.io/repos/github/KrzysiekF/kkcountdown/badge.svg?branch=master&style=flat-square)](https://coveralls.io/github/KrzysiekF/kkcountdown?branch=master)

KK Countdown counts down to specific dates in the future.

Installation / Download
-----------------------

#### NPM
`npm install --save kk-countdown`

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

`container` - HTML element where coutdown should be placed

`countTo` - You can set here: 
- date (`string` in ISO date format or `Date object`)
- number (`number`) of seconds to countdown

Options
-------

| option      | default         | description |
|-------------|-----------------|-------------|
| `textAfterCount`      | `''` (`string`) ||
| `oneDayClass`      | `''` (`string`) ||
| `displayDays`      | `true` (`bool`) ||
| `displayZeroDays`      | `true` (`bool`) ||
| `customClass`      | `''` (`string`) ||
| `warnSeconds`      | `60` (`number`) ||
| `warnClass`      | `''` (`string`) ||
||||
| `afterFinish`      | (`function`) ||
||||
| `dayText`      | `day ` (`string`) ||
| `daysText`      | `days ` (`string`) ||
| `hourText`      | `hour ` (`string`) ||
| `hoursText`      | `hours ` (`string`) ||
| `minuteText`      | `:` (`string`) ||
| `minutesText`      | `:` (`string`) ||
| `secondText`      | `''` (`string`) ||
| `secondsText`      | `''` (`string`) ||
||||
| `containerClass`      | `kkcd-container` (`string`) ||
| `secondsClass`      | `kkcd-seconds` (`string`) ||
| `minutesClass`      | `kkcd-minutes` (`string`) ||
| `hoursClass`      | `kkcd-hours` (`string`) ||
| `daysClass`      | `kkcd-days` (`string`) ||
||||
| `secondsTextClass`      | `kkcd-seconds-text` (`string`) ||
| `minutesTextClass`      | `kkcd-minutes-text` (`string`) ||
| `hoursTextClass`      | `kkcd-hours-text` (`string`) ||
| `daysTextClass`      | `kkcd-days-text` (`string`) ||


[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/KrzysiekF/kkcountdown

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/KrzysiekF/kkcountdown
