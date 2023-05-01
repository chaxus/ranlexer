import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Expression', () => {
  it('const a = [1,2,3]', () => {
    const result = [
      { type: 'Const', value: 'const', start: 0, end: 5 },
      { type: 'Identifier', value: 'a', start: 6, end: 7 },
      { type: 'Assign', value: '=', start: 8, end: 9 },
      { type: 'LeftBracket', value: '[', start: 10, end: 11 },
      { type: 'Number', value: '1', start: 11, end: 12, raw: '1' },
      { type: 'Comma', value: ',', start: 12, end: 13 },
      { type: 'Number', value: '2', start: 13, end: 14, raw: '2' },
      { type: 'Comma', value: ',', start: 14, end: 15 },
      { type: 'Number', value: '3', start: 15, end: 16, raw: '3' },
      { type: 'RightBracket', value: ']', start: 16, end: 17 },
    ]
    const code = 'const a = [1,2,3]'
    expect(tokenize(code)).toEqual(result)
  })
  it('a = 1', () => {
    const result = [
      { type: 'Identifier', value: 'a', start: 1, end: 2 },
      { type: 'Assign', value: '=', start: 3, end: 4 },
      { type: 'Number', value: '1', start: 5, end: 6, raw: '1' },
    ]
    const code = ' a = 1'
    expect(tokenize(code)).toEqual(result)
  })
  it('1 + 2;', () => {
    const result = [
      { type: 'Number', value: '1', start: 1, end: 2, raw: '1' },
      { type: 'BinaryOperator', value: '+', start: 3, end: 4 },
      { type: 'Number', value: '2', start: 5, end: 6, raw: '2' },
      { type: 'Semicolon', value: ';', start: 6, end: 7 },
    ]
    const code = ' 1 + 2;'
    expect(tokenize(code)).toEqual(result)
  })
  it('-1;', () => {
    const result = [
      { type: 'BinaryOperator', value: '-', start: 1, end: 2 },
      { type: 'Number', value: '1', start: 2, end: 3, raw: '1' },
      { type: 'Semicolon', value: ';', start: 3, end: 4 },
    ]
    const code = ' -1;'
    expect(tokenize(code)).toEqual(result)
  })
  it('function(){};', () => {
    const result = [
      { type: 'Function', value: 'function', start: 1, end: 9 },
      { type: 'LeftParen', value: '(', start: 9, end: 10 },
      { type: 'RightParen', value: ')', start: 10, end: 11 },
      { type: 'LeftCurly', value: '{', start: 11, end: 12 },
      { type: 'RightCurly', value: '}', start: 12, end: 13 },
      { type: 'Semicolon', value: ';', start: 13, end: 14 },
    ]
    const code = ' function(){};'
    expect(tokenize(code)).toEqual(result)
  })
  it('() => {};', () => {
    const result = [
      { type: 'LeftParen', value: '(', start: 1, end: 2 },
      { type: 'RightParen', value: ')', start: 2, end: 3 },
      { type: 'Assign', value: '=', start: 4, end: 5 },
      { type: 'GreaterSign', value: '>', start: 5, end: 6 },
      { type: 'LeftCurly', value: '{', start: 7, end: 8 },
      { type: 'RightCurly', value: '}', start: 8, end: 9 },
      { type: 'Semicolon', value: ';', start: 9, end: 10 },
    ]
    const code = ' () => {};'
    expect(tokenize(code)).toEqual(result)
  })
  it('class{};', () => {
    const result = [
      { type: 'Class', value: 'class', start: 1, end: 6 },
      { type: 'LeftCurly', value: '{', start: 6, end: 7 },
      { type: 'RightCurly', value: '}', start: 7, end: 8 },
      { type: 'Semicolon', value: ';', start: 8, end: 9 },
    ]
    const code = ' class{};'
    expect(tokenize(code)).toEqual(result)
  })
  it('a;', () => {
    const result = [
      { type: 'Identifier', value: 'a', start: 1, end: 2 },
      { type: 'Semicolon', value: ';', start: 2, end: 3 },
    ]
    const code = ' a;'
    expect(tokenize(code)).toEqual(result)
  })
  it('this;', () => {
    const result = [
      { type: 'Identifier', value: 'this', start: 1, end: 5 },
      { type: 'Semicolon', value: ';', start: 5, end: 6 },
    ]
    const code = ' this;'
    expect(tokenize(code)).toEqual(result)
  })
  it('super;', () => {
    const result = [
      { type: 'Identifier', value: 'super', start: 1, end: 6 },
      { type: 'Semicolon', value: ';', start: 6, end: 7 },
    ]
    const code = ' super;'
    expect(tokenize(code)).toEqual(result)
  })
  it('a::b;', () => {
    const result = [
      { type: 'Identifier', value: 'a', start: 0, end: 1 },
      { type: 'Colon', value: ':', start: 1, end: 2 },
      { type: 'Colon', value: ':', start: 2, end: 3 },
      { type: 'Identifier', value: 'b', start: 3, end: 4 },
      { type: 'Semicolon', value: ';', start: 4, end: 5 },
    ]
    const code = 'a::b;'
    expect(tokenize(code)).toEqual(result)
  })
})
