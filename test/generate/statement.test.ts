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
            start: 0,
            end: 5,
            type: NodeType.Identifier,
            name: 'throw',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 5, index: 5 },
            },
          },
          start: 0,
          end: 5,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 5, index: 5 },
          },
        },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              start: 6,
              end: 11,
              type: NodeType.Identifier,
              name: 'Error',
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 11 },
              },
            },
            start: 6,
            end: 13,
            arguments: [],
            loc: {
              start: { line: 1, column: 1, index: 6 },
              end: { column: 8, index: 13, line: 1 },
            },
          },
          start: 6,
          end: 13,
          loc: {
            start: { line: 1, column: 1, index: 6 },
            end: { column: 8, index: 13, line: 1 },
          },
        },
      ],
      start: 0,
      end: 13,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 8, index: 13, line: 1 },
      },
    }
    const code = 'throw Error()'
    expect(generate(result)).toEqual(code)
  })
  it('{}', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.BlockStatement,
          start: 0,
          end: 2,
          body: [],
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 1, index: 2 },
          },
        },
      ],
      start: 0,
      end: 2,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 1, index: 2 },
      },
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
            start: 0,
            end: 3,
            type: NodeType.Identifier,
            name: 'try',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 3, index: 3 },
            },
          },
          start: 0,
          end: 3,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 3, index: 3 },
          },
        },
        {
          type: NodeType.BlockStatement,
          start: 4,
          end: 6,
          body: [],
          loc: {
            start: { line: 1, column: 1, index: 4 },
            end: { line: 1, column: 2, index: 6 },
          },
        },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              start: 7,
              end: 12,
              type: NodeType.Identifier,
              name: 'catch',
              loc: {
                start: { line: 1, column: 2, index: 7 },
                end: { line: 1, column: 7, index: 12 },
              },
            },
            start: 7,
            end: 26,
            arguments: [
              {
                start: 13,
                end: 14,
                type: NodeType.Identifier,
                name: 'e',
                loc: {
                  start: { line: 1, column: 2, index: 13 },
                  end: { line: 1, column: 3, index: 14 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 2, index: 7 },
              end: { column: 10, index: 15, line: 1 },
            },
          },
          start: 7,
          end: 26,
          loc: {
            start: { line: 1, column: 2, index: 7 },
            end: { column: 10, index: 15, line: 1 },
          },
        },
        {
          type: NodeType.BlockStatement,
          start: 16,
          end: 18,
          body: [],
          loc: {
            start: { line: 1, column: 3, index: 16 },
            end: { line: 1, column: 4, index: 18 },
          },
        },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            start: 19,
            end: 26,
            type: NodeType.Identifier,
            name: 'finally',
            loc: {
              start: { line: 1, column: 4, index: 19 },
              end: { line: 1, column: 11, index: 26 },
            },
          },
          start: 19,
          end: 26,
          loc: {
            start: { line: 1, column: 4, index: 19 },
            end: { line: 1, column: 11, index: 26 },
          },
        },
        {
          type: NodeType.BlockStatement,
          start: 26,
          end: 28,
          body: [],
          loc: {
            start: { line: 1, column: 4, index: 26 },
            end: { line: 1, column: 5, index: 28 },
          },
        },
      ],
      start: 0,
      end: 28,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 5, index: 28 },
      },
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
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 23 },
          },
          right: {
            start: 16,
            end: 19,
            type: NodeType.Identifier,
            name: 'obj',
            loc: {
              start: { line: 1, column: 4, index: 16 },
              end: { line: 1, column: 7, index: 19 },
            },
          },
          left: {
            type: NodeType.VariableDeclaration,
            kind: 'let',
            declarations: [
              {
                type: NodeType.VariableDeclarator,
                id: {
                  start: 9,
                  end: 12,
                  type: NodeType.Identifier,
                  name: 'key',
                  loc: {
                    start: { line: 1, column: 2, index: 9 },
                    end: { line: 1, column: 5, index: 12 },
                  },
                },
                init: null,
                start: 9,
                end: 12,
                loc: {
                  start: { line: 1, column: 2, index: 9 },
                  end: { line: 1, column: 5, index: 12 },
                },
              },
            ],
            start: 5,
            end: 12,
            loc: {
              start: { line: 1, column: 1, index: 5 },
              end: { line: 1, column: 5, index: 12 },
            },
          },
          body: {
            type: NodeType.BlockStatement,
            start: 21,
            end: 23,
            body: [],
            loc: {
              start: { line: 1, column: 5, index: 21 },
              end: { line: 1, column: 6, index: 23 },
            },
          },
        },
      ],
      start: 0,
      end: 23,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 23 },
      },
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
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 9, index: 30 },
          },
          init: {
            type: NodeType.VariableDeclaration,
            kind: 'let',
            declarations: [
              {
                type: NodeType.VariableDeclarator,
                id: {
                  start: 9,
                  end: 10,
                  type: NodeType.Identifier,
                  name: 'i',
                  loc: {
                    start: { line: 1, column: 2, index: 9 },
                    end: { line: 1, column: 3, index: 10 },
                  },
                },
                init: {
                  start: 13,
                  end: 14,
                  type: NodeType.Literal,
                  value: '0',
                  loc: {
                    start: { line: 1, column: 4, index: 13 },
                    end: { line: 1, column: 5, index: 14 },
                  },
                  raw: '0',
                },
                start: 9,
                end: 14,
                loc: {
                  start: { line: 1, column: 2, index: 9 },
                  end: { line: 1, column: 5, index: 14 },
                },
              },
            ],
            start: 5,
            end: 14,
            loc: {
              start: { line: 1, column: 1, index: 5 },
              end: { line: 1, column: 5, index: 14 },
            },
          },
          test: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.BinaryExpression,
              operator: '<',
              left: {
                start: 15,
                end: 16,
                type: NodeType.Identifier,
                name: 'i',
                loc: {
                  start: { line: 1, column: 4, index: 15 },
                  end: { line: 1, column: 5, index: 16 },
                },
              },
              right: {
                start: 19,
                end: 21,
                type: NodeType.Literal,
                value: '10',
                loc: {
                  start: { line: 1, column: 6, index: 19 },
                  end: { line: 1, column: 8, index: 21 },
                },
                raw: '10',
              },
              loc: {
                start: { line: 1, column: 5, index: 17 },
                end: { line: 1, column: 8, index: 21 },
              },
              start: 17,
              end: 21,
            },
            start: 17,
            end: 21,
            loc: {
              start: { line: 1, column: 5, index: 17 },
              end: { line: 1, column: 8, index: 21 },
            },
          },
          update: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.UpdateExpression,
              operator: '++',
              argument: {
                start: 22,
                end: 23,
                type: NodeType.Identifier,
                name: 'i',
                loc: {
                  start: { line: 1, column: 6, index: 22 },
                  end: { line: 1, column: 7, index: 23 },
                },
              },
              prefix: false,
              loc: {
                start: { line: 1, column: 6, index: 22 },
                end: { line: 1, column: 9, index: 26 },
              },
              start: 22,
              end: 26,
            },
            start: 22,
            end: 26,
            loc: {
              start: { line: 1, column: 6, index: 22 },
              end: { line: 1, column: 9, index: 26 },
            },
          },
          body: {
            type: NodeType.BlockStatement,
            start: 28,
            end: 30,
            body: [],
            loc: {
              start: { line: 1, column: 8, index: 28 },
              end: { line: 1, column: 9, index: 30 },
            },
          },
        },
      ],
      start: 0,
      end: 30,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 9, index: 30 },
      },
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
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 25 },
          },
          right: {
            start: 18,
            end: 21,
            type: NodeType.Identifier,
            name: 'obj',
            loc: {
              start: { line: 1, column: 4, index: 18 },
              end: { line: 1, column: 7, index: 21 },
            },
          },
          left: {
            type: NodeType.VariableDeclaration,
            kind: 'const',
            declarations: [
              {
                type: NodeType.VariableDeclarator,
                id: {
                  start: 11,
                  end: 14,
                  type: NodeType.Identifier,
                  name: 'key',
                  loc: {
                    start: { line: 1, column: 2, index: 11 },
                    end: { line: 1, column: 5, index: 14 },
                  },
                },
                init: null,
                start: 11,
                end: 14,
                loc: {
                  start: { line: 1, column: 2, index: 11 },
                  end: { line: 1, column: 5, index: 14 },
                },
              },
            ],
            start: 5,
            end: 14,
            loc: {
              start: { line: 1, column: 1, index: 5 },
              end: { line: 1, column: 5, index: 14 },
            },
          },
          body: {
            type: NodeType.BlockStatement,
            start: 23,
            end: 25,
            body: [],
            loc: {
              start: { line: 1, column: 5, index: 23 },
              end: { line: 1, column: 6, index: 25 },
            },
          },
        },
      ],
      start: 0,
      end: 25,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 25 },
      },
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
              start: 0,
              end: 5,
              type: NodeType.Identifier,
              name: 'while',
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 5, index: 5 },
              },
            },
            start: 0,
            end: 16,
            arguments: [
              {
                start: 7,
                end: 11,
                type: NodeType.Identifier,
                name: 'true',
                loc: {
                  start: { line: 1, column: 1, index: 7 },
                  end: { line: 1, column: 5, index: 11 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { column: 10, index: 10, line: 1 },
            },
          },
          start: 0,
          end: 16,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { column: 10, index: 10, line: 1 },
          },
        },
        {
          type: NodeType.BlockStatement,
          start: 13,
          end: 15,
          body: [],
          loc: {
            start: { line: 1, column: 2, index: 13 },
            end: { line: 1, column: 3, index: 15 },
          },
        },
      ],
      start: 0,
      end: 15,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 3, index: 15 },
      },
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
            start: 0,
            end: 2,
            type: NodeType.Identifier,
            name: 'do',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 2, index: 2 },
            },
          },
          start: 0,
          end: 2,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 2, index: 2 },
          },
        },
        {
          type: NodeType.BlockStatement,
          start: 3,
          end: 5,
          body: [],
          loc: {
            start: { line: 1, column: 1, index: 3 },
            end: { line: 1, column: 2, index: 5 },
          },
        },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.CallExpression,
            callee: {
              start: 6,
              end: 11,
              type: NodeType.Identifier,
              name: 'while',
              loc: {
                start: { line: 1, column: 2, index: 6 },
                end: { line: 1, column: 7, index: 11 },
              },
            },
            start: 6,
            end: 28,
            arguments: [
              {
                start: 13,
                end: 17,
                type: NodeType.Identifier,
                name: 'true',
                loc: {
                  start: { line: 1, column: 3, index: 13 },
                  end: { line: 1, column: 7, index: 17 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 2, index: 6 },
              end: { column: 14, index: 18, line: 1 },
            },
          },
          start: 6,
          end: 28,
          loc: {
            start: { line: 1, column: 2, index: 6 },
            end: { column: 14, index: 18, line: 1 },
          },
        },
      ],
      start: 0,
      end: 28,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 14, index: 18, line: 1 },
      },
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
          loc: {
            start: { line: 1, column: 3, index: 34 },
            end: { line: 1, column: 4, index: 35 },
          },
          end: 35,
          start: 0,
          discriminant: {
            start: 8,
            end: 9,
            type: NodeType.Identifier,
            name: 'v',
            loc: {
              start: { line: 1, column: 1, index: 8 },
              end: { line: 1, column: 2, index: 9 },
            },
          },
          cases: [
            {
              type: NodeType.SwitchCase,
              start: 11,
              end: 24,
              loc: {
                start: { line: 1, column: 1, index: 11 },
                end: { line: 1, column: 5, index: 15 },
              },
              test: {
                start: 16,
                end: 17,
                type: NodeType.Literal,
                value: '1',
                loc: {
                  start: { line: 1, column: 2, index: 16 },
                  end: { line: 1, column: 3, index: 17 },
                },
                raw: '1',
              },
              consequent: [
                {
                  type: NodeType.ExpressionStatement,
                  expression: {
                    start: 19,
                    end: 24,
                    type: NodeType.Identifier,
                    name: 'break',
                    loc: {
                      start: { line: 1, column: 3, index: 19 },
                      end: { line: 1, column: 8, index: 24 },
                    },
                  },
                  start: 19,
                  end: 24,
                  loc: {
                    start: { line: 1, column: 3, index: 19 },
                    end: { line: 1, column: 8, index: 24 },
                  },
                },
              ],
            },
            {
              type: NodeType.SwitchCase,
              start: 25,
              end: 33,
              loc: {
                start: { line: 1, column: 3, index: 25 },
                end: { line: 1, column: 10, index: 32 },
              },
              test: null,
              consequent: [],
            },
          ],
        },
      ],
      start: 0,
      end: 35,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 4, index: 35 },
      },
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
          start: 0,
          end: 20,
          label: {
            start: 0,
            end: 5,
            type: NodeType.Identifier,
            name: 'label',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 5, index: 5 },
            },
          },
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { column: 6, index: 20, line: 1 },
          },
          body: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.CallExpression,
              callee: {
                type: NodeType.MemberExpression,
                object: {
                  start: 7,
                  end: 14,
                  type: NodeType.Identifier,
                  name: 'console',
                  loc: {
                    start: { line: 1, column: 1, index: 7 },
                    end: { line: 1, column: 8, index: 14 },
                  },
                },
                property: {
                  start: 15,
                  end: 18,
                  type: NodeType.Identifier,
                  name: 'log',
                  loc: {
                    start: { line: 1, column: 1, index: 15 },
                    end: { line: 1, column: 4, index: 18 },
                  },
                },
                loc: {
                  start: { line: 1, column: 1, index: 7 },
                  end: { line: 1, column: 4, index: 18 },
                },
                start: 7,
                end: 18,
                computed: false,
              },
              start: 7,
              end: 20,
              arguments: [],
              loc: {
                start: { line: 1, column: 1, index: 7 },
                end: { column: 6, index: 20, line: 1 },
              },
            },
            start: 7,
            end: 20,
            loc: {
              start: { line: 1, column: 1, index: 7 },
              end: { column: 6, index: 20, line: 1 },
            },
          },
        },
      ],
      start: 0,
      end: 20,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 6, index: 20, line: 1 },
      },
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
              start: 0,
              end: 4,
              type: NodeType.Identifier,
              name: 'with',
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 4, index: 4 },
              },
            },
            start: 0,
            end: 11,
            arguments: [
              {
                start: 6,
                end: 7,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { column: 6, index: 6, line: 1 },
            },
          },
          start: 0,
          end: 11,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { column: 6, index: 6, line: 1 },
          },
        },
        {
          type: NodeType.BlockStatement,
          start: 8,
          end: 10,
          body: [],
          loc: {
            start: { line: 1, column: 1, index: 8 },
            end: { line: 1, column: 2, index: 10 },
          },
        },
      ],
      start: 0,
      end: 10,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 2, index: 10 },
      },
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
            start: 0,
            end: 5,
            type: NodeType.Identifier,
            name: 'break',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 5, index: 5 },
            },
          },
          start: 0,
          end: 5,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 5, index: 5 },
          },
        },
      ],
      start: 0,
      end: 5,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 5, index: 5 },
      },
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
            start: 0,
            end: 8,
            type: NodeType.Identifier,
            name: 'continue',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 8, index: 8 },
            },
          },
          start: 0,
          end: 8,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 8 },
          },
        },
      ],
      start: 0,
      end: 8,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 8, index: 8 },
      },
    }
    const code = 'continue'
    expect(generate(result)).toEqual(code)
  })
  it('return', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ReturnStatement,
          argument: null,
          start: 0,
          end: 6,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 6 },
          },
        },
      ],
      start: 0,
      end: 6,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 6 },
      },
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
            start: 0,
            end: 8,
            type: NodeType.Identifier,
            name: 'debugger',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 8, index: 8 },
            },
          },
          start: 0,
          end: 8,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 8 },
          },
        },
      ],
      start: 0,
      end: 8,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 8, index: 8 },
      },
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
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 5, index: 12 },
          },
          test: {
            start: 4,
            end: 5,
            type: NodeType.Identifier,
            name: 'a',
            loc: {
              start: { line: 1, column: 1, index: 4 },
              end: { line: 1, column: 2, index: 5 },
            },
          },
          consequent: {
            type: NodeType.ExpressionStatement,
            expression: {
              type: NodeType.AssignmentExpression,
              operator: '=',
              left: {
                start: 7,
                end: 8,
                type: NodeType.Identifier,
                name: 'b',
                loc: {
                  start: { line: 1, column: 2, index: 7 },
                  end: { line: 1, column: 3, index: 8 },
                },
              },
              right: {
                start: 11,
                end: 12,
                type: NodeType.Literal,
                value: '1',
                loc: {
                  start: { line: 1, column: 4, index: 11 },
                  end: { line: 1, column: 5, index: 12 },
                },
                raw: '1',
              },
              loc: {
                start: { line: 1, column: 3, index: 9 },
                end: { line: 1, column: 5, index: 12 },
              },
              start: 9,
              end: 12,
            },
            start: 9,
            end: 12,
            loc: {
              start: { line: 1, column: 3, index: 9 },
              end: { line: 1, column: 5, index: 12 },
            },
          },
          alternate: null,
        },
      ],
      start: 0,
      end: 12,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 5, index: 12 },
      },
    }
    const code = 'if (a) b = 1'
    expect(parse(code)).toEqual(result)
  })
  it('if BlockStatement', () => {
    const code = 'if (a) {b=1}'
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.IfStatement,
          start: 0,
          end: 12,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 3, index: 12 },
          },
          test: {
            start: 4,
            end: 5,
            type: NodeType.Identifier,
            name: 'a',
            loc: {
              start: { line: 1, column: 1, index: 4 },
              end: { line: 1, column: 2, index: 5 },
            },
          },
          consequent: {
            type: NodeType.BlockStatement,
            start: 7,
            end: 12,
            body: [
              {
                type: NodeType.ExpressionStatement,
                expression: {
                  type: NodeType.AssignmentExpression,
                  operator: '=',
                  left: {
                    start: 8,
                    end: 9,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 2, index: 8 },
                      end: { line: 1, column: 3, index: 9 },
                    },
                  },
                  right: {
                    start: 10,
                    end: 11,
                    type: NodeType.Literal,
                    value: '1',
                    loc: {
                      start: { line: 1, column: 2, index: 10 },
                      end: { line: 1, column: 3, index: 11 },
                    },
                    raw: '1',
                  },
                  loc: {
                    start: { line: 1, column: 2, index: 9 },
                    end: { line: 1, column: 3, index: 11 },
                  },
                  start: 9,
                  end: 11,
                },
                start: 9,
                end: 11,
                loc: {
                  start: { line: 1, column: 2, index: 9 },
                  end: { line: 1, column: 3, index: 11 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 2, index: 7 },
              end: { line: 1, column: 3, index: 12 },
            },
          },
          alternate: null,
        },
      ],
      start: 0,
      end: 12,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 3, index: 12 },
      },
    }
    expect(generate(result)).toEqual(code)
  })
  it('member expression computed', () => {
    const code = 'a[b()][12]'
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
                start: 0,
                end: 1,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 0, index: 0 },
                  end: { line: 1, column: 1, index: 1 },
                },
              },
              property: {
                type: NodeType.CallExpression,
                callee: {
                  start: 2,
                  end: 3,
                  type: NodeType.Identifier,
                  name: 'b',
                  loc: {
                    start: { line: 1, column: 0, index: 2 },
                    end: { line: 1, column: 1, index: 3 },
                  },
                },
                start: 2,
                end: 5,
                arguments: [],
                loc: {
                  start: { line: 1, column: 0, index: 2 },
                  end: { column: 3, index: 5, line: 1 },
                },
              },
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 1, index: 6 },
              },
              start: 0,
              end: 6,
              computed: true,
            },
            property: {
              start: 7,
              end: 9,
              type: NodeType.Literal,
              value: '12',
              loc: {
                start: { line: 1, column: 0, index: 7 },
                end: { line: 1, column: 2, index: 9 },
              },
              raw: '12',
            },
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 1, index: 10 },
            },
            start: 0,
            end: 10,
            computed: true,
          },
          start: 0,
          end: 10,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 1, index: 10 },
          },
        },
      ],
      start: 0,
      end: 10,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 1, index: 10 },
      },
    }
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
                  {
                    start: 7,
                    end: 8,
                    type: NodeType.Identifier,
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 1, index: 7 },
                      end: { line: 1, column: 2, index: 8 },
                    },
                  },
                  {
                    start: 9,
                    end: 10,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 1, index: 9 },
                      end: { line: 1, column: 2, index: 10 },
                    },
                  },
                ],
                start: 6,
                end: 11,
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 11 },
                },
              },
              init: {
                start: 14,
                end: 15,
                type: NodeType.Identifier,
                name: 'c',
                loc: {
                  start: { line: 1, column: 3, index: 14 },
                  end: { line: 1, column: 4, index: 15 },
                },
              },
              start: 6,
              end: 15,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 4, index: 15 },
              },
            },
          ],
          start: 0,
          end: 15,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 4, index: 15 },
          },
        },
      ],
      start: 0,
      end: 15,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 4, index: 15 },
      },
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
                    loc: {
                      start: { line: 1, column: 1, index: 7 },
                      end: { line: 1, column: 2, index: 8 },
                    },
                    type: NodeType.Property,
                    kind: 'init',
                    key: {
                      start: 7,
                      end: 8,
                      type: NodeType.Identifier,
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 1, index: 7 },
                        end: { line: 1, column: 2, index: 8 },
                      },
                    },
                    value: {
                      start: 7,
                      end: 8,
                      type: NodeType.Identifier,
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 1, index: 7 },
                        end: { line: 1, column: 2, index: 8 },
                      },
                    },
                  },
                  {
                    start: 9,
                    end: 10,
                    loc: {
                      start: { line: 1, column: 1, index: 9 },
                      end: { line: 1, column: 2, index: 10 },
                    },
                    type: NodeType.Property,
                    kind: 'init',
                    key: {
                      start: 9,
                      end: 10,
                      type: NodeType.Identifier,
                      name: 'b',
                      loc: {
                        start: { line: 1, column: 1, index: 9 },
                        end: { line: 1, column: 2, index: 10 },
                      },
                    },
                    value: {
                      start: 9,
                      end: 10,
                      type: NodeType.Identifier,
                      name: 'b',
                      loc: {
                        start: { line: 1, column: 1, index: 9 },
                        end: { line: 1, column: 2, index: 10 },
                      },
                    },
                  },
                ],
                start: 6,
                end: 11,
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 11 },
                },
              },
              init: {
                start: 14,
                end: 15,
                type: NodeType.Identifier,
                name: 'c',
                loc: {
                  start: { line: 1, column: 3, index: 14 },
                  end: { line: 1, column: 4, index: 15 },
                },
              },
              start: 6,
              end: 15,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 4, index: 15 },
              },
            },
          ],
          start: 0,
          end: 15,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 4, index: 15 },
          },
        },
      ],
      start: 0,
      end: 15,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 4, index: 15 },
      },
    }
    const code = 'const {a,b} = c;'
    expect(generate(result)).toEqual(code)
  })
})
