import { describe, expect, it } from 'vitest'
import { tokenize } from '@/parser'

describe('Declaration', () => {
  it('const a = 1;', () => {
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
        type: 'Number',
        value: '1',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 3, index: 10 },
          end: { line: 1, column: 4, index: 11 },
        },
        raw: '1',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 3, index: 11 },
          end: { line: 1, column: 4, index: 12 },
        },
      },
    ]
    const code = 'const a = 1;'
    expect(tokenize(code)).toEqual(result)
  })
  it('function b(){}', () => {
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
        value: 'b',
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
    ]
    const code = 'function b(){}'
    expect(tokenize(code)).toEqual(result)
  })
  it('class C {}', () => {
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
        type: 'Identifier',
        value: 'C',
        start: 6,
        end: 7,
        loc: {
          start: { line: 1, column: 1, index: 6 },
          end: { line: 1, column: 2, index: 7 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 2, index: 8 },
          end: { line: 1, column: 3, index: 9 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 2, index: 9 },
          end: { line: 1, column: 3, index: 10 },
        },
      },
    ]
    const code = 'class C {}'
    expect(tokenize(code)).toEqual(result)
  })
  it('import d from "e";', () => {
    const result = [
      {
        type: 'Import',
        value: 'import',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'Identifier',
        value: 'd',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'From',
        value: 'from',
        start: 9,
        end: 13,
        loc: {
          start: { line: 1, column: 2, index: 9 },
          end: { line: 1, column: 6, index: 13 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'e',
        start: 14,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 14 },
          end: { line: 1, column: 6, index: 17 },
        },
        raw: '"e"',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 17 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
    ]
    const code = 'import d from "e";'
    expect(tokenize(code)).toEqual(result)
  })
  it(`import * as b from 'b';`, () => {
    const result = [
      {
        type: 'Import',
        value: 'import',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'Asterisk',
        value: '*',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'As',
        value: 'as',
        start: 9,
        end: 11,
        loc: {
          start: { line: 1, column: 2, index: 9 },
          end: { line: 1, column: 4, index: 11 },
        },
      },
      {
        type: 'Identifier',
        value: 'b',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 3, index: 12 },
          end: { line: 1, column: 4, index: 13 },
        },
      },
      {
        type: 'From',
        value: 'from',
        start: 14,
        end: 18,
        loc: {
          start: { line: 1, column: 4, index: 14 },
          end: { line: 1, column: 8, index: 18 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'b',
        start: 19,
        end: 22,
        loc: {
          start: { line: 1, column: 5, index: 19 },
          end: { line: 1, column: 8, index: 22 },
        },
        raw: "'b'",
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 22,
        end: 23,
        loc: {
          start: { line: 1, column: 5, index: 22 },
          end: { line: 1, column: 6, index: 23 },
        },
      },
    ]
    const code = `import * as b from 'b';`
    expect(tokenize(code)).toEqual(result)
  })
  it(`import {c, d} from 'c';`, () => {
    const result = [
      {
        type: 'Import',
        value: 'import',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'Identifier',
        value: 'c',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 1, index: 8 },
          end: { line: 1, column: 2, index: 9 },
        },
      },
      {
        type: 'Comma',
        value: ',',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 9 },
          end: { line: 1, column: 2, index: 10 },
        },
      },
      {
        type: 'Identifier',
        value: 'd',
        start: 11,
        end: 12,
        loc: {
          start: { line: 1, column: 2, index: 11 },
          end: { line: 1, column: 3, index: 12 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 12,
        end: 13,
        loc: {
          start: { line: 1, column: 2, index: 12 },
          end: { line: 1, column: 3, index: 13 },
        },
      },
      {
        type: 'From',
        value: 'from',
        start: 14,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 14 },
          end: { line: 1, column: 7, index: 18 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'c',
        start: 19,
        end: 22,
        loc: {
          start: { line: 1, column: 4, index: 19 },
          end: { line: 1, column: 7, index: 22 },
        },
        raw: "'c'",
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 22,
        end: 23,
        loc: {
          start: { line: 1, column: 4, index: 22 },
          end: { line: 1, column: 5, index: 23 },
        },
      },
    ]
    const code = `import {c, d} from 'c';`
    expect(tokenize(code)).toEqual(result)
  })
  it('export default e = 1;', () => {
    const result = [
      {
        type: 'Export',
        value: 'export',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'Default',
        value: 'default',
        start: 7,
        end: 14,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 8, index: 14 },
        },
      },
      {
        type: 'Identifier',
        value: 'e',
        start: 15,
        end: 16,
        loc: {
          start: { line: 1, column: 2, index: 15 },
          end: { line: 1, column: 3, index: 16 },
        },
      },
      {
        type: 'Assign',
        value: '=',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 17 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
      {
        type: 'Number',
        value: '1',
        start: 19,
        end: 20,
        loc: {
          start: { line: 1, column: 4, index: 19 },
          end: { line: 1, column: 5, index: 20 },
        },
        raw: '1',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 20,
        end: 21,
        loc: {
          start: { line: 1, column: 4, index: 20 },
          end: { line: 1, column: 5, index: 21 },
        },
      },
    ]
    const code = 'export default e = 1;'
    expect(tokenize(code)).toEqual(result)
  })
  it('export {e};', () => {
    const result = [
      {
        type: 'Export',
        value: 'export',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'LeftCurly',
        value: '{',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'Identifier',
        value: 'e',
        start: 8,
        end: 9,
        loc: {
          start: { line: 1, column: 1, index: 8 },
          end: { line: 1, column: 2, index: 9 },
        },
      },
      {
        type: 'RightCurly',
        value: '}',
        start: 9,
        end: 10,
        loc: {
          start: { line: 1, column: 1, index: 9 },
          end: { line: 1, column: 2, index: 10 },
        },
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 10,
        end: 11,
        loc: {
          start: { line: 1, column: 1, index: 10 },
          end: { line: 1, column: 2, index: 11 },
        },
      },
    ]
    const code = 'export {e};'
    expect(tokenize(code)).toEqual(result)
  })
  it('export * from "e";', () => {
    const result = [
      {
        type: 'Export',
        value: 'export',
        start: 0,
        end: 6,
        loc: {
          start: { line: 1, column: 0, index: 0 },
          end: { line: 1, column: 6, index: 6 },
        },
      },
      {
        type: 'Asterisk',
        value: '*',
        start: 7,
        end: 8,
        loc: {
          start: { line: 1, column: 1, index: 7 },
          end: { line: 1, column: 2, index: 8 },
        },
      },
      {
        type: 'From',
        value: 'from',
        start: 9,
        end: 13,
        loc: {
          start: { line: 1, column: 2, index: 9 },
          end: { line: 1, column: 6, index: 13 },
        },
      },
      {
        type: 'StringLiteral',
        value: 'e',
        start: 14,
        end: 17,
        loc: {
          start: { line: 1, column: 3, index: 14 },
          end: { line: 1, column: 6, index: 17 },
        },
        raw: '"e"',
      },
      {
        type: 'Semicolon',
        value: ';',
        start: 17,
        end: 18,
        loc: {
          start: { line: 1, column: 3, index: 17 },
          end: { line: 1, column: 4, index: 18 },
        },
      },
    ]
    const code = 'export * from "e";'
    expect(tokenize(code)).toEqual(result)
  })
})
