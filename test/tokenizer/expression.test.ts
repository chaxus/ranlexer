import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Expression', () => {
  it('const a = [1,2,3]', () => {
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
        value: 'a',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 2, index: 7 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 2, index: 8 },
          end: { line: 1, column: 3, index: 9 },
        },
      },
      {
        type: 'LeftBracket',
        value: '[',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 3, index: 10 },
          end: { line: 1, column: 4, index: 11 },
        },
      },
      {
        type: 'Number',
        value: '1',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 3, index: 11 },
          end: { line: 1, column: 4, index: 12 },
        },
        raw: '1',
      },
      {
        type: 'Comma',
        value: ',',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 3, index: 12 },
          end: { line: 1, column: 4, index: 13 },
        },
      },
      {
        type: 'Number',
        value: '2',
        start: 13,
        end: 14,
        loc: {
          start: { line: 1, column: 3, index: 13 },
          end: { line: 1, column: 4, index: 14 },
        },
        raw: '2',
      },
      {
        type: 'Comma',
        value: ',',
        start: 14,
        end: 15,
        loc: {
          start: { line: 1, column: 3, index: 14 },
          end: { line: 1, column: 4, index: 15 },
        },
      },
      {
        type: 'Number',
        value: '3',
        start: 15,
        end: 16,
        loc: {
          start: { line: 1, column: 3, index: 15 },
          end: { line: 1, column: 4, index: 16 },
        },
        raw: '3',
      },
      {
        type: 'RightBracket',
        value: ']',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 16 },
          end: { line: 1, column: 4, index: 17 },
        },
      },
    ]
    const code = 'const a = [1,2,3]'
    expect(tokenize(code)).toEqual(result)
  })
  it('a = 1', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'a',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 2,
        end: 3,
        loc: {
          start: { line: 1, column: 1, index: 2 },
          end: { line: 1, column: 2, index: 3 },
        },
      },
      {
        type: 'Number',
        value: '1',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 2, index: 4 },
          end: { line: 1, column: 3, index: 5 },
        },
        raw: '1',
      },
    ]
    const code = 'a = 1'
    expect(tokenize(code)).toEqual(result)
  })
  it('1 + 2;', () => {
    const result = [
      {
        type: 'Number',
        value: '1',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
        raw: '1',
      },
      {
        type: 'BinaryOperator',
        value: '+',
        start: 2,
        end: 3,
        loc: {
          start: { line: 1, column: 1, index: 2 },
          end: { line: 1, column: 2, index: 3 },
        },
      },
      {
        type: 'Number',
        value: '2',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 2, index: 4 },
          end: { line: 1, column: 3, index: 5 },
        },
        raw: '2',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 2, index: 5 },
          end: { line: 1, column: 3, index: 6 },
        },
      },
    ]
    const code = '1 + 2;'
    expect(tokenize(code)).toEqual(result)
  })
  it('-1;', () => {
    const result = [
      {
        type: 'BinaryOperator',
        value: '-',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'Number',
        value: '1',
        start: 1,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 1 },
          end: { line: 1, column: 1, index: 2 },
        },
        raw: '1',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 2,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 2 },
          end: { line: 1, column: 1, index: 3 },
        },
      },
    ]
    const code = '-1;'
    expect(tokenize(code)).toEqual(result)
  })
  it('function(){};', () => {
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
        type: 'LeftParen',
        value: '(',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 0, index: 8 },
          end: { line: 1, column: 1, index: 9 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 0, index: 9 },
          end: { line: 1, column: 1, index: 10 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 0, index: 10 },
          end: { line: 1, column: 1, index: 11 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 0, index: 11 },
          end: { line: 1, column: 1, index: 12 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 0, index: 12 },
          end: { line: 1, column: 1, index: 13 },
        },
      },
    ]
    const code = 'function(){};'
    expect(tokenize(code)).toEqual(result)
  })
  it('() => {};', () => {
    const result = [
      {
        type: 'LeftParen',
        value: '(',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'RightParen',
        value: ')',
        start: 1,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 1 },
          end: { line: 1, column: 1, index: 2 },
        },
      },
      {
        type: 'ArrowOperator',
        value: '=>',
        start: 3,
        end: 5,
        loc: {
          start: { line: 1, column: 1, index: 3 },
          end: { line: 1, column: 3, index: 5 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 2, index: 6 },
          end: { line: 1, column: 3, index: 7 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 2, index: 7 },
          end: { line: 1, column: 3, index: 8 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 2, index: 8 },
          end: { line: 1, column: 3, index: 9 },
        },
      },
    ]
    const code = '() => {};'
    expect(tokenize(code)).toEqual(result)
  })
  it('class{};', () => {
    const result = [
      {
        type: 'Class',
        value: 'class',
        start: 0,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 5, index: 5 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 5 },
          end: { line: 1, column: 1, index: 6 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 0, index: 6 },
          end: { line: 1, column: 1, index: 7 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 0, index: 7 },
          end: { line: 1, column: 1, index: 8 },
        },
      },
    ]
    const code = 'class{};'
    expect(tokenize(code)).toEqual(result)
  })
  it('a;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'a',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 1,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 1 },
          end: { line: 1, column: 1, index: 2 },
        },
      },
    ]
    const code = 'a;'
    expect(tokenize(code)).toEqual(result)
  })
  it('this;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'this',
        start: 0,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 4, index: 4 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 4 },
          end: { line: 1, column: 1, index: 5 },
        },
      },
    ]
    const code = 'this;'
    expect(tokenize(code)).toEqual(result)
  })
  it('super;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'super',
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
    ]
    const code = 'super;'
    expect(tokenize(code)).toEqual(result)
  })
  it('a::b;', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'a',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'Colon',
        value: ':',
        start: 1,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 1 },
          end: { line: 1, column: 1, index: 2 },
        },
      },
      {
        type: 'Colon',
        value: ':',
        start: 2,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 2 },
          end: { line: 1, column: 1, index: 3 },
        },
      },
      {
        type: 'Identifier',
        value: 'b',
        start: 3,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 3 },
          end: { line: 1, column: 1, index: 4 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 4 },
          end: { line: 1, column: 1, index: 5 },
        },
      },
    ]
    const code = 'a::b;'
    expect(tokenize(code)).toEqual(result)
  })
  it('function a(){}; a instanceof Function;', () => {
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
        value: 'a',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 9 },
          end: { line: 1, column: 2, index: 10 },
        },
      },
      {
        type: 'LeftParen',
        value: '(',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 1, index: 10 },
          end: { line: 1, column: 2, index: 11 },
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
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 1, index: 12 },
          end: { line: 1, column: 2, index: 13 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 13,
        end: 14,
        loc: {
          start: { line: 1, column: 1, index: 13 },
          end: { line: 1, column: 2, index: 14 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 14,
        end: 15,
        loc: {
          start: { line: 1, column: 1, index: 14 },
          end: { line: 1, column: 2, index: 15 },
        },
      },
      {
        type: 'Identifier',
        value: 'a',
        start: 16,
        end: 17,
        loc: {
          start: { line: 1, column: 2, index: 16 },
          end: { line: 1, column: 3, index: 17 },
        },
      },
      {
        type: 'BinaryOperator',
        value: 'instanceof',
        start: 18,
        end: 28,
        loc: {
          start: { line: 1, column: 3, index: 18 },
          end: { line: 1, column: 13, index: 28 },
        },
      },
      {
        type: 'Identifier',
        value: 'Function',
        start: 29,
        end: 37,
        loc: {
          start: { line: 1, column: 4, index: 29 },
          end: { line: 1, column: 12, index: 37 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 37,
        end: 38,
        loc: {
          start: { line: 1, column: 4, index: 37 },
          end: { line: 1, column: 5, index: 38 },
        },
      },
    ]
    const code = 'function a(){}; a instanceof Function;'
    expect(tokenize(code)).toEqual(result)
  })
})
