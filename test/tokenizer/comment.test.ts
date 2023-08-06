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

const code = `
// 1. Determines whether it is a delimiter
/**
  * @description: Main program, scan string to generate token
  */
`

const commentAst = {
  "type": "File",
  "start": 0,
  "end": 114,
  "loc": {
    "start": {
      "line": 1,
      "column": 0,
      "index": 0
    },
    "end": {
      "line": 5,
      "column": 0,
      "index": 114
    }
  },
  "errors": [],
  "program": {
    "type": "Program",
    "start": 0,
    "end": 114,
    "loc": {
      "start": {
        "line": 1,
        "column": 0,
        "index": 0
      },
      "end": {
        "line": 5,
        "column": 0,
        "index": 114
      }
    },
    "sourceType": "module",
    "interpreter": null,
    "body": [],
    "directives": [],
    "innerComments": [
      {
        "type": "CommentLine",
        "value": " 1. Determines whether it is a delimiter",
        "start": 0,
        "end": 42,
        "loc": {
          "start": {
            "line": 1,
            "column": 0,
            "index": 0
          },
          "end": {
            "line": 1,
            "column": 42,
            "index": 42
          }
        }
      },
      {
        "type": "CommentBlock",
        "value": "*\n  * @description: Main program, scan string to generate token\n  ",
        "start": 43,
        "end": 113,
        "loc": {
          "start": {
            "line": 2,
            "column": 0,
            "index": 43
          },
          "end": {
            "line": 4,
            "column": 4,
            "index": 113
          }
        }
      }
    ]
  },
  "comments": [
    {
      "type": "CommentLine",
      "value": " 1. Determines whether it is a delimiter",
      "start": 0,
      "end": 42,
      "loc": {
        "start": {
          "line": 1,
          "column": 0,
          "index": 0
        },
        "end": {
          "line": 1,
          "column": 42,
          "index": 42
        }
      }
    },
    {
      "type": "CommentBlock",
      "value": "*\n  * @description: Main program, scan string to generate token\n  ",
      "start": 43,
      "end": 113,
      "loc": {
        "start": {
          "line": 2,
          "column": 0,
          "index": 43
        },
        "end": {
          "line": 4,
          "column": 4,
          "index": 113
        }
      }
    }
  ]
}