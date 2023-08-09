import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { parse } from '@/parser'
import type { Program } from '@/ast/NodeType'
import { NodeType } from '@/ast/NodeType'

describe('statement', () => {
  it('throw Error();', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'throw',
            start: 0,
            end: 5,
          },
          start: 0,
          end: 5,
        },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              type: NodeType.Identifier,
              name: 'Error',
              start: 6,
              end: 11,
            },
            arguments: [],
            start: 6,
            end: 11,
          },
          start: 6,
          end: 11,
        },
      ],
      start: 0,
      end: 11,
    }
    const code = 'throw Error()'
    expect(generate(result)).toEqual(code)
  })
  it('{}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [{ type: NodeType.BlockStatement, body: [], start: 0, end: 2 }],
      start: 0,
      end: 2,
    }
    const code = '{}'
    expect(generate(result)).toEqual(code)
  })
  it('try {} catch(e) {} finally{}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'try',
            start: 0,
            end: 3,
          },
          start: 0,
          end: 3,
        },
        { type: NodeType.BlockStatement, body: [], start: 4, end: 6 },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              type: NodeType.Identifier,
              name: 'catch',
              start: 7,
              end: 12,
            },
            arguments: [
              { type: NodeType.Identifier, name: 'e', start: 13, end: 14 },
            ],
            start: 7,
            end: 15,
          },
          start: 7,
          end: 15,
        },
        { type: NodeType.BlockStatement, body: [], start: 16, end: 18 },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'finally',
            start: 19,
            end: 26,
          },
          start: 19,
          end: 26,
        },
        { type: NodeType.BlockStatement, body: [], start: 26, end: 28 },
      ],
      start: 0,
      end: 28,
    }
    const code = 'try {} catch(e) {} finally{}'
    expect(generate(result)).toEqual(code)
  })
  it('for (let key in obj) {}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ForInStatement,
          start: 0,
          end: 23,
          left: {
            type: NodeType.VariableDeclaration,
            kind: 'let',
            declarations: [
              {
                type: NodeType.VariableDeclarator,
                id: {
                  type: NodeType.Identifier,
                  name: 'key',
                  start: 9,
                  end: 12,
                },
                init: null,
                start: 9,
                end: 12,
              },
            ],
            start: 5,
            end: 12,
          },
          right: { type: NodeType.Identifier, name: 'obj', start: 16, end: 19 },
          body: { type: NodeType.BlockStatement, body: [], start: 21, end: 23 },
        },
      ],
      start: 0,
      end: 23,
    }
    const code = 'for( let key in obj) {}'
    expect(generate(result)).toEqual(code)
  })
  it('for (let i = 0;i < 10;i ++) {}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ForStatement,
          start: 0,
          end: 30,
          init: {
            type: NodeType.VariableDeclaration,
            kind: 'let',
            declarations: [
              {
                type: NodeType.VariableDeclarator,
                id: { type: NodeType.Identifier, name: 'i', start: 9, end: 10 },
                init: {
                  type: NodeType.Literal,
                  value: '0',
                  start: 13,
                  end: 14,
                  raw: '0',
                },
                start: 9,
                end: 14,
              },
            ],
            start: 5,
            end: 14,
          },
          test: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.BinaryExpression,
              operator: '<',
              left: {
                type: NodeType.Identifier,
                name: 'i',
                start: 15,
                end: 16,
              },
              right: {
                type: NodeType.Literal,
                value: '10',
                start: 19,
                end: 21,
                raw: '10',
              },
              start: 17,
              end: 21,
            },
            start: 17,
            end: 21,
          },
          update: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.UpdateExpression,
              operator: '++',
              argument: {
                type: NodeType.Identifier,
                name: 'i',
                start: 22,
                end: 23,
              },
              prefix: false,
              start: 22,
              end: 26,
            },
            start: 22,
            end: 26,
          },
          body: { type: NodeType.BlockStatement, body: [], start: 28, end: 30 },
        },
      ],
      start: 0,
      end: 30,
    }
    const code = 'for( let i = 0;i < 10;i++ ) {}'
    expect(generate(result)).toEqual(code)
  })
  it('for (const key of obj) {}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ForOfStatement,
          start: 0,
          end: 25,
          right: { type: NodeType.Identifier, name: 'obj', start: 18, end: 21 },
          left: {
            type: NodeType.VariableDeclaration,
            kind: 'const',
            declarations: [
              {
                type: NodeType.VariableDeclarator,
                id: {
                  type: NodeType.Identifier,
                  name: 'key',
                  start: 11,
                  end: 14,
                },
                init: null,
                start: 11,
                end: 14,
              },
            ],
            start: 5,
            end: 14,
          },
          body: { type: NodeType.BlockStatement, body: [], start: 23, end: 25 },
        },
      ],
      start: 0,
      end: 25,
    }
    const code = 'for( const key of obj) {}'
    expect(generate(result)).toEqual(code)
  })
  it('while (true) {}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              type: NodeType.Identifier,
              name: 'while',
              start: 0,
              end: 5,
            },
            arguments: [
              { type: NodeType.Identifier, name: 'true', start: 7, end: 11 },
            ],
            start: 0,
            end: 12,
          },
          start: 0,
          end: 12,
        },
        { type: NodeType.BlockStatement, body: [], start: 13, end: 15 },
      ],
      start: 0,
      end: 15,
    }
    const code = 'while (true) {}'
    expect(generate(result)).toEqual(code)
  })
  it('do {} while (true)', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'do',
            start: 0,
            end: 2,
          },
          start: 0,
          end: 2,
        },
        { type: NodeType.BlockStatement, body: [], start: 3, end: 5 },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              type: NodeType.Identifier,
              name: 'while',
              start: 6,
              end: 11,
            },
            arguments: [
              { type: NodeType.Identifier, name: 'true', start: 13, end: 17 },
            ],
            start: 6,
            end: 18,
          },
          start: 6,
          end: 18,
        },
      ],
      start: 0,
      end: 18,
    }
    const code = 'do {} while (true)'
    expect(generate(result)).toEqual(code)
  })
  it('switch (v){case 1: break;default:;}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.SwitchStatement,
          start: 0,
          end: 35,
          discriminant: {
            type: NodeType.Identifier,
            name: 'v',
            start: 8,
            end: 9,
          },
          cases: [
            {
              type: NodeType.SwitchCase,
              start: 11,
              end: 24,
              test: {
                type: NodeType.Literal,
                value: '1',
                start: 16,
                end: 17,
                raw: '1',
              },
              consequent: [
                {
                  type: NodeType.ExpressionStatement,
                  expression: {
                    type: NodeType.Identifier,
                    name: 'break',
                    start: 19,
                    end: 24,
                  },
                  start: 19,
                  end: 24,
                },
              ],
            },
            {
              type: NodeType.SwitchCase,
              start: 25,
              end: 33,
              test: null,
              consequent: [],
            },
          ],
        },
      ],
      start: 0,
      end: 35,
    }
    const code = 'switch (v){case 1: break;default:;}'
    expect(generate(result)).toEqual(code)
  })
  it('label: console.log();', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.LabeledStatement,
          label: { type: NodeType.Identifier, name: 'label', start: 0, end: 5 },
          start: 0,
          end: 18,
          body: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.CallExpression,
              callee: {
                type: NodeType.MemberExpression,
                object: {
                  type: NodeType.Identifier,
                  name: 'console',
                  start: 7,
                  end: 14,
                },
                property: {
                  type: NodeType.Identifier,
                  name: 'log',
                  start: 15,
                  end: 18,
                },
                start: 7,
                end: 18,
                computed: false,
              },
              arguments: [],
              start: 7,
              end: 18,
            },
            start: 7,
            end: 18,
          },
        },
      ],
      start: 0,
      end: 18,
    }
    const code = 'label: console.log()'
    expect(generate(result)).toEqual(code)
  })
  it('with (a){}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              type: NodeType.Identifier,
              name: 'with',
              start: 0,
              end: 4,
            },
            arguments: [
              { type: NodeType.Identifier, name: 'a', start: 6, end: 7 },
            ],
            start: 0,
            end: 8,
          },
          start: 0,
          end: 8,
        },
        { type: NodeType.BlockStatement, body: [], start: 8, end: 10 },
      ],
      start: 0,
      end: 10,
    }
    const code = 'with (a){}'
    expect(generate(result)).toEqual(code)
  })
  it('break', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'break',
            start: 0,
            end: 5,
          },
          start: 0,
          end: 5,
        },
      ],
      start: 0,
      end: 5,
    }
    const code = 'break'
    expect(generate(result)).toEqual(code)
  })
  it('continue;', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'continue',
            start: 0,
            end: 8,
          },
          start: 0,
          end: 8,
        },
      ],
      start: 0,
      end: 8,
    }
    const code = 'continue'
    expect(generate(result)).toEqual(code)
  })
  it('return', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        { type: NodeType.ReturnStatement, argument: null, start: 0, end: 6 },
      ],
      start: 0,
      end: 6,
    }
    const code = 'return'
    expect(generate(result)).toEqual(code)
  })
  it('debugger', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.Identifier,
            name: 'debugger',
            start: 0,
            end: 8,
          },
          start: 0,
          end: 8,
        },
      ],
      start: 0,
      end: 8,
    }
    const code = 'debugger'
    expect(generate(result)).toEqual(code)
  })
  it('if statement', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.IfStatement,
          start: 0,
          end: 12,
          test: { type: NodeType.Identifier, name: 'a', start: 4, end: 5 },
          consequent: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.AssignmentExpression,
              operator: '=',
              left: { type: NodeType.Identifier, name: 'b', start: 7, end: 8 },
              right: {
                type: NodeType.Literal,
                value: '1',
                start: 11,
                end: 12,
                raw: '1',
              },
              start: 9,
              end: 12,
            },
            start: 9,
            end: 12,
          },
          alternate: null,
        },
      ],
      start: 0,
      end: 12,
    }
    const code = 'if (a) b = 1'
    expect(parse(code)).toEqual(result)
  })
  it('if BlockStatement', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.IfStatement,
          start: 0,
          end: 12,
          test: { type: NodeType.Identifier, name: 'a', start: 4, end: 5 },
          consequent: {
            type: NodeType.BlockStatement,
            body: [
              {
                type: NodeType.ExpressionStatement,
                expression: {
                  type: NodeType.BinaryExpression,
                  operator: '=',
                  left: {
                    type: NodeType.Identifier,
                    name: 'b',
                    start: 8,
                    end: 9,
                  },
                  right: {
                    type: NodeType.Literal,
                    value: '1',
                    start: 10,
                    end: 11,
                    raw: '1',
                  },
                  start: 9,
                  end: 11,
                },
                start: 9,
                end: 11,
              },
            ],
            start: 7,
            end: 12,
          },
          alternate: null,
        },
      ],
      start: 0,
      end: 12,
    }
    const code = 'if (a) {b=1}'
    expect(generate(result)).toEqual(code)
  })
  it('member expression computed', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.MemberExpression,
            object: {
              type: NodeType.MemberExpression,
              object: {
                type: NodeType.Identifier,
                name: 'a',
                start: 0,
                end: 1,
              },
              property: {
                type: NodeType.CallExpression,
                callee: {
                  type: NodeType.Identifier,
                  name: 'b',
                  start: 2,
                  end: 3,
                },
                arguments: [],
                start: 2,
                end: 3,
              },
              start: 0,
              end: 6,
              computed: true,
            },
            property: {
              type: NodeType.Literal,
              value: '12',
              start: 7,
              end: 9,
              raw: '12',
            },
            start: 0,
            end: 10,
            computed: true,
          },
          start: 0,
          end: 10,
        },
      ],
      start: 0,
      end: 10,
    }
    const code = 'a[b()][12]'
    expect(generate(result)).toEqual(code)
  })
  it('const [a,b] = c;', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: {
                type: NodeType.ArrayPattern,
                elements: [
                  { type: NodeType.Identifier, name: 'a', start: 7, end: 8 },
                  { type: NodeType.Identifier, name: 'b', start: 9, end: 10 },
                ],
                start: 6,
                end: 11,
              },
              init: {
                type: NodeType.Identifier,
                name: 'c',
                start: 14,
                end: 15,
              },
              start: 6,
              end: 15,
            },
          ],
          start: 0,
          end: 15,
        },
      ],
      start: 0,
      end: 15,
    }
    const code = 'const [a,b] = c;'
    expect(generate(result)).toEqual(code)
  })
  it('const {a,b} = c;', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: {
                type: NodeType.ObjectPattern,
                properties: [
                  {
                    start: 7,
                    end: 8,
                    type: NodeType.Property,
                    kind: 'init',
                    key: {
                      type: NodeType.Identifier,
                      name: 'a',
                      start: 7,
                      end: 8,
                    },
                    value: {
                      type: NodeType.Identifier,
                      name: 'a',
                      start: 7,
                      end: 8,
                    },
                  },
                  {
                    start: 9,
                    end: 10,
                    type: NodeType.Property,
                    kind: 'init',
                    key: {
                      type: NodeType.Identifier,
                      name: 'b',
                      start: 9,
                      end: 10,
                    },
                    value: {
                      type: NodeType.Identifier,
                      name: 'b',
                      start: 9,
                      end: 10,
                    },
                  },
                ],
                start: 6,
                end: 11,
              },
              init: {
                type: NodeType.Identifier,
                name: 'c',
                start: 14,
                end: 15,
              },
              start: 6,
              end: 15,
            },
          ],
          start: 0,
          end: 15,
        },
      ],
      start: 0,
      end: 15,
    }
    const code = 'const {a,b} = c;'
    expect(generate(result)).toEqual(code)
  })
})
