import { describe, expect, it } from 'vitest';
import { tokenize } from '@/parser';

describe('Identifier', () => {
  it('const name = "a";', () => {
    const result = [
      {
        type: 'Const',
        value: 'const',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'name',
        start: 6,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 5, index: 10 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 2, index: 11 },
          end: { line: 1, column: 3, index: 12 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'a',
        start: 13,
        end: 16,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 6, index: 16 },
        },
        raw: '"a"',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 16 },
          end: { line: 1, column: 4, index: 17 },
        },
      },
    ];
    const code = 'const name = "a";';
    expect(tokenize(code)).toEqual(result);
  });
  it('function', () => {
    const result = [
      {
        type: 'Function',
        value: 'function',
        start: 0,
        end: 8,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 8, index: 8 },
        },
      },
      {
        type: 'Identifier',
        value: 'say',
        start: 9,
        end: 12,
        loc: {
          start: { line: 1, column: 1, index: 9 },
          end: { line: 1, column: 4, index: 12 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 1, index: 12 },
          end: { line: 1, column: 2, index: 13 },
        },
      },
      {
        type: 'Identifier',
        value: 'name',
        start: 13,
        end: 17,
        loc: {
          start: { line: 1, column: 1, index: 13 },
          end: { line: 1, column: 5, index: 17 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 1, index: 17 },
          end: { line: 1, column: 2, index: 18 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 19,
        end: 20,
        loc: {
          start: { line: 1, column: 2, index: 19 },
          end: { line: 1, column: 3, index: 20 },
        },
      },
      {
        type: 'Identifier',
        value: 'console',
        start: 20,
        end: 27,
        loc: {
          start: { line: 1, column: 2, index: 20 },
          end: { line: 1, column: 9, index: 27 },
        },
      },
      {
        type: 'Dot',
        value: '.',
        start: 27,
        end: 28,
        loc: {
          start: { line: 1, column: 2, index: 27 },
          end: { line: 1, column: 3, index: 28 },
        },
      },
      {
        type: 'Identifier',
        value: 'log',
        start: 28,
        end: 31,
        loc: {
          start: { line: 1, column: 2, index: 28 },
          end: { line: 1, column: 5, index: 31 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 31,
        end: 32,
        loc: {
          start: { line: 1, column: 2, index: 31 },
          end: { line: 1, column: 3, index: 32 },
        },
      },
      {
        type: 'Identifier',
        value: 'name',
        start: 32,
        end: 36,
        loc: {
          start: { line: 1, column: 2, index: 32 },
          end: { line: 1, column: 6, index: 36 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 36,
        end: 37,
        loc: {
          start: { line: 1, column: 2, index: 36 },
          end: { line: 1, column: 3, index: 37 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 37,
        end: 38,
        loc: {
          start: { line: 1, column: 2, index: 37 },
          end: { line: 1, column: 3, index: 38 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 38,
        end: 39,
        loc: {
          start: { line: 1, column: 2, index: 38 },
          end: { line: 1, column: 3, index: 39 },
        },
      },
    ];
    const code = `function say(name) {console.log(name);}`;
    expect(tokenize(code)).toEqual(result);
  });
  it('object', () => {
    const result = [
      {
        type: 'Const',
        value: 'const',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'obj',
        start: 6,
        end: 9,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 4, index: 9 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 2, index: 10 },
          end: { line: 1, column: 3, index: 11 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 3, index: 12 },
          end: { line: 1, column: 4, index: 13 },
        },
      },
      {
        type: 'Identifier',
        value: 'name',
        start: 13,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 7, index: 17 },
        },
      },
      {
        type: 'Colon',
        value: ':',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 17 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'a',
        start: 19,
        end: 22,
        loc: {
          start: { line: 1, column: 4, index: 19 },
          end: { line: 1, column: 7, index: 22 },
        },
        raw: "'a'",
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 22,
        end: 23,
        loc: {
          start: { line: 1, column: 4, index: 22 },
          end: { line: 1, column: 5, index: 23 },
        },
      },
    ];
    const code = `const obj = {name: 'a'}`;
    expect(tokenize(code)).toEqual(result);
  });
  it('const name = "a";', () => {
    const result = [
      {
        type: 'Const',
        value: 'const',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'name',
        start: 6,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 5, index: 10 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 2, index: 11 },
          end: { line: 1, column: 3, index: 12 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'a',
        start: 13,
        end: 16,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 6, index: 16 },
        },
        raw: '"a"',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 16 },
          end: { line: 1, column: 4, index: 17 },
        },
      },
    ];
    const code = 'const name = "a";';
    expect(tokenize(code)).toEqual(result);
  });
  it('const name = "a";', () => {
    const result = [
      {
        type: 'Const',
        value: 'const',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'name',
        start: 6,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 5, index: 10 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 2, index: 11 },
          end: { line: 1, column: 3, index: 12 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'a',
        start: 13,
        end: 16,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 6, index: 16 },
        },
        raw: '"a"',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 16 },
          end: { line: 1, column: 4, index: 17 },
        },
      },
    ];
    const code = 'const name = "a";';
    expect(tokenize(code)).toEqual(result);
  });
});
