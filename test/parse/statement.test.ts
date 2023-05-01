import { describe, expect, it } from 'vitest'
import { parse, tokenize } from '@/parser'

describe('statement', () => {
  it('throw Error();', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: { type: 'Identifier', name: 'throw', start: 0, end: 5 },
          start: 0,
          end: 5,
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'Error', start: 6, end: 11 },
            arguments: [],
            start: 6,
            end: 13,
          },
          start: 6,
          end: 13,
        },
      ],
      start: 0,
      end: 13,
    }
    const code = 'throw Error();'
    expect(parse(code)).toEqual(result)
  })
  it('{}', () => {
    const result = {
      type: 'Program',
      body: [{ type: 'BlockStatement', body: [], start: 0, end: 2 }],
      start: 0,
      end: 2,
    }
    const code = '{}'
    expect(parse(code)).toEqual(result)
  })
  it('try {} catch(e) {} finally{}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: { type: 'Identifier', name: 'try', start: 0, end: 3 },
          start: 0,
          end: 3,
        },
        { type: 'BlockStatement', body: [], start: 4, end: 6 },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'catch', start: 7, end: 12 },
            arguments: [{ type: 'Identifier', name: 'e', start: 13, end: 14 }],
            start: 7,
            end: 15,
          },
          start: 7,
          end: 15,
        },
        { type: 'BlockStatement', body: [], start: 16, end: 18 },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'finally',
            start: 19,
            end: 26,
          },
          start: 19,
          end: 26,
        },
        { type: 'BlockStatement', body: [], start: 26, end: 28 },
      ],
      start: 0,
      end: 28,
    }
    const code = 'try {} catch(e) {} finally{}'
    expect(parse(code)).toEqual(result)
  })
  it('for (let key in obj) {}', () => {
    const result = [
      { type: 'For', value: 'for', start: 0, end: 3 },
      { type: 'LeftParen', value: '(', start: 4, end: 5 },
      { type: 'Let', value: 'let', start: 5, end: 8 },
      { type: 'Identifier', value: 'key', start: 9, end: 12 },
      { type: 'Identifier', value: 'in', start: 13, end: 15 },
      { type: 'Identifier', value: 'obj', start: 16, end: 19 },
      { type: 'RightParen', value: ')', start: 19, end: 20 },
      { type: 'LeftCurly', value: '{', start: 21, end: 22 },
      { type: 'RightCurly', value: '}', start: 22, end: 23 },
    ]
    const code = 'for (let key in obj) {}'
    expect(tokenize(code)).toEqual(result)
  })
  it('for (let i = 0;i < 10;i ++) {}', () => {
    const result = [
      { type: 'For', value: 'for', start: 0, end: 3 },
      { type: 'LeftParen', value: '(', start: 4, end: 5 },
      { type: 'Let', value: 'let', start: 5, end: 8 },
      { type: 'Identifier', value: 'i', start: 9, end: 10 },
      { type: 'Assign', value: '=', start: 11, end: 12 },
      { type: 'Number', value: '0', start: 13, end: 14, raw: '0' },
      { type: 'Semicolon', value: ';', start: 14, end: 15 },
      { type: 'Identifier', value: 'i', start: 15, end: 16 },
      { type: 'LessSign', value: '<', start: 17, end: 18 },
      { type: 'Number', value: '10', start: 19, end: 21, raw: '10' },
      { type: 'Semicolon', value: ';', start: 21, end: 22 },
      { type: 'Identifier', value: 'i', start: 22, end: 23 },
      { type: 'UpdateOperator', value: '++', start: 24, end: 26 },
      { type: 'RightParen', value: ')', start: 26, end: 27 },
      { type: 'LeftCurly', value: '{', start: 28, end: 29 },
      { type: 'RightCurly', value: '}', start: 29, end: 30 },
    ]
    const code = 'for (let i = 0;i < 10;i ++) {}'
    expect(tokenize(code)).toEqual(result)
  })
  it('while (true) {}', () => {
    const result = [
      { type: 'Identifier', value: 'while', start: 0, end: 5 },
      { type: 'LeftParen', value: '(', start: 6, end: 7 },
      { type: 'Identifier', value: 'true', start: 7, end: 11 },
      { type: 'RightParen', value: ')', start: 11, end: 12 },
      { type: 'LeftCurly', value: '{', start: 13, end: 14 },
      { type: 'RightCurly', value: '}', start: 14, end: 15 },
    ]
    const code = 'while (true) {}'
    expect(tokenize(code)).toEqual(result)
  })
  it('do {} while (true)', () => {
    const result = [
      { type: 'Identifier', value: 'do', start: 0, end: 2 },
      { type: 'LeftCurly', value: '{', start: 3, end: 4 },
      { type: 'RightCurly', value: '}', start: 4, end: 5 },
      { type: 'Identifier', value: 'while', start: 6, end: 11 },
      { type: 'LeftParen', value: '(', start: 12, end: 13 },
      { type: 'Identifier', value: 'true', start: 13, end: 17 },
      { type: 'RightParen', value: ')', start: 17, end: 18 },
    ]
    const code = 'do {} while (true)'
    expect(tokenize(code)).toEqual(result)
  })
  it('switch (v){case 1: break;default:;}', () => {
    const result = [
      { type: 'Identifier', value: 'switch', start: 0, end: 6 },
      { type: 'LeftParen', value: '(', start: 7, end: 8 },
      { type: 'Identifier', value: 'v', start: 8, end: 9 },
      { type: 'RightParen', value: ')', start: 9, end: 10 },
      { type: 'LeftCurly', value: '{', start: 10, end: 11 },
      { type: 'Identifier', value: 'case', start: 11, end: 15 },
      { type: 'Number', value: '1', start: 16, end: 17, raw: '1' },
      { type: 'Colon', value: ':', start: 17, end: 18 },
      { type: 'Identifier', value: 'break', start: 19, end: 24 },
      { type: 'Semicolon', value: ';', start: 24, end: 25 },
      { type: 'Default', value: 'default', start: 25, end: 32 },
      { type: 'Colon', value: ':', start: 32, end: 33 },
      { type: 'Semicolon', value: ';', start: 33, end: 34 },
      { type: 'RightCurly', value: '}', start: 34, end: 35 },
    ]
    const code = 'switch (v){case 1: break;default:;}'
    expect(tokenize(code)).toEqual(result)
  })
  it('label: console.log();', () => {
    const result = [
      { type: 'Identifier', value: 'label', start: 0, end: 5 },
      { type: 'Colon', value: ':', start: 5, end: 6 },
      { type: 'Identifier', value: 'console', start: 7, end: 14 },
      { type: 'Dot', value: '.', start: 14, end: 15 },
      { type: 'Identifier', value: 'log', start: 15, end: 18 },
      { type: 'LeftParen', value: '(', start: 18, end: 19 },
      { type: 'RightParen', value: ')', start: 19, end: 20 },
      { type: 'Semicolon', value: ';', start: 20, end: 21 },
    ]
    const code = 'label: console.log();'
    expect(tokenize(code)).toEqual(result)
  })
  it('with (a){}', () => {
    const result = [
      { type: 'Identifier', value: 'with', start: 0, end: 4 },
      { type: 'LeftParen', value: '(', start: 5, end: 6 },
      { type: 'Identifier', value: 'a', start: 6, end: 7 },
      { type: 'RightParen', value: ')', start: 7, end: 8 },
      { type: 'LeftCurly', value: '{', start: 8, end: 9 },
      { type: 'RightCurly', value: '}', start: 9, end: 10 },
    ]
    const code = 'with (a){}'
    expect(tokenize(code)).toEqual(result)
  })
  it('break;', () => {
    const result = [
      { type: 'Identifier', value: 'break', start: 0, end: 5 },
      { type: 'Semicolon', value: ';', start: 5, end: 6 },
    ]
    const code = 'break;'
    expect(tokenize(code)).toEqual(result)
  })
  it('continue;', () => {
    const result = [
      { type: 'Identifier', value: 'continue', start: 0, end: 8 },
      { type: 'Semicolon', value: ';', start: 8, end: 9 },
    ]
    const code = 'continue;'
    expect(tokenize(code)).toEqual(result)
  })
  it('return;', () => {
    const result = [
      { type: 'Return', value: 'return', start: 0, end: 6 },
      { type: 'Semicolon', value: ';', start: 6, end: 7 },
    ]
    const code = 'return;'
    expect(tokenize(code)).toEqual(result)
  })
  it('debugger;', () => {
    const result = [
      { type: 'Identifier', value: 'debugger', start: 0, end: 8 },
      { type: 'Semicolon', value: ';', start: 8, end: 9 },
    ]
    const code = 'debugger;'
    expect(tokenize(code)).toEqual(result)
  })
})
