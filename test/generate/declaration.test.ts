import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/NodeType'
import type { Program } from '@/ast/NodeType'

describe('declaration', () => {
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
          async: false,
          generator: false,
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
    const result = 'function foo(a,b)  { return a.add(b)  };'
    expect(generate(ast)).to.be.equal(result)
  })
  it('async function', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.FunctionDeclaration,
          id: { type: NodeType.Identifier, name: 'foo', start: 15, end: 18 },
          async: true,
          generator: false,
          params: [
            { type: NodeType.Identifier, name: 'a', start: 19, end: 20 },
            { type: NodeType.Identifier, name: 'b', start: 22, end: 23 },
          ],
          body: {
            type: NodeType.BlockStatement,
            body: [
              {
                type: NodeType.ReturnStatement,
                argument: {
                  type: NodeType.CallExpression,
                  callee: {
                    type: NodeType.MemberExpression,
                    object: {
                      type: NodeType.Identifier,
                      name: 'a',
                      start: 34,
                      end: 35,
                    },
                    property: {
                      type: NodeType.Identifier,
                      name: 'add',
                      start: 36,
                      end: 39,
                    },
                    start: 34,
                    end: 39,
                    computed: false,
                  },
                  arguments: [
                    {
                      type: NodeType.Identifier,
                      name: 'b',
                      start: 40,
                      end: 41,
                    },
                  ],
                  start: 34,
                  end: 42,
                },
                start: 27,
                end: 42,
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
    const result = 'async function foo(a,b)  { return a.add(b)  };'
    expect(generate(ast)).to.be.equal(result)
  })
  it('generator function', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.FunctionDeclaration,
          id: { type: NodeType.Identifier, name: 'foo', start: 10, end: 13 },
          async: false,
          generator: true,
          params: [
            { type: NodeType.Identifier, name: 'a', start: 14, end: 15 },
            { type: NodeType.Identifier, name: 'b', start: 17, end: 18 },
          ],
          body: {
            type: NodeType.BlockStatement,
            body: [
              {
                type: NodeType.ReturnStatement,
                argument: {
                  type: NodeType.CallExpression,
                  callee: {
                    type: NodeType.MemberExpression,
                    object: {
                      type: NodeType.Identifier,
                      name: 'a',
                      start: 29,
                      end: 30,
                    },
                    property: {
                      type: NodeType.Identifier,
                      name: 'add',
                      start: 31,
                      end: 34,
                    },
                    start: 29,
                    end: 34,
                    computed: false,
                  },
                  arguments: [
                    {
                      type: NodeType.Identifier,
                      name: 'b',
                      start: 35,
                      end: 36,
                    },
                  ],
                  start: 29,
                  end: 37,
                },
                start: 22,
                end: 37,
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
    const result = 'function *foo(a,b)  { return a.add(b)  };'
    expect(generate(ast)).to.be.equal(result)
  })
  it('arrow function', () => {
    const result = 'const a = (a,b) => {};'
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
    expect(generate(ast)).toEqual(result)
  })
  it('arrow async function no params', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'app', start: 6, end: 9 },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [],
                async: true,
                generator: false,
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 23,
                  end: 25,
                },
                start: 12,
                end: 25,
              },
              start: 6,
              end: 25,
            },
          ],
          start: 0,
          end: 25,
        },
      ],
      start: 0,
      end: 25,
    }
    const result = 'const app = async() => {};'
    expect(generate(ast)).toEqual(result)
  })

  it('arrow function no params', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'const',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: { type: NodeType.Identifier, name: 'app', start: 6, end: 9 },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [],
                async: false,
                generator: false,
                body: {
                  type: NodeType.BlockStatement,
                  body: [],
                  start: 18,
                  end: 20,
                },
                start: 12,
                end: 20,
              },
              start: 6,
              end: 20,
            },
          ],
          start: 0,
          end: 20,
        },
      ],
      start: 0,
      end: 20,
    }
    const result = 'const app = () => {};'
    expect(generate(ast)).toEqual(result)
  })

  it('arrow async function', () => {
    const result = 'const a = async(a,b) => {};'
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
    expect(generate(ast)).toEqual(result)
  })
  it('variable function', () => {
    const input = 'const a = function async(a,b) {};'
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
    expect(generate(ast)).toEqual(input)
  })
  it('variable async function', () => {
    const input = 'const a = async function async(a,b) {};'
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
    expect(generate(ast)).toEqual(input)
  })
  it('variable generator function', () => {
    const input = 'const a = function *name(a,b) {};'
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
    expect(generate(ast)).toEqual(input)
  })
  it('import namespace specifier declaration', () => {
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
  it('import declaration', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ImportDeclaration,
          specifiers: [],
          start: 1,
          end: 27,
          source: {
            type: NodeType.Literal,
            value: 'common/reset.scss',
            start: 8,
            end: 27,
            raw: "'common/reset.scss'",
          },
        },
      ],
      start: 0,
      end: 27,
    }
    const result = ` import 'common/reset.scss';`
    expect(generate(ast)).to.be.equal(result)
  })
})
