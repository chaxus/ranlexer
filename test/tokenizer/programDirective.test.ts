import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Directive', () => {
  it('use strict', () => {
    const result = [
      {
        type: 'Identifier',
        value: 'use',
        start: 0,
        end: 3,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 3, index: 3 },
        },
      },
      {
        type: 'Identifier',
        value: 'strict',
        start: 4,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 4 },
          end: { line: 1, column: 7, index: 10 },
        },
      },
    ]
    const code = 'use strict'
    expect(tokenize(code)).toEqual(result)
  })
})
