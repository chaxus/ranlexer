import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Tokenizer', () => {
  /**
   * @description: word divider
   * @param {testTokenizerFunction} tokenizer
   * @return {Array}
   */
  it('testTokenizerFunction', () => {
    const result = [
      { type: 'Let', value: 'let', start: 0, end: 3 },
      { type: 'Identifier', value: 'a', start: 4, end: 5 },
      { type: 'Assign', value: '=', start: 6, end: 7 },
      { type: 'Function', value: 'function', start: 8, end: 16 },
      { type: 'LeftParen', value: '(', start: 16, end: 17 },
      { type: 'RightParen', value: ')', start: 17, end: 18 },
      { type: 'LeftCurly', value: '{', start: 19, end: 20 },
      { type: 'RightCurly', value: '}', start: 20, end: 21 },
    ]
    const code = 'let a = function() {}'
    expect(tokenize(code)).toEqual(result)
  })
  it('const baseTag = document.getElementsByTagName("base")[0];', () => {
    const result = [
      { type: 'Let', value: 'let', start: 0, end: 3 },
      { type: 'Identifier', value: 'a', start: 4, end: 5 },
      { type: 'Assign', value: '=', start: 6, end: 7 },
      { type: 'Function', value: 'function', start: 8, end: 16 },
      { type: 'LeftParen', value: '(', start: 16, end: 17 },
      { type: 'RightParen', value: ')', start: 17, end: 18 },
      { type: 'LeftCurly', value: '{', start: 19, end: 20 },
      { type: 'RightCurly', value: '}', start: 20, end: 21 },
    ]
    const code = 'let a = function() {}'
    expect(tokenize(code)).toEqual(result)
  })
})
