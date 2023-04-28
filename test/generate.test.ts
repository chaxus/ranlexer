import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/parser'
import type { MemberExpression, Program } from '@/parser/nodeTypes'

describe('generate', () => {
  it('variable declaration', async () => {
    const ast: Program = {
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
    const result = 'let a = 1;'
    expect(generate(ast)).to.be.equal(result)
  })
  it('member expression', () => {
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
    const result = 'foo.bar'
    expect(generate(ast)).to.be.equal(result)
  })
  it('nested member expression', () => {
    const result = 'foo.bar.zoo'
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
    expect(generate(ast)).to.be.equal(result)
  })
  it('function', () => {
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 39,
      body: [
        {
          start: 0,
          end: 39,
          type: NodeType.FunctionDeclaration,
          id: {
            start: 9,
            end: 12,
            type: NodeType.Identifier,
            name: 'foo',
          },
          params: [
            {
              start: 13,
              end: 14,
              type: NodeType.Identifier,
              name: 'a',
            },
            {
              start: 16,
              end: 17,
              type: NodeType.Identifier,
              name: 'b',
            },
          ],
          body: {
            type: NodeType.BlockStatement,
            start: 19,
            end: 39,
            body: [
              {
                type: NodeType.ReturnStatement,
                start: 21,
                end: 36,
                argument: {
                  type: NodeType.CallExpression,
                  start: 28,
                  end: 36,
                  callee: {
                    type: NodeType.MemberExpression,
                    object: {
                      type: NodeType.Identifier,
                      name: 'a',
                      start: 28,
                      end: 29,
                    },
                    property: {
                      type: NodeType.Identifier,
                      name: 'add',
                      start: 30,
                      end: 33,
                    },
                    start: 28,
                    end: 33,
                    computed: false,
                  },
                  arguments: [
                    {
                      type: NodeType.Identifier,
                      name: 'b',
                      start: 34,
                      end: 35,
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    }
    const result = 'function foo(a,b) {  return a.add(b)  }'
    expect(generate(ast)).to.be.equal(result)
  })
  it('import declaration', () => {
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
    const result =
      "import foo, { name1, name2 as bar } from 'foo';       import * as mod from 'mod'; "
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportNamedDeclaration declaration', () => {
    const result = "export { foo, ccc as bar } from 'foo';"
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
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportAllDeclaration declaration', () => {
    const result = "export * from 'foo';"
    const ast:Program = {
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
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportDefaultDeclaration declaration', () => {
    const result = 'export default function() {}'
    const ast:Program = {
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
    expect(generate(ast)).to.be.equal(result)
  })
})
