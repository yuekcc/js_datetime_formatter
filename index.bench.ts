import { bench, describe } from 'vitest';
import { formatDateTime } from './index';

function _padZero(x) {
  return `${x}`.padStart(2, '0');
}

function formatWithReduce(x: Date, layout: string) {
  let parts = [
    ['yyyy', _padZero(x.getFullYear())],
    ['MM', _padZero(x.getMonth() + 1)],
    ['dd', _padZero(x.getDate())],
    ['HH', _padZero(x.getHours())],
    ['mm', _padZero(x.getMinutes())],
    ['ss', _padZero(x.getSeconds())],
  ];

  return parts.reduce((str, part) => {
    return str.replace(part[0], part[1]);
  }, layout);
}

describe('时间日期格式化性能测试', () => {
  const ts = new Date(1678547073661);

  bench('formatDateTime', () => {
    formatDateTime(ts, 'yyyy-MM-dd HH:mm:ss');
  });

  bench('formatWithReduce', () => {
    formatWithReduce(ts, 'yyyy-MM-dd HH:mm:ss');
  });
});
