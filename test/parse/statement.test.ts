import { describe, expect, it } from 'vitest'
import { parse } from '@/parser'

describe('statement', () => {
  it('throw Error();', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: { type: 'Identifier', name: 'throw', start: 0, end: 5 },
          start: 0,
          end: 5,
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'Error', start: 6, end: 11 },
            arguments: [],
            start: 6,
            end: 13,
          },
          start: 6,
          end: 13,
        },
      ],
      start: 0,
      end: 13,
    }
    const code = 'throw Error();'
    expect(parse(code)).toEqual(result)
  })
  it('{}', () => {
    const result = {
      type: 'Program',
      body: [{ type: 'BlockStatement', body: [], start: 0, end: 2 }],
      start: 0,
      end: 2,
    }
    const code = '{}'
    expect(parse(code)).toEqual(result)
  })
  it('try {} catch(e) {} finally{}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: { type: 'Identifier', name: 'try', start: 0, end: 3 },
          start: 0,
          end: 3,
        },
        { type: 'BlockStatement', body: [], start: 4, end: 6 },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'catch', start: 7, end: 12 },
            arguments: [{ type: 'Identifier', name: 'e', start: 13, end: 14 }],
            start: 7,
            end: 26,
          },
          start: 7,
          end: 26,
        },
        { type: 'BlockStatement', body: [], start: 16, end: 18 },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'finally',
            start: 19,
            end: 26,
          },
          start: 19,
          end: 26,
        },
        { type: 'BlockStatement', body: [], start: 26, end: 28 },
      ],
      start: 0,
      end: 28,
    }
    const code = 'try {} catch(e) {} finally{}'
    expect(parse(code)).toEqual(result)
  })
  it('for (let key in obj) {}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ForInStatement',
          start: 0,
          end: 23,
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'key', start: 9, end: 12 },
                init: null,
                start: 9,
                end: 12,
              },
            ],
            start: 5,
            end: 12,
          },
          right: { type: 'Identifier', name: 'obj', start: 16, end: 19 },
          body: { type: 'BlockStatement', body: [], start: 21, end: 23 },
        },
      ],
      start: 0,
      end: 23,
    }
    const code = 'for (let key in obj) {}'
    expect(parse(code)).toEqual(result)
  })
  it('for (let i = 0;i < 10;i ++) {}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          start: 0,
          end: 30,
          init: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'i', start: 9, end: 10 },
                init: {
                  type: 'Literal',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '<',
              left: { type: 'Identifier', name: 'i', start: 15, end: 16 },
              right: {
                type: 'Literal',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '++',
              argument: { type: 'Identifier', name: 'i', start: 22, end: 23 },
              prefix: false,
              start: 22,
              end: 26,
            },
            start: 22,
            end: 26,
          },
          body: { type: 'BlockStatement', body: [], start: 28, end: 30 },
        },
      ],
      start: 0,
      end: 30,
    }
    const code = 'for (let i = 0;i < 10;i ++) {}'
    expect(parse(code)).toEqual(result)
  })
  it('for (const key of obj) {}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ForOfStatement',
          start: 0,
          end: 25,
          right: { type: 'Identifier', name: 'obj', start: 18, end: 21 },
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'key', start: 11, end: 14 },
                init: null,
                start: 11,
                end: 14,
              },
            ],
            start: 5,
            end: 14,
          },
          body: { type: 'BlockStatement', body: [], start: 23, end: 25 },
        },
      ],
      start: 0,
      end: 25,
    }
    const code = 'for (const key of obj) {}'
    expect(parse(code)).toEqual(result)
  })
  it('while (true) {}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'while', start: 0, end: 5 },
            arguments: [
              { type: 'Identifier', name: 'true', start: 7, end: 11 },
            ],
            start: 0,
            end: 16,
          },
          start: 0,
          end: 16,
        },
        { type: 'BlockStatement', body: [], start: 13, end: 15 },
      ],
      start: 0,
      end: 15,
    }
    const code = 'while (true) {}'
    expect(parse(code)).toEqual(result)
  })
  it('do {} while (true)', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: { type: 'Identifier', name: 'do', start: 0, end: 2 },
          start: 0,
          end: 2,
        },
        { type: 'BlockStatement', body: [], start: 3, end: 5 },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'while', start: 6, end: 11 },
            arguments: [
              { type: 'Identifier', name: 'true', start: 13, end: 17 },
            ],
            start: 6,
            end: 28,
          },
          start: 6,
          end: 28,
        },
      ],
      start: 0,
      end: 28,
    }
    const code = 'do {} while (true)'
    expect(parse(code)).toEqual(result)
  })
  it('switch (v){case 1: break;default:;}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'SwitchStatement',
          start: 0,
          end: 35,
          discriminant: { type: 'Identifier', name: 'v', start: 8, end: 9 },
          cases: [
            {
              type: 'SwitchCase',
              start: 11,
              end: 24,
              test: {
                type: 'Literal',
                value: '1',
                start: 16,
                end: 17,
                raw: '1',
              },
              consequent: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
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
              type: 'SwitchCase',
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
    expect(parse(code)).toEqual(result)
  })
  it('label: console.log();', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'LabeledStatement',
          label: { type: 'Identifier', name: 'label', start: 0, end: 5 },
          start: 0,
          end: 20,
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'console',
                  start: 7,
                  end: 14,
                },
                property: {
                  type: 'Identifier',
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
              end: 20,
            },
            start: 7,
            end: 20,
          },
        },
      ],
      start: 0,
      end: 20,
    }
    const code = 'label: console.log();'
    expect(parse(code)).toEqual(result)
  })
  it('with (a){}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'with', start: 0, end: 4 },
            arguments: [{ type: 'Identifier', name: 'a', start: 6, end: 7 }],
            start: 0,
            end: 11,
          },
          start: 0,
          end: 11,
        },
        { type: 'BlockStatement', body: [], start: 8, end: 10 },
      ],
      start: 0,
      end: 10,
    }
    const code = 'with (a){}'
    expect(parse(code)).toEqual(result)
  })
  it('break;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: { type: 'Identifier', name: 'break', start: 0, end: 5 },
          start: 0,
          end: 5,
        },
      ],
      start: 0,
      end: 5,
    }
    const code = 'break;'
    expect(parse(code)).toEqual(result)
  })
  it('continue;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
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
    const code = 'continue;'
    expect(parse(code)).toEqual(result)
  })
  it('return;', () => {
    const result = {
      type: 'Program',
      body: [{ type: 'ReturnStatement', argument: null, start: 0, end: 6 }],
      start: 0,
      end: 6,
    }
    const code = 'return;'
    expect(parse(code)).toEqual(result)
  })
  it('debugger;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
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
    const code = 'debugger;'
    expect(parse(code)).toEqual(result)
  })
  it('if statement', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          start: 0,
          end: 12,
          test: { type: 'Identifier', name: 'a', start: 4, end: 5 },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: { type: 'Identifier', name: 'b', start: 7, end: 8 },
              right: {
                type: 'Literal',
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
    const result = {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          start: 0,
          end: 12,
          test: { type: 'Identifier', name: 'a', start: 4, end: 5 },
          consequent: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: { type: 'Identifier', name: 'b', start: 8, end: 9 },
                  right: {
                    type: 'Literal',
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
    expect(parse(code)).toEqual(result)
  })
  it('member expression nested', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: { type: 'Identifier', name: 'a', start: 0, end: 1 },
              property: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: { type: 'Identifier', name: 'c', start: 2, end: 3 },
                  arguments: [
                    { type: 'Identifier', name: 'e', start: 4, end: 5 },
                    { type: 'Identifier', name: 'd', start: 6, end: 7 },
                  ],
                  start: 2,
                  end: 10,
                },
                property: { type: 'Identifier', name: 'g', start: 9, end: 10 },
                start: 2,
                end: 11,
                computed: true,
              },
              start: 0,
              end: 12,
              computed: true,
            },
            arguments: [],
            start: 0,
            end: 14,
          },
          start: 0,
          end: 14,
        },
      ],
      start: 0,
      end: 14,
    }
    const code = 'a[c(e,d)[g]]()'
    expect(parse(code)).toEqual(result)
  })
  it('member expression computed', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
              object: { type: 'Identifier', name: 'a', start: 0, end: 1 },
              property: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'b', start: 2, end: 3 },
                arguments: [],
                start: 2,
                end: 5,
              },
              start: 0,
              end: 6,
              computed: true,
            },
            property: {
              type: 'Literal',
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
    expect(parse(code)).toEqual(result)
  })
  it('instanceof', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: { type: 'Identifier', name: 'a', start: 9, end: 10 },
          params: [],
          async: false,
          generator: false,
          body: { type: 'BlockStatement', body: [], start: 12, end: 14 },
          start: 0,
          end: 14,
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: 'instanceof',
            left: { type: 'Identifier', name: 'a', start: 16, end: 17 },
            right: { type: 'Identifier', name: 'Function', start: 29, end: 37 },
            start: 18,
            end: 37,
          },
          start: 18,
          end: 37,
        },
      ],
      start: 0,
      end: 37,
    }
    const code = 'function a(){}; a instanceof Function;'
    expect(parse(code)).toEqual(result)
  })
  it('const [a,b] = c;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'ArrayPattern',
                elements: [
                  { type: 'Identifier', name: 'a', start: 7, end: 8 },
                  { type: 'Identifier', name: 'b', start: 9, end: 10 },
                ],
                start: 6,
                end: 11,
              },
              init: { type: 'Identifier', name: 'c', start: 14, end: 15 },
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
    expect(parse(code)).toEqual(result)
  })
  it('const {a,b} = c;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    start: 7,
                    end: 8,
                    type: 'Property',
                    kind: 'init',
                    key: {
                      type: 'Identifier',
                      name: 'a',
                      start: 7,
                      end: 8,
                    },
                    value: {
                      type: 'Identifier',
                      name: 'a',
                      start: 7,
                      end: 8,
                    },
                  },
                  {
                    start: 9,
                    end: 10,
                    type: 'Property',
                    kind: 'init',
                    key: {
                      type: 'Identifier',
                      name: 'b',
                      start: 9,
                      end: 10,
                    },
                    value: {
                      type: 'Identifier',
                      name: 'b',
                      start: 9,
                      end: 10,
                    },
                  },
                ],
                start: 6,
                end: 11,
              },
              init: { type: 'Identifier', name: 'c', start: 14, end: 15 },
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
    expect(parse(code)).toEqual(result)
  })
  it('ConditionalExpression', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            start: 0,
            end: 9,
            test: { type: 'Identifier', name: 'a', start: 0, end: 1 },
            consequent: { type: 'Identifier', name: 'b', start: 4, end: 5 },
            alternate: { type: 'Identifier', name: 'c', start: 8, end: 9 },
          },
          start: 0,
          end: 9,
        },
      ],
      start: 0,
      end: 9,
    }
    const code = 'a ? b : c'
    expect(parse(code)).toEqual(result)
  })
  it('iife function', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'FunctionExpression',
              id: null,
              params: [],
              body: { type: 'BlockStatement', body: [], start: 11, end: 13 },
              async: false,
              generator: false,
              start: 1,
              end: 14,
            },
            arguments: [],
            start: 1,
            end: 16,
          },
          start: 1,
          end: 16,
        },
      ],
      start: 0,
      end: 16,
    }
    const code = '(function(){})()'
    expect(parse(code)).toEqual(result)
  })
  it('nest CallExpression', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'CallExpression',
              callee: {
                type: 'CallExpression',
                callee: { type: 'Identifier', name: 'a', start: 0, end: 1 },
                arguments: [],
                start: 0,
                end: 3,
              },
              arguments: [],
              start: 0,
              end: 5,
            },
            arguments: [],
            start: 0,
            end: 7,
          },
          start: 0,
          end: 7,
        },
      ],
      start: 0,
      end: 7,
    }
    const code = 'a()()()'
    expect(parse(code)).toEqual(result)
  })
  it('nest AssignmentExpression', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: { type: 'Identifier', name: 'a', start: 2, end: 3 },
            right: { type: 'Identifier', name: 'b', start: 4, end: 5 },
            start: 3,
            end: 7,
          },
          start: 3,
          end: 7,
        },
      ],
      start: 0,
      end: 7,
    }
    const code = '((a=b))'
    expect(parse(code)).toEqual(result)
  })
  it('nest AssignmentExpression and function', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: { type: 'Identifier', name: 'a', start: 0, end: 1 },
            right: {
              type: 'AssignmentExpression',
              operator: '=',
              left: { type: 'Identifier', name: 'b', start: 2, end: 3 },
              right: {
                type: 'FunctionExpression',
                id: { type: 'Identifier', name: 'a', start: 13, end: 14 },
                params: [],
                body: { type: 'BlockStatement', body: [], start: 16, end: 18 },
                async: false,
                generator: false,
                start: 4,
                end: 18,
              },
              start: 3,
              end: 18,
            },
            start: 1,
            end: 18,
          },
          start: 1,
          end: 18,
        },
      ],
      start: 0,
      end: 18,
    }
    const code = 'a=b=function a(){}'
    expect(parse(code)).toEqual(result)
  })
})
