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

    if (/[yMdHms]/.test(char)) {
      charType = 'placeholder';
    }

    if (/[X]/.test(char)) {
      charType = 'timezone';
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

  const formatter = function format(d: Date) {
    let result = '';
    for (const p of ast) {
      if (p === ' ' || p === '/' || p === '-' || p == ':') {
        result += p;
        continue;
      }

      const picker = PICKERS[p];
      result += picker.call(null, d);
    }

    return result;
  };

  formatters[layout] = formatter;
  return formatter;
}

// function formatWithReduce(x: Date, layout: string) {
//   let parts = [
//     ['yyyy', _padZero(x.getFullYear())],
//     ['MM', _padZero(x.getMonth() + 1)],
//     ['dd', _padZero(x.getDate())],
//     ['HH', _padZero(x.getHours())],
//     ['mm', _padZero(x.getMinutes())],
//     ['ss', _padZero(x.getSeconds())],
//   ];

//   return parts.reduce((str, part) => {
//     return str.replace(part[0], part[1]);
//   }, layout);
// }

// const layout = 'yyyy-MM-dd HH:mm:ss';
// const format = compile(layout);

// const now = new Date();
// console.log('format', format(now));
// console.log('formatWithReduce', formatWithReduce(now, layout));

// for (let i = 0; i < 10000; i++) {
//   format(now);
// }

// for (let i = 0; i < 10000; i++) {
//   formatWithReduce(now, layout);
// }

// console.time('format 100000 times with complied formatter');
// for (let i = 0; i < 100000; i++) {
//   format(now);
// }
// console.timeEnd('format 100000 times with complied formatter');

// console.time('format 100000 times with formatWithReduce');
// for (let i = 0; i < 100000; i++) {
//   formatWithReduce(now, layout);
// }
// console.timeEnd('format 100000 times with formatWithReduce');
