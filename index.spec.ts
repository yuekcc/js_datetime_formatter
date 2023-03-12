import { describe, expect, it } from 'vitest';
import { compile, formatDateTime } from './index';

describe('时间日期格式工具', () => {
  const ts = new Date(1678547073661);

  it('从格式化字符串创建 formatter', () => {
    {
      const format = compile('yyyy-MM-dd HH:mm:ss');
      expect(format(ts)).toStrictEqual('2023-03-11 23:04:33');
    }

    {
      const format = compile('yyyyMMddHHmmss');
      expect(format(ts)).toStrictEqual('20230311230433');
    }

    {
      const format = compile('yyyy-MM-dd');
      expect(format(ts)).toStrictEqual('2023-03-11');
    }

    {
      const format = compile('MM/dd/yyyy');
      expect(format(ts)).toStrictEqual('03/11/2023');
    }

    {
      const format = compile('HH:mm:ss');
      expect(format(ts)).toStrictEqual('23:04:33');
    }

    {
      const format = compile('MM mm');
      expect(format(ts)).toStrictEqual('03 04');
    }
  });

  it('格式化 Date 实例', () => {
    expect(formatDateTime(ts, 'yyyy-MM-dd HH:mm:ss')).toStrictEqual('2023-03-11 23:04:33');
  });
});
