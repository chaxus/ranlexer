import { describe, expect, it } from 'vitest';
import { tokenize } from '@/parser';

describe('statement', () => {
  it('throw Error();', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'throw',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'Error',
        start: 6,
        end: 11,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 6, index: 11 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 1, index: 11 },
          end: { line: 1, column: 2, index: 12 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 1, index: 12 },
          end: { line: 1, column: 2, index: 13 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 13,
        end: 14,
        loc: {
          start: { line: 1, column: 1, index: 13 },
          end: { line: 1, column: 2, index: 14 },
        },
      },
    ];
    const code = 'throw Error();';
    expect(tokenize(code)).toEqual(result);
  });
  it('{}', () => {
    const result = [
      {
        type: 'LeftCurly',
        value: '{',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 1,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 1 },
          end: { line: 1, column: 1, index: 2 },
        },
      },
    ];
    const code = '{}';
    expect(tokenize(code)).toEqual(result);
  });
  it('try {} catch(e) {} finally{}', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'try',
        start: 0,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 3, index: 3 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 1, index: 4 },
          end: { line: 1, column: 2, index: 5 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 1, index: 5 },
          end: { line: 1, column: 2, index: 6 },
        },
      },
      {
        type: 'Identifier',
        value: 'catch',
        start: 7,
        end: 12,
        loc: {
          start: { line: 1, column: 2, index: 7 },
          end: { line: 1, column: 7, index: 12 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 2, index: 12 },
          end: { line: 1, column: 3, index: 13 },
        },
      },
      {
        type: 'Identifier',
        value: 'e',
        start: 13,
        end: 14,
        loc: {
          start: { line: 1, column: 2, index: 13 },
          end: { line: 1, column: 3, index: 14 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 14,
        end: 15,
        loc: {
          start: { line: 1, column: 2, index: 14 },
          end: { line: 1, column: 3, index: 15 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 16 },
          end: { line: 1, column: 4, index: 17 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 17 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
      {
        type: 'Identifier',
        value: 'finally',
        start: 19,
        end: 26,
        loc: {
          start: { line: 1, column: 4, index: 19 },
          end: { line: 1, column: 11, index: 26 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 26,
        end: 27,
        loc: {
          start: { line: 1, column: 4, index: 26 },
          end: { line: 1, column: 5, index: 27 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 27,
        end: 28,
        loc: {
          start: { line: 1, column: 4, index: 27 },
          end: { line: 1, column: 5, index: 28 },
        },
      },
    ];
    const code = 'try {} catch(e) {} finally{}';
    expect(tokenize(code)).toEqual(result);
  });
  it('for (let key in obj) {}', () => {
    const result = [
      {
        type: 'For',
        value: 'for',
        start: 0,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 3, index: 3 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 1, index: 4 },
          end: { line: 1, column: 2, index: 5 },
        },
      },
      {
        type: 'Let',
        value: 'let',
        start: 5,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 5 },
          end: { line: 1, column: 4, index: 8 },
        },
      },
      {
        type: 'Identifier',
        value: 'key',
        start: 9,
        end: 12,
        loc: {
          start: { line: 1, column: 2, index: 9 },
          end: { line: 1, column: 5, index: 12 },
        },
      },
      {
        type: 'BinaryOperator',
        value: 'in',
        start: 13,
        end: 15,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 5, index: 15 },
        },
      },
      {
        type: 'Identifier',
        value: 'obj',
        start: 16,
        end: 19,
        loc: {
          start: { line: 1, column: 4, index: 16 },
          end: { line: 1, column: 7, index: 19 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 19,
        end: 20,
        loc: {
          start: { line: 1, column: 4, index: 19 },
          end: { line: 1, column: 5, index: 20 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 21,
        end: 22,
        loc: {
          start: { line: 1, column: 5, index: 21 },
          end: { line: 1, column: 6, index: 22 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 22,
        end: 23,
        loc: {
          start: { line: 1, column: 5, index: 22 },
          end: { line: 1, column: 6, index: 23 },
        },
      },
    ];
    const code = 'for (let key in obj) {}';
    expect(tokenize(code)).toEqual(result);
  });
  it('for (let i = 0;i < 10;i ++) {}', () => {
    const result = [
      {
        type: 'For',
        value: 'for',
        start: 0,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 3, index: 3 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 1, index: 4 },
          end: { line: 1, column: 2, index: 5 },
        },
      },
      {
        type: 'Let',
        value: 'let',
        start: 5,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 5 },
          end: { line: 1, column: 4, index: 8 },
        },
      },
      {
        type: 'Identifier',
        value: 'i',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 2, index: 9 },
          end: { line: 1, column: 3, index: 10 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 3, index: 11 },
          end: { line: 1, column: 4, index: 12 },
        },
      },
      {
        type: 'Number',
        value: '0',
        start: 13,
        end: 14,
        loc: {
          start: { line: 1, column: 4, index: 13 },
          end: { line: 1, column: 5, index: 14 },
        },
        raw: '0',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 14,
        end: 15,
        loc: {
          start: { line: 1, column: 4, index: 14 },
          end: { line: 1, column: 5, index: 15 },
        },
      },
      {
        type: 'Identifier',
        value: 'i',
        start: 15,
        end: 16,
        loc: {
          start: { line: 1, column: 4, index: 15 },
          end: { line: 1, column: 5, index: 16 },
        },
      },
      {
        type: 'BinaryOperator',
        value: '<',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 5, index: 17 },
          end: { line: 1, column: 6, index: 18 },
        },
      },
      {
        type: 'Number',
        value: '10',
        start: 19,
        end: 21,
        loc: {
          start: { line: 1, column: 6, index: 19 },
          end: { line: 1, column: 8, index: 21 },
        },
        raw: '10',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 21,
        end: 22,
        loc: {
          start: { line: 1, column: 6, index: 21 },
          end: { line: 1, column: 7, index: 22 },
        },
      },
      {
        type: 'Identifier',
        value: 'i',
        start: 22,
        end: 23,
        loc: {
          start: { line: 1, column: 6, index: 22 },
          end: { line: 1, column: 7, index: 23 },
        },
      },
      {
        type: 'UpdateOperator',
        value: '++',
        start: 24,
        end: 26,
        loc: {
          start: { line: 1, column: 7, index: 24 },
          end: { line: 1, column: 9, index: 26 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 26,
        end: 27,
        loc: {
          start: { line: 1, column: 7, index: 26 },
          end: { line: 1, column: 8, index: 27 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 28,
        end: 29,
        loc: {
          start: { line: 1, column: 8, index: 28 },
          end: { line: 1, column: 9, index: 29 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 29,
        end: 30,
        loc: {
          start: { line: 1, column: 8, index: 29 },
          end: { line: 1, column: 9, index: 30 },
        },
      },
    ];
    const code = 'for (let i = 0;i < 10;i ++) {}';
    expect(tokenize(code)).toEqual(result);
  });
  it('while (true) {}', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'while',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 2, index: 7 },
        },
      },
      {
        type: 'Identifier',
        value: 'true',
        start: 7,
        end: 11,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 5, index: 11 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 1, index: 11 },
          end: { line: 1, column: 2, index: 12 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 13,
        end: 14,
        loc: {
          start: { line: 1, column: 2, index: 13 },
          end: { line: 1, column: 3, index: 14 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 14,
        end: 15,
        loc: {
          start: { line: 1, column: 2, index: 14 },
          end: { line: 1, column: 3, index: 15 },
        },
      },
    ];
    const code = 'while (true) {}';
    expect(tokenize(code)).toEqual(result);
  });
  it('do {} while (true)', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'do',
        start: 0,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 2, index: 2 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 3,
        end: 4,
        loc: {
          start: { line: 1, column: 1, index: 3 },
          end: { line: 1, column: 2, index: 4 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 1, index: 4 },
          end: { line: 1, column: 2, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'while',
        start: 6,
        end: 11,
        loc: {
          start: { line: 1, column: 2, index: 6 },
          end: { line: 1, column: 7, index: 11 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 3, index: 12 },
          end: { line: 1, column: 4, index: 13 },
        },
      },
      {
        type: 'Identifier',
        value: 'true',
        start: 13,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 7, index: 17 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 17 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
    ];
    const code = 'do {} while (true)';
    expect(tokenize(code)).toEqual(result);
  });
  it('switch (v){case 1: break;default:;}', () => {
    const result = [
      {
        type: 'Switch',
        value: 'switch',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'Identifier',
        value: 'v',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 1, index: 8 },
          end: { line: 1, column: 2, index: 9 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 9 },
          end: { line: 1, column: 2, index: 10 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 1, index: 10 },
          end: { line: 1, column: 2, index: 11 },
        },
      },
      {
        type: 'Case',
        value: 'case',
        start: 11,
        end: 15,
        loc: {
          start: { line: 1, column: 1, index: 11 },
          end: { line: 1, column: 5, index: 15 },
        },
      },
      {
        type: 'Number',
        value: '1',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 2, index: 16 },
          end: { line: 1, column: 3, index: 17 },
        },
        raw: '1',
      },
      {
        type: 'Colon',
        value: ':',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 2, index: 17 },
          end: { line: 1, column: 3, index: 18 },
        },
      },
      {
        type: 'Identifier',
        value: 'break',
        start: 19,
        end: 24,
        loc: {
          start: { line: 1, column: 3, index: 19 },
          end: { line: 1, column: 8, index: 24 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 24,
        end: 25,
        loc: {
          start: { line: 1, column: 3, index: 24 },
          end: { line: 1, column: 4, index: 25 },
        },
      },
      {
        type: 'Default',
        value: 'default',
        start: 25,
        end: 32,
        loc: {
          start: { line: 1, column: 3, index: 25 },
          end: { line: 1, column: 10, index: 32 },
        },
      },
      {
        type: 'Colon',
        value: ':',
        start: 32,
        end: 33,
        loc: {
          start: { line: 1, column: 3, index: 32 },
          end: { line: 1, column: 4, index: 33 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 33,
        end: 34,
        loc: {
          start: { line: 1, column: 3, index: 33 },
          end: { line: 1, column: 4, index: 34 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 34,
        end: 35,
        loc: {
          start: { line: 1, column: 3, index: 34 },
          end: { line: 1, column: 4, index: 35 },
        },
      },
    ];
    const code = 'switch (v){case 1: break;default:;}';
    expect(tokenize(code)).toEqual(result);
  });
  it('label: console.log();', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'label',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Colon',
        value: ':',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 5 },
          end: { line: 1, column: 1, index: 6 },
        },
      },
      {
        type: 'Identifier',
        value: 'console',
        start: 7,
        end: 14,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 8, index: 14 },
        },
      },
      {
        type: 'Dot',
        value: '.',
        start: 14,
        end: 15,
        loc: {
          start: { line: 1, column: 1, index: 14 },
          end: { line: 1, column: 2, index: 15 },
        },
      },
      {
        type: 'Identifier',
        value: 'log',
        start: 15,
        end: 18,
        loc: {
          start: { line: 1, column: 1, index: 15 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 18,
        end: 19,
        loc: {
          start: { line: 1, column: 1, index: 18 },
          end: { line: 1, column: 2, index: 19 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 19,
        end: 20,
        loc: {
          start: { line: 1, column: 1, index: 19 },
          end: { line: 1, column: 2, index: 20 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 20,
        end: 21,
        loc: {
          start: { line: 1, column: 1, index: 20 },
          end: { line: 1, column: 2, index: 21 },
        },
      },
    ];
    const code = 'label: console.log();';
    expect(tokenize(code)).toEqual(result);
  });
  it('with (a){}', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'with',
        start: 0,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 4, index: 4 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 1, index: 5 },
          end: { line: 1, column: 2, index: 6 },
        },
      },
      {
        type: 'Identifier',
        value: 'a',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 2, index: 7 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 1, index: 8 },
          end: { line: 1, column: 2, index: 9 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 9 },
          end: { line: 1, column: 2, index: 10 },
        },
      },
    ];
    const code = 'with (a){}';
    expect(tokenize(code)).toEqual(result);
  });
  it('break;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'break',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 5 },
          end: { line: 1, column: 1, index: 6 },
        },
      },
    ];
    const code = 'break;';
    expect(tokenize(code)).toEqual(result);
  });
  it('continue;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'continue',
        start: 0,
        end: 8,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 8, index: 8 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 0, index: 8 },
          end: { line: 1, column: 1, index: 9 },
        },
      },
    ];
    const code = 'continue;';
    expect(tokenize(code)).toEqual(result);
  });
  it('return;', () => {
    const result = [
      {
        type: 'Return',
        value: 'return',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 0, index: 6 },
          end: { line: 1, column: 1, index: 7 },
        },
      },
    ];
    const code = 'return;';
    expect(tokenize(code)).toEqual(result);
  });
  it('debugger;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'debugger',
        start: 0,
        end: 8,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 8, index: 8 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 0, index: 8 },
          end: { line: 1, column: 1, index: 9 },
        },
      },
    ];
    const code = 'debugger;';
    expect(tokenize(code)).toEqual(result);
  });
});
