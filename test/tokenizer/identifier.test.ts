import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Identifier', () => {
  it('const name = "a";', () => {
    const result = [
      { type: 'Const', value: 'const', start: 0, end: 5 },
      { type: 'Identifier', value: 'name', start: 6, end: 10 },
      { type: 'Assign', value: '=', start: 11, end: 12 },
      { type: 'StringLiteral', value: 'a', start: 13, end: 16, raw: '"a"' },
      { type: 'Semicolon', value: ';', start: 16, end: 17 },
    ]
    const code = 'const name = "a";'
    expect(tokenize(code)).toEqual(result)
  })
  it('function', () => {
    const result = [
      { type: 'Function', value: 'function', start: 0, end: 8 },
      { type: 'Identifier', value: 'say', start: 9, end: 12 },
      { type: 'LeftParen', value: '(', start: 12, end: 13 },
      { type: 'Identifier', value: 'name', start: 13, end: 17 },
      { type: 'RightParen', value: ')', start: 17, end: 18 },
      { type: 'LeftCurly', value: '{', start: 19, end: 20 },
      { type: 'Identifier', value: 'console', start: 20, end: 27 },
      { type: 'Dot', value: '.', start: 27, end: 28 },
      { type: 'Identifier', value: 'log', start: 28, end: 31 },
      { type: 'LeftParen', value: '(', start: 31, end: 32 },
      { type: 'Identifier', value: 'name', start: 32, end: 36 },
      { type: 'RightParen', value: ')', start: 36, end: 37 },
      { type: 'Semicolon', value: ';', start: 37, end: 38 },
      { type: 'RightCurly', value: '}', start: 38, end: 39 },
    ]
    const code = `function say(name) {console.log(name);}`
    expect(tokenize(code)).toEqual(result)
  })
  it('object', () => {
    const result = [
      { type: 'Const', value: 'const', start: 0, end: 5 },
      { type: 'Identifier', value: 'obj', start: 6, end: 9 },
      { type: 'Assign', value: '=', start: 10, end: 11 },
      { type: 'LeftCurly', value: '{', start: 12, end: 13 },
      { type: 'Identifier', value: 'name', start: 13, end: 17 },
      { type: 'Colon', value: ':', start: 17, end: 18 },
      { type: 'StringLiteral', value: 'a', start: 19, end: 22, raw: "'a'" },
      { type: 'RightCurly', value: '}', start: 22, end: 23 },
    ]
    const code = `const obj = {name: 'a'}`
    expect(tokenize(code)).toEqual(result)
  })
  it('const name = "a";', () => {
    const result = [
      { type: 'Const', value: 'const', start: 0, end: 5 },
      { type: 'Identifier', value: 'name', start: 6, end: 10 },
      { type: 'Assign', value: '=', start: 11, end: 12 },
      { type: 'StringLiteral', value: 'a', start: 13, end: 16, raw: '"a"' },
      { type: 'Semicolon', value: ';', start: 16, end: 17 },
    ]
    const code = 'const name = "a";'
    expect(tokenize(code)).toEqual(result)
  })
  it('const name = "a";', () => {
    const result = [
      { type: 'Const', value: 'const', start: 0, end: 5 },
      { type: 'Identifier', value: 'name', start: 6, end: 10 },
      { type: 'Assign', value: '=', start: 11, end: 12 },
      { type: 'StringLiteral', value: 'a', start: 13, end: 16, raw: '"a"' },
      { type: 'Semicolon', value: ';', start: 16, end: 17 },
    ]
    const code = 'const name = "a";'
    expect(tokenize(code)).toEqual(result)
  })
})
