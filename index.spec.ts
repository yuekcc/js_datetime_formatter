import { describe, it, expect } from 'vitest';
import { compile } from './index';

describe('创建时间日期 formatter', () => {
  it('yyyy-MM-dd hh:mm:ss formatter', () => {
    const ts = new Date(1678547073661);
    {
      const format = compile('yyyy-MM-dd HH:mm:ss');
      expect(format(ts)).toStrictEqual('2023-03-11 23:04:33');
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
});
