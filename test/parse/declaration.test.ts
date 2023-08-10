import { describe, expect, it } from 'vitest'
import type { MemberExpression, Program } from '@/ast/NodeType'
import { NodeType } from '@/ast/NodeType'
import { parse } from '@/parser'

describe('Parser', () => {
  it('variable declaration', () => {
    const input = 'let a = 1;'
    const ast = {
      type: NodeType.Program,
      start: 0,
      end: 9,
      body: [
        {
          type: NodeType.VariableDeclaration,
          start: 0,
          end: 9,
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: {
                type: NodeType.Identifier,
                name: 'a',
                start: 4,
                end: 5,
              },
              start: 4,
              end: 9,
              init: {
                type: NodeType.Literal,
                value: '1',
                raw: '1',
                start: 8,
                end: 9,
              },
            },
          ],
          kind: 'let',
        },
      ],
    }
    expect(parse(input)).toEqual(ast)
  })
  it('member expression', () => {
    const input = 'foo.bar'
    const memberExpression: MemberExpression = {
      type: NodeType.MemberExpression,
      object: {
        type: NodeType.Identifier,
        name: 'foo',
        start: 0,
        end: 3,
      },
      start: 0,
      end: 7,
      property: {
        type: NodeType.Identifier,
        name: 'bar',
        start: 4,
        end: 7,
      },
      computed: false,
    }
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 7,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: memberExpression,
          start: 0,
          end: 7,
        },
      ],
    }
    expect(parse(input)).toEqual(ast)
  })

  it('nested member expression', () => {
    const input = 'foo.bar.zoo'
    const memberExpression: MemberExpression = {
      type: NodeType.MemberExpression,
      object: {
        type: NodeType.MemberExpression,
        object: {
          start: 0,
          end: 3,
          type: NodeType.Identifier,
          name: 'foo',
        },
        property: {
          start: 4,
          end: 7,
          type: NodeType.Identifier,
          name: 'bar',
        },
        start: 0,
        end: 7,
        computed: false,
      },
      property: {
        start: 8,
        end: 11,
        type: NodeType.Identifier,
        name: 'zoo',
      },
      start: 0,
      end: 11,
      computed: false,
    }
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: memberExpression,
          start: 0,
          end: 11,
        },
      ],
      start: 0,
      end: 11,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('function', () => {
    const input = 'function foo(a, b) { return a.add(b); }'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: { type: 'Identifier', name: 'foo', start: 9, end: 12 },
          async: false,
          generator: false,
          params: [
            { type: 'Identifier', name: 'a', start: 13, end: 14 },
            { type: 'Identifier', name: 'b', start: 16, end: 17 },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a',
                      start: 28,
                      end: 29,
                    },
                    property: {
                      type: 'Identifier',
                      name: 'add',
                      start: 30,
                      end: 33,
                    },
                    start: 28,
                    end: 33,
                    computed: false,
                  },
                  arguments: [
                    { type: 'Identifier', name: 'b', start: 34, end: 35 },
                  ],
                  start: 28,
                  end: 68,
                },
                start: 21,
                end: 68,
              },
            ],
            start: 19,
            end: 39,
          },
          start: 0,
          end: 39,
        },
      ],
      start: 0,
      end: 39,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('async function', () => {
    const input = 'async function foo(a, b) { return a.add(b); }'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: { type: 'Identifier', name: 'foo', start: 15, end: 18 },
          async: true,
          generator: false,
          params: [
            { type: 'Identifier', name: 'a', start: 19, end: 20 },
            { type: 'Identifier', name: 'b', start: 22, end: 23 },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a',
                      start: 34,
                      end: 35,
                    },
                    property: {
                      type: 'Identifier',
                      name: 'add',
                      start: 36,
                      end: 39,
                    },
                    start: 34,
                    end: 39,
                    computed: false,
                  },
                  arguments: [
                    { type: 'Identifier', name: 'b', start: 40, end: 41 },
                  ],
                  start: 34,
                  end: 80,
                },
                start: 27,
                end: 80,
              },
            ],
            start: 25,
            end: 45,
          },
          start: 0,
          end: 45,
        },
      ],
      start: 0,
      end: 45,
    }
    expect(parse(input)).toEqual(ast)
  })
  it('generator function', () => {
    const input = 'function *foo(a, b) { return a.add(b); }'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: { type: 'Identifier', name: 'foo', start: 10, end: 13 },
          async: false,
          generator: true,
          params: [
            { type: 'Identifier', name: 'a', start: 14, end: 15 },
            { type: 'Identifier', name: 'b', start: 17, end: 18 },
          ],
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a',
                      start: 29,
                      end: 30,
                    },
                    property: {
                      type: 'Identifier',
                      name: 'add',
                      start: 31,
                      end: 34,
                    },
                    start: 29,
                    end: 34,
                    computed: false,
                  },
                  arguments: [
                    { type: 'Identifier', name: 'b', start: 35, end: 36 },
                  ],
                  start: 29,
                  end: 70,
                },
                start: 22,
                end: 70,
              },
            ],
            start: 20,
            end: 40,
          },
          start: 0,
          end: 40,
        },
      ],
      start: 0,
      end: 40,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('arrow function', () => {
    const input = 'const a = (a,b) => {}'
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'a', start: 6, end: 7 },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [
                  { type: NodeType.Identifier, name: 'a', start: 11, end: 12 },
                  { type: NodeType.Identifier, name: 'b', start: 13, end: 14 },
                ],
                async: false,
                generator: false,
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 19,
                  end: 21,
                },
                start: 10,
                end: 21,
              },
              start: 6,
              end: 21,
            },
          ],
          start: 0,
          end: 21,
        },
      ],
      start: 0,
      end: 21,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('arrow async function', () => {
    const input = 'const a = async(a,b) => {}'
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'a', start: 6, end: 7 },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [
                  { type: NodeType.Identifier, name: 'a', start: 16, end: 17 },
                  { type: NodeType.Identifier, name: 'b', start: 18, end: 19 },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 24,
                  end: 26,
                },
                async: true,
                generator: false,
                start: 10,
                end: 26,
              },
              start: 6,
              end: 26,
            },
          ],
          start: 0,
          end: 26,
        },
      ],
      start: 0,
      end: 26,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('variable function', () => {
    const input = 'const a = function async(a,b) {}'
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'a', start: 6, end: 7 },
              init: {
                type: NodeType.FunctionExpression,
                id: {
                  type: NodeType.Identifier,
                  name: 'async',
                  start: 19,
                  end: 24,
                },
                params: [
                  { type: NodeType.Identifier, name: 'a', start: 25, end: 26 },
                  { type: NodeType.Identifier, name: 'b', start: 27, end: 28 },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 30,
                  end: 32,
                },
                async: false,
                generator: false,
                start: 10,
                end: 32,
              },
              start: 6,
              end: 32,
            },
          ],
          start: 0,
          end: 32,
        },
      ],
      start: 0,
      end: 32,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('variable async function', () => {
    const input = 'const a = async function async(a,b) {}'
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'a', start: 6, end: 7 },
              init: {
                type: NodeType.FunctionExpression,
                id: {
                  type: NodeType.Identifier,
                  name: 'async',
                  start: 25,
                  end: 30,
                },
                params: [
                  { type: NodeType.Identifier, name: 'a', start: 31, end: 32 },
                  { type: NodeType.Identifier, name: 'b', start: 33, end: 34 },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 36,
                  end: 38,
                },
                async: true,
                generator: false,
                start: 10,
                end: 38,
              },
              start: 6,
              end: 38,
            },
          ],
          start: 0,
          end: 38,
        },
      ],
      start: 0,
      end: 38,
    }
    expect(parse(input)).toEqual(ast)
  })
  it('variable generator function', () => {
    const input = 'const a = function *name(a,b) {}'
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'a', start: 6, end: 7 },
              init: {
                type: NodeType.FunctionExpression,
                id: {
                  type: NodeType.Identifier,
                  name: 'name',
                  start: 20,
                  end: 24,
                },
                params: [
                  { type: NodeType.Identifier, name: 'a', start: 25, end: 26 },
                  { type: NodeType.Identifier, name: 'b', start: 27, end: 28 },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 30,
                  end: 32,
                },
                async: false,
                generator: true,
                start: 10,
                end: 32,
              },
              start: 6,
              end: 32,
            },
          ],
          start: 0,
          end: 32,
        },
      ],
      start: 0,
      end: 32,
    }
    expect(parse(input)).toEqual(ast)
  })

  it('import declaration', () => {
    const input = `import foo, { name1, name2 as bar } from 'foo';
      import * as mod from 'mod';`
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 80,
      body: [
        {
          type: NodeType.ImportDeclaration,
          start: 0,
          end: 46,
          specifiers: [
            {
              type: NodeType.ImportDefaultSpecifier,
              start: 7,
              end: 10,
              local: {
                type: NodeType.Identifier,
                name: 'foo',
                start: 7,
                end: 10,
              },
            },
            {
              type: NodeType.ImportSpecifier,
              start: 14,
              end: 19,
              imported: {
                type: NodeType.Identifier,
                name: 'name1',
                start: 14,
                end: 19,
              },
              local: {
                type: NodeType.Identifier,
                name: 'name1',
                start: 14,
                end: 19,
              },
            },
            {
              type: NodeType.ImportSpecifier,
              start: 21,
              end: 33,
              imported: {
                type: NodeType.Identifier,
                name: 'name2',
                start: 21,
                end: 26,
              },
              local: {
                type: NodeType.Identifier,
                name: 'bar',
                start: 30,
                end: 33,
              },
            },
          ],
          source: {
            type: NodeType.Literal,
            start: 41,
            end: 46,
            value: 'foo',
            raw: "'foo'",
          },
        },
        {
          type: NodeType.ImportDeclaration,
          start: 54,
          end: 80,
          specifiers: [
            {
              type: NodeType.ImportNamespaceSpecifier,
              start: 61,
              end: 69,
              local: {
                type: NodeType.Identifier,
                name: 'mod',
                start: 66,
                end: 69,
              },
            },
          ],
          source: {
            type: NodeType.Literal,
            start: 75,
            end: 80,
            value: 'mod',
            raw: "'mod'",
          },
        },
      ],
    }
    expect(parse(input)).toEqual(ast)
  })

  it('export ExportNamedDeclaration', () => {
    const input = "export { foo, bar as ccc } from 'foo';"
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 37,
      body: [
        {
          type: NodeType.ExportNamedDeclaration,
          start: 0,
          end: 37,
          declaration: null,
          specifiers: [
            {
              type: NodeType.ExportSpecifier,
              start: 9,
              end: 12,
              local: {
                type: NodeType.Identifier,
                name: 'foo',
                start: 9,
                end: 12,
              },
              exported: {
                type: NodeType.Identifier,
                name: 'foo',
                start: 9,
                end: 12,
              },
            },
            {
              type: NodeType.ExportSpecifier,
              start: 14,
              end: 24,
              local: {
                type: NodeType.Identifier,
                name: 'bar',
                start: 14,
                end: 17,
              },
              exported: {
                type: NodeType.Identifier,
                name: 'ccc',
                start: 21,
                end: 24,
              },
            },
          ],
          source: {
            type: NodeType.Literal,
            start: 32,
            end: 37,
            value: 'foo',
            raw: "'foo'",
          },
        },
      ],
    }
    expect(parse(input)).toEqual(ast)
  })
  it('export ExportAllDeclaration', () => {
    const input = "export * from 'foo';"
    const ast = {
      type: NodeType.Program,
      start: 0,
      end: 19,
      body: [
        {
          type: NodeType.ExportAllDeclaration,
          start: 0,
          end: 19,
          source: {
            type: NodeType.Literal,
            start: 14,
            end: 19,
            value: 'foo',
            raw: "'foo'",
          },
          exported: null,
        },
      ],
    }
    expect(parse(input)).toEqual(ast)
  })
  it('export ExportDefaultDeclaration', () => {
    const input = 'export default function() {}'
    const ast = {
      type: NodeType.Program,
      start: 0,
      end: 28,
      body: [
        {
          type: NodeType.ExportDefaultDeclaration,
          start: 0,
          end: 28,
          declaration: {
            type: NodeType.FunctionDeclaration,
            start: 15,
            end: 28,
            id: null,
            async: false,
            generator: false,
            params: [],
            body: {
              type: NodeType.BlockStatement,
              start: 26,
              end: 28,
              body: [],
            },
          },
        },
      ],
    }
    expect(parse(input)).toEqual(ast)
  })
  it('Conditional assignment', () => {
    const input = `
    let basename = '';
    if (baseTag) basename = baseTag.getAttribute('href');`
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: { type: 'Identifier', name: 'basename', start: 9, end: 17 },
              init: {
                type: 'Literal',
                value: '',
                start: 20,
                end: 22,
                raw: "''",
              },
              start: 9,
              end: 22,
            },
          ],
          start: 5,
          end: 22,
        },
        {
          type: 'IfStatement',
          start: 28,
          end: 151,
          test: { type: 'Identifier', name: 'baseTag', start: 32, end: 39 },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'basename',
                start: 41,
                end: 49,
              },
              right: {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'baseTag',
                    start: 52,
                    end: 59,
                  },
                  property: {
                    type: 'Identifier',
                    name: 'getAttribute',
                    start: 60,
                    end: 72,
                  },
                  start: 52,
                  end: 72,
                  computed: false,
                },
                arguments: [
                  {
                    type: 'Literal',
                    value: 'href',
                    start: 73,
                    end: 79,
                    raw: "'href'",
                  },
                ],
                start: 52,
                end: 151,
              },
              start: 50,
              end: 151,
            },
            start: 50,
            end: 151,
          },
          alternate: null,
        },
      ],
      start: 0,
      end: 151,
    }
    expect(parse(input)).toEqual(ast)
  })
})
