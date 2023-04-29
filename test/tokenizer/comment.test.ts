import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Comment', () => {
  it('// c', () => {
    const result = [
      { type: 'Operator', value: '/', start: 0, end: 1 },
      { type: 'Operator', value: '/', start: 1, end: 2 },
      { type: 'Identifier', value: 'c', start: 3, end: 4 },
    ]
    const code = '// c'
    expect(tokenize(code)).toEqual(result)
  })
  it('/* c */', () => {
    const result = [
      { type: 'Operator', value: '/', start: 0, end: 1 },
      { type: 'Operator', value: '*', start: 1, end: 2 },
      { type: 'Identifier', value: 'c', start: 3, end: 4 },
      { type: 'Operator', value: '*', start: 5, end: 6 },
      { type: 'Operator', value: '/', start: 6, end: 7 },
    ]
    const code = '/* c */'
    expect(tokenize(code)).toEqual(result)
  })
})
