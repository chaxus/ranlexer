import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Directive', () => {
  it('use strict', () => {
    const result = [
      { type: 'Identifier', value: 'use', start: 0, end: 3 },
      { type: 'Identifier', value: 'strict', start: 4, end: 10 },
    ]
    const code = 'use strict'
    expect(tokenize(code)).toEqual(result)
  })
})
