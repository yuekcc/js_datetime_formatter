function _padZero(x) {
  return `${x}`.padStart(2, '0');
}

function yyyy(d: Date): string {
  return _padZero(d.getFullYear());
}

function MM(d: Date): string {
  return _padZero(d.getMonth() + 1);
}

function dd(d: Date): string {
  return _padZero(d.getDate());
}

function HH(d: Date): string {
  return _padZero(d.getHours());
}

function mm(d: Date): string {
  return _padZero(d.getMinutes());
}

function ss(d: Date): string {
  return _padZero(d.getSeconds());
}

const PICKERS = {
  yyyy,
  MM,
  dd,
  HH,
  mm,
  ss,
};

// TODO: 支持处理 yyyyMMddHHmmss
function buildAst(str: string): string[] {
  let result: string[] = [];
  let token: string[] = [];
  let lastType = '';
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let charType = '';

    if (/[\s\-/:]/i.test(char)) {
      charType = 'sp';
    }

    if (/[y]/.test(char)) {
      charType = 'y';
    }

    if (/[M]/.test(char)) {
      charType = 'M';
    }

    if (/[d]/.test(char)) {
      charType = 'd';
    }

    if (/[H]/.test(char)) {
      charType = 'H';
    }

    if (/[m]/.test(char)) {
      charType = 'm';
    }

    if (/[s]/.test(char)) {
      charType = 's';
    }

    if (/[X]/.test(char)) {
      charType = 'X';
    }

    if (charType === lastType || lastType === '') {
      token.push(char);
    } else {
      result.push(token.join(''));
      token = [char];
    }

    lastType = charType;
  }

  result.push(token.join(''));

  return result;
}

const formatters: Record<string, (x: Date) => string> = {};

export function compile(layout: string): (x: Date) => string {
  const ast = buildAst(layout);

  const formatter = function format(d: Date, ...args: any[]) {
    let result = '';
    for (const p of ast) {
      if (p === ' ' || p === '/' || p === '-' || p == ':') {
        result += p;
        continue;
      }

      const picker: (x: Date) => string = PICKERS[p];
      result += picker.apply(null, [d, ...args]);
    }

    return result;
  };

  formatters[layout] = formatter;
  return formatter;
}

export function formatDateTime(dateObject: Date, layout = 'yyyy-MM-dd HH:mm:ss'): string {
  let format = formatters[layout];
  if (!format) {
    format = compile(layout);
  }

  return format(dateObject);
}
