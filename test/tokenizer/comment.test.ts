import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Comment', () => {
  it('// c', () => {
    const result = [
      { type: 'BinaryOperator', value: '/', start: 0, end: 1 },
      { type: 'BinaryOperator', value: '/', start: 1, end: 2 },
      { type: 'Identifier', value: 'c', start: 3, end: 4 },
    ]
    const code = '// c'
    expect(tokenize(code)).toEqual(result)
  })
  // it('/* c */', () => {
  //   const result = [
  //     { type: 'BinaryOperator', value: '/', start: 0, end: 1 },
  //     { type: 'BinaryOperator', value: '*', start: 1, end: 2 },
  //     { type: 'Identifier', value: 'c', start: 3, end: 4 },
  //     { type: 'BinaryOperator', value: '*', start: 5, end: 6 },
  //     { type: 'BinaryOperator', value: '/', start: 6, end: 7 },
  //   ]
  //   const code = '/* c */'
  //   expect(tokenize(code)).toEqual(result)
  // })
})
