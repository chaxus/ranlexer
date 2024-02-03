import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Literal', () => {
  /**
   * @description: word divider
   * @param {testTokenizerFunction} tokenizer
   * @return {Array}
   */
  it('string literal', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'string',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
    ]
    const code = 'string'
    expect(tokenize(code)).toEqual(result)
  })
  it('RegExp literal', () => {
    const result = [
      {
        type: 'BinaryOperator',
        value: '/',
        start: 0,
        end: 1,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 1, index: 1 },
        },
      },
      {
        type: 'BinaryOperator',
        value: '^',
        start: 1,
        end: 2,
        loc: {
          start: { line: 1, column: 0, index: 1 },
          end: { line: 1, column: 1, index: 2 },
        },
      },
      {
        type: 'LeftBracket',
        value: '[',
        start: 2,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 2 },
          end: { line: 1, column: 1, index: 3 },
        },
      },
      {
        type: 'Identifier',
        value: 'a',
        start: 3,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 3 },
          end: { line: 1, column: 1, index: 4 },
        },
      },
      {
        type: 'BinaryOperator',
        value: '-',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 4 },
          end: { line: 1, column: 1, index: 5 },
        },
      },
      {
        type: 'Identifier',
        value: 'z',
        start: 5,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 5 },
          end: { line: 1, column: 1, index: 6 },
        },
      },
      {
        type: 'RightBracket',
        value: ']',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 0, index: 6 },
          end: { line: 1, column: 1, index: 7 },
        },
      },
      {
        type: 'BinaryOperator',
        value: '+',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 0, index: 7 },
          end: { line: 1, column: 1, index: 8 },
        },
      },
      {
        type: 'BinaryOperator',
        value: '/',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 0, index: 8 },
          end: { line: 1, column: 1, index: 9 },
        },
      },
      {
        type: 'Identifier',
        value: 'g',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 0, index: 9 },
          end: { line: 1, column: 1, index: 10 },
        },
      },
    ]
    const code = '/^[a-z]+/g'
    expect(tokenize(code)).toEqual(result)
  })
  it('boolean literal', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'true',
        start: 0,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 4, index: 4 },
        },
      },
    ]
    const code = 'true'
    expect(tokenize(code)).toEqual(result)
  })
  it('bigInt literal', () => {
    const result = [
      {
        type: 'Number',
        value: '1.23',
        start: 0,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 4, index: 4 },
        },
        raw: '1.23',
      },
      {
        type: 'Identifier',
        value: 'n',
        start: 4,
        end: 5,
        loc: {
          start: { line: 1, column: 0, index: 4 },
          end: { line: 1, column: 1, index: 5 },
        },
      },
    ]
    const code = '1.23n'
    expect(tokenize(code)).toEqual(result)
  })
  it('null literal', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'null',
        start: 0,
        end: 4,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 4, index: 4 },
        },
      },
    ]
    const code = 'null'
    expect(tokenize(code)).toEqual(result)
  })
  it('undefined literal', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'undefined',
        start: 0,
        end: 9,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 9, index: 9 },
        },
      },
    ]
    const code = 'undefined'
    expect(tokenize(code)).toEqual(result)
  })
  it('    literal', () => {
    const result: unknown = []
    const code = '     '
    expect(tokenize(code)).toEqual(result)
  })
})
