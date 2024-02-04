import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/NodeType'
import type { Program } from '@/ast/NodeType'

describe('declaration', () => {
  it('variable declaration', async () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.VariableDeclaration,
          kind: 'let',
          declarations: [
            {
              type: NodeType.VariableDeclarator,
              id: {
                start: 4,
                end: 5,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 4 },
                  end: { line: 1, column: 2, index: 5 },
                },
              },
              init: {
                start: 8,
                end: 9,
                type: NodeType.Literal,
                value: '1',
                loc: {
                  start: { line: 1, column: 3, index: 8 },
                  end: { line: 1, column: 4, index: 9 },
                },
                raw: '1',
              },
              start: 4,
              end: 9,
              loc: {
                start: { line: 1, column: 1, index: 4 },
                end: { line: 1, column: 4, index: 9 },
              },
            },
          ],
          start: 0,
          end: 9,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 4, index: 9 },
          },
        },
      ],
      start: 0,
      end: 9,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 4, index: 9 },
      },
    }
    const result = 'let a = 1;'
    expect(generate(ast)).to.be.equal(result)
  })
  it('function', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.FunctionDeclaration,
          id: {
            start: 9,
            end: 12,
            type: NodeType.Identifier,
            name: 'foo',
            loc: {
              start: { line: 1, column: 1, index: 9 },
              end: { line: 1, column: 4, index: 12 },
            },
          },
          async: false,
          generator: false,
          params: [
            {
              start: 13,
              end: 14,
              type: NodeType.Identifier,
              name: 'a',
              loc: {
                start: { line: 1, column: 1, index: 13 },
                end: { line: 1, column: 2, index: 14 },
              },
            },
            {
              start: 15,
              end: 16,
              type: NodeType.Identifier,
              name: 'b',
              loc: {
                start: { line: 1, column: 1, index: 15 },
                end: { line: 1, column: 2, index: 16 },
              },
            },
          ],
          body: {
            type: NodeType.BlockStatement,
            start: 19,
            end: 39,
            body: [
              {
                type: NodeType.ReturnStatement,
                argument: {
                  type: NodeType.CallExpression,
                  callee: {
                    type: NodeType.MemberExpression,
                    object: {
                      start: 28,
                      end: 29,
                      type: NodeType.Identifier,
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 5, index: 28 },
                        end: { line: 1, column: 6, index: 29 },
                      },
                    },
                    property: {
                      start: 30,
                      end: 33,
                      type: NodeType.Identifier,
                      name: 'add',
                      loc: {
                        start: { line: 1, column: 5, index: 30 },
                        end: { line: 1, column: 8, index: 33 },
                      },
                    },
                    loc: {
                      start: { line: 1, column: 5, index: 28 },
                      end: { line: 1, column: 8, index: 33 },
                    },
                    start: 28,
                    end: 33,
                    computed: false,
                  },
                  start: 28,
                  end: 68,
                  arguments: [
                    {
                      start: 34,
                      end: 35,
                      type: NodeType.Identifier,
                      name: 'b',
                      loc: {
                        start: { line: 1, column: 5, index: 34 },
                        end: { line: 1, column: 6, index: 35 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 1, column: 5, index: 28 },
                    end: { column: 14, index: 39, line: 1 },
                  },
                },
                start: 21,
                end: 68,
                loc: {
                  start: { line: 1, column: 4, index: 21 },
                  end: { column: 14, index: 39, line: 1 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 3, index: 19 },
              end: { line: 1, column: 8, index: 39 },
            },
          },
          start: 0,
          end: 39,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 39 },
          },
        },
      ],
      start: 0,
      end: 39,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 8, index: 39 },
      },
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
          id: {
            start: 15,
            end: 18,
            type: NodeType.Identifier,
            name: 'foo',
            loc: {
              start: { line: 1, column: 2, index: 15 },
              end: { line: 1, column: 5, index: 18 },
            },
          },
          async: true,
          generator: false,
          params: [
            {
              start: 19,
              end: 20,
              type: NodeType.Identifier,
              name: 'a',
              loc: {
                start: { line: 1, column: 2, index: 19 },
                end: { line: 1, column: 3, index: 20 },
              },
            },
            {
              start: 21,
              end: 22,
              type: NodeType.Identifier,
              name: 'b',
              loc: {
                start: { line: 1, column: 2, index: 21 },
                end: { line: 1, column: 3, index: 22 },
              },
            },
          ],
          body: {
            type: NodeType.BlockStatement,
            start: 25,
            end: 45,
            body: [
              {
                type: NodeType.ReturnStatement,
                argument: {
                  type: NodeType.CallExpression,
                  callee: {
                    type: NodeType.MemberExpression,
                    object: {
                      start: 34,
                      end: 35,
                      type: NodeType.Identifier,
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 6, index: 34 },
                        end: { line: 1, column: 7, index: 35 },
                      },
                    },
                    property: {
                      start: 36,
                      end: 39,
                      type: NodeType.Identifier,
                      name: 'add',
                      loc: {
                        start: { line: 1, column: 6, index: 36 },
                        end: { line: 1, column: 9, index: 39 },
                      },
                    },
                    loc: {
                      start: { line: 1, column: 6, index: 34 },
                      end: { line: 1, column: 9, index: 39 },
                    },
                    start: 34,
                    end: 39,
                    computed: false,
                  },
                  start: 34,
                  end: 80,
                  arguments: [
                    {
                      start: 40,
                      end: 41,
                      type: NodeType.Identifier,
                      name: 'b',
                      loc: {
                        start: { line: 1, column: 6, index: 40 },
                        end: { line: 1, column: 7, index: 41 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 1, column: 6, index: 34 },
                    end: { column: 16, index: 46, line: 1 },
                  },
                },
                start: 27,
                end: 80,
                loc: {
                  start: { line: 1, column: 5, index: 27 },
                  end: { column: 16, index: 46, line: 1 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 4, index: 25 },
              end: { line: 1, column: 9, index: 45 },
            },
          },
          start: 0,
          end: 45,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 9, index: 45 },
          },
        },
      ],
      start: 0,
      end: 45,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 9, index: 45 },
      },
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
          id: {
            start: 10,
            end: 13,
            type: NodeType.Identifier,
            name: 'foo',
            loc: {
              start: { line: 1, column: 1, index: 10 },
              end: { line: 1, column: 4, index: 13 },
            },
          },
          async: false,
          generator: true,
          params: [
            {
              start: 14,
              end: 15,
              type: NodeType.Identifier,
              name: 'a',
              loc: {
                start: { line: 1, column: 1, index: 14 },
                end: { line: 1, column: 2, index: 15 },
              },
            },
            {
              start: 16,
              end: 17,
              type: NodeType.Identifier,
              name: 'b',
              loc: {
                start: { line: 1, column: 1, index: 16 },
                end: { line: 1, column: 2, index: 17 },
              },
            },
          ],
          body: {
            type: NodeType.BlockStatement,
            start: 20,
            end: 40,
            body: [
              {
                type: NodeType.ReturnStatement,
                argument: {
                  type: NodeType.CallExpression,
                  callee: {
                    type: NodeType.MemberExpression,
                    object: {
                      start: 29,
                      end: 30,
                      type: NodeType.Identifier,
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 5, index: 29 },
                        end: { line: 1, column: 6, index: 30 },
                      },
                    },
                    property: {
                      start: 31,
                      end: 34,
                      type: NodeType.Identifier,
                      name: 'add',
                      loc: {
                        start: { line: 1, column: 5, index: 31 },
                        end: { line: 1, column: 8, index: 34 },
                      },
                    },
                    loc: {
                      start: { line: 1, column: 5, index: 29 },
                      end: { line: 1, column: 8, index: 34 },
                    },
                    start: 29,
                    end: 34,
                    computed: false,
                  },
                  start: 29,
                  end: 70,
                  arguments: [
                    {
                      start: 35,
                      end: 36,
                      type: NodeType.Identifier,
                      name: 'b',
                      loc: {
                        start: { line: 1, column: 5, index: 35 },
                        end: { line: 1, column: 6, index: 36 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 1, column: 5, index: 29 },
                    end: { column: 14, index: 40, line: 1 },
                  },
                },
                start: 22,
                end: 70,
                loc: {
                  start: { line: 1, column: 4, index: 22 },
                  end: { column: 14, index: 40, line: 1 },
                },
              },
            ],
            loc: {
              start: { line: 1, column: 3, index: 20 },
              end: { line: 1, column: 8, index: 40 },
            },
          },
          start: 0,
          end: 40,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 40 },
          },
        },
      ],
      start: 0,
      end: 40,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 8, index: 40 },
      },
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
              id: {
                start: 6,
                end: 7,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [
                  {
                    start: 11,
                    end: 12,
                    type: NodeType.Identifier,
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 3, index: 11 },
                      end: { line: 1, column: 4, index: 12 },
                    },
                  },
                  {
                    start: 13,
                    end: 14,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 3, index: 13 },
                      end: { line: 1, column: 4, index: 14 },
                    },
                  },
                ],
                async: false,
                generator: false,
                body: {
                  type: NodeType.BlockStatement,
                  start: 19,
                  end: 21,
                  body: [],
                  loc: {
                    start: { line: 1, column: 5, index: 19 },
                    end: { line: 1, column: 6, index: 21 },
                  },
                },
                start: 10,
                end: 21,
                loc: {
                  start: { line: 1, column: 3, index: 10 },
                  end: { line: 1, column: 6, index: 21 },
                },
              },
              start: 6,
              end: 21,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 21 },
              },
            },
          ],
          start: 0,
          end: 22,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 22 },
          },
        },
      ],
      start: 0,
      end: 22,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 22 },
      },
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
              id: {
                start: 6,
                end: 9,
                type: NodeType.Identifier,
                name: 'app',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 4, index: 9 },
                },
              },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [],
                async: true,
                generator: false,
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
                start: 12,
                end: 25,
                loc: {
                  start: { line: 1, column: 3, index: 12 },
                  end: { line: 1, column: 6, index: 25 },
                },
              },
              start: 6,
              end: 25,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 25 },
              },
            },
          ],
          start: 0,
          end: 26,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 26 },
          },
        },
      ],
      start: 0,
      end: 26,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 26 },
      },
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
              id: {
                start: 6,
                end: 9,
                type: NodeType.Identifier,
                name: 'app',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 4, index: 9 },
                },
              },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [],
                async: false,
                generator: false,
                body: {
                  type: NodeType.BlockStatement,
                  start: 18,
                  end: 20,
                  body: [],
                  loc: {
                    start: { line: 1, column: 5, index: 18 },
                    end: { line: 1, column: 6, index: 20 },
                  },
                },
                start: 12,
                end: 20,
                loc: {
                  start: { line: 1, column: 3, index: 12 },
                  end: { line: 1, column: 6, index: 20 },
                },
              },
              start: 6,
              end: 20,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 20 },
              },
            },
          ],
          start: 0,
          end: 21,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 21 },
          },
        },
      ],
      start: 0,
      end: 21,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 21 },
      },
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
              id: {
                start: 6,
                end: 7,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: NodeType.ArrowFunctionExpression,
                id: null,
                params: [
                  {
                    start: 16,
                    end: 17,
                    type: NodeType.Identifier,
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 3, index: 16 },
                      end: { line: 1, column: 4, index: 17 },
                    },
                  },
                  {
                    start: 18,
                    end: 19,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 3, index: 18 },
                      end: { line: 1, column: 4, index: 19 },
                    },
                  },
                ],
                async: true,
                generator: false,
                body: {
                  type: NodeType.BlockStatement,
                  start: 24,
                  end: 26,
                  body: [],
                  loc: {
                    start: { line: 1, column: 5, index: 24 },
                    end: { line: 1, column: 6, index: 26 },
                  },
                },
                start: 10,
                end: 26,
                loc: {
                  start: { line: 1, column: 3, index: 10 },
                  end: { line: 1, column: 6, index: 26 },
                },
              },
              start: 6,
              end: 26,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 26 },
              },
            },
          ],
          start: 0,
          end: 27,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 27 },
          },
        },
      ],
      start: 0,
      end: 27,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 27 },
      },
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
              id: {
                start: 6,
                end: 7,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: NodeType.FunctionExpression,
                id: {
                  start: 19,
                  end: 24,
                  type: NodeType.Identifier,
                  name: 'async',
                  loc: {
                    start: { line: 1, column: 4, index: 19 },
                    end: { line: 1, column: 9, index: 24 },
                  },
                },
                params: [
                  {
                    start: 25,
                    end: 26,
                    type: NodeType.Identifier,
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 4, index: 25 },
                      end: { line: 1, column: 5, index: 26 },
                    },
                  },
                  {
                    start: 27,
                    end: 28,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 4, index: 27 },
                      end: { line: 1, column: 5, index: 28 },
                    },
                  },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  start: 30,
                  end: 32,
                  body: [],
                  loc: {
                    start: { line: 1, column: 5, index: 30 },
                    end: { line: 1, column: 6, index: 32 },
                  },
                },
                async: false,
                generator: false,
                start: 10,
                end: 32,
                loc: {
                  start: { line: 1, column: 3, index: 10 },
                  end: { line: 1, column: 6, index: 32 },
                },
              },
              start: 6,
              end: 32,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 32 },
              },
            },
          ],
          start: 0,
          end: 33,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 33 },
          },
        },
      ],
      start: 0,
      end: 33,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 33 },
      },
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
              id: {
                start: 6,
                end: 7,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: NodeType.FunctionExpression,
                id: {
                  start: 25,
                  end: 30,
                  type: NodeType.Identifier,
                  name: 'async',
                  loc: {
                    start: { line: 1, column: 5, index: 25 },
                    end: { line: 1, column: 10, index: 30 },
                  },
                },
                params: [
                  {
                    start: 31,
                    end: 32,
                    type: NodeType.Identifier,
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 5, index: 31 },
                      end: { line: 1, column: 6, index: 32 },
                    },
                  },
                  {
                    start: 33,
                    end: 34,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 5, index: 33 },
                      end: { line: 1, column: 6, index: 34 },
                    },
                  },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  start: 36,
                  end: 38,
                  body: [],
                  loc: {
                    start: { line: 1, column: 6, index: 36 },
                    end: { line: 1, column: 7, index: 38 },
                  },
                },
                async: true,
                generator: false,
                start: 10,
                end: 38,
                loc: {
                  start: { line: 1, column: 3, index: 10 },
                  end: { line: 1, column: 7, index: 38 },
                },
              },
              start: 6,
              end: 38,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 7, index: 38 },
              },
            },
          ],
          start: 0,
          end: 39,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 7, index: 39 },
          },
        },
      ],
      start: 0,
      end: 39,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 7, index: 39 },
      },
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
              id: {
                start: 6,
                end: 7,
                type: NodeType.Identifier,
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: NodeType.FunctionExpression,
                id: {
                  start: 20,
                  end: 24,
                  type: NodeType.Identifier,
                  name: 'name',
                  loc: {
                    start: { line: 1, column: 4, index: 20 },
                    end: { line: 1, column: 8, index: 24 },
                  },
                },
                params: [
                  {
                    start: 25,
                    end: 26,
                    type: NodeType.Identifier,
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 4, index: 25 },
                      end: { line: 1, column: 5, index: 26 },
                    },
                  },
                  {
                    start: 27,
                    end: 28,
                    type: NodeType.Identifier,
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 4, index: 27 },
                      end: { line: 1, column: 5, index: 28 },
                    },
                  },
                ],
                body: {
                  type: NodeType.BlockStatement,
                  start: 30,
                  end: 32,
                  body: [],
                  loc: {
                    start: { line: 1, column: 5, index: 30 },
                    end: { line: 1, column: 6, index: 32 },
                  },
                },
                async: false,
                generator: true,
                start: 10,
                end: 32,
                loc: {
                  start: { line: 1, column: 3, index: 10 },
                  end: { line: 1, column: 6, index: 32 },
                },
              },
              start: 6,
              end: 32,
              loc: {
                start: { line: 1, column: 1, index: 6 },
                end: { line: 1, column: 6, index: 32 },
              },
            },
          ],
          start: 0,
          end: 33,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 33 },
          },
        },
      ],
      start: 0,
      end: 33,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 33 },
      },
    }
    expect(generate(ast)).toEqual(input)
  })
})
