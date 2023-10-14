import { describe, expect, it } from 'vitest'
import type { MemberExpression, Program } from '@/ast/NodeType'
import { NodeType } from '@/ast/NodeType'
import { parse } from '@/parser'

describe('Parser', () => {
  it('variable declaration', () => {
    const input = 'let a = 1;'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 0, column: 1, index: 4 },
                  end: { line: 0, column: 2, index: 5 },
                },
              },
              init: {
                type: 'Literal',
                value: '1',
                loc: {
                  start: { line: 0, column: 3, index: 8 },
                  end: { line: 0, column: 4, index: 9 },
                },
                raw: '1',
              },
              loc: {
                start: { line: 0, column: 1, index: 4 },
                end: { line: 0, column: 4, index: 9 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 4, index: 9 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 4, index: 9 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
  it('member expression', () => {
    const input = 'foo.bar'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'foo',
              loc: {
                start: { line: 0, column: 0, index: 0 },
                end: { line: 0, column: 3, index: 3 },
              },
            },
            property: {
              type: 'Identifier',
              name: 'bar',
              loc: {
                start: { line: 0, column: 0, index: 4 },
                end: { line: 0, column: 3, index: 7 },
              },
            },
            loc: {
              start: { line: 0, column: 0, index: 0 },
              end: { line: 0, column: 3, index: 7 },
            },
            computed: false,
          },
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 3, index: 7 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 3, index: 7 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('nested member expression', () => {
    const input = 'foo.bar.zoo'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 0, column: 0, index: 0 },
                  end: { line: 0, column: 3, index: 3 },
                },
              },
              property: {
                type: 'Identifier',
                name: 'bar',
                loc: {
                  start: { line: 0, column: 0, index: 4 },
                  end: { line: 0, column: 3, index: 7 },
                },
              },
              loc: {
                start: { line: 0, column: 0, index: 0 },
                end: { line: 0, column: 3, index: 7 },
              },
              computed: false,
            },
            property: {
              type: 'Identifier',
              name: 'zoo',
              loc: {
                start: { line: 0, column: 0, index: 8 },
                end: { line: 0, column: 3, index: 11 },
              },
            },
            loc: {
              start: { line: 0, column: 0, index: 0 },
              end: { line: 0, column: 3, index: 11 },
            },
            computed: false,
          },
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 3, index: 11 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 3, index: 11 },
      },
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
          id: {
            type: 'Identifier',
            name: 'foo',
            loc: {
              start: { line: 0, column: 1, index: 9 },
              end: { line: 0, column: 4, index: 12 },
            },
          },
          async: false,
          generator: false,
          params: [
            {
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 0, column: 1, index: 13 },
                end: { line: 0, column: 2, index: 14 },
              },
            },
            {
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 0, column: 2, index: 16 },
                end: { line: 0, column: 3, index: 17 },
              },
            },
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
                      loc: {
                        start: { line: 0, column: 5, index: 28 },
                        end: { line: 0, column: 6, index: 29 },
                      },
                    },
                    property: {
                      type: 'Identifier',
                      name: 'add',
                      loc: {
                        start: { line: 0, column: 5, index: 30 },
                        end: { line: 0, column: 8, index: 33 },
                      },
                    },
                    loc: {
                      start: { line: 0, column: 5, index: 28 },
                      end: { line: 0, column: 8, index: 33 },
                    },
                    computed: false,
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'b',
                      loc: {
                        start: { line: 0, column: 5, index: 34 },
                        end: { line: 0, column: 6, index: 35 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 0, column: 5, index: 28 },
                    end: { column: 14, index: 39, line: 0 },
                  },
                },
                loc: {
                  start: { line: 0, column: 4, index: 21 },
                  end: { column: 14, index: 39, line: 0 },
                },
              },
            ],
            loc: {
              start: { line: 0, column: 3, index: 19 },
              end: { line: 0, column: 7, index: 39 },
            },
          },
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 7, index: 39 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 7, index: 39 },
      },
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
          id: {
            type: 'Identifier',
            name: 'foo',
            loc: {
              start: { line: 0, column: 2, index: 15 },
              end: { line: 0, column: 5, index: 18 },
            },
          },
          async: true,
          generator: false,
          params: [
            {
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 0, column: 2, index: 19 },
                end: { line: 0, column: 3, index: 20 },
              },
            },
            {
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 0, column: 3, index: 22 },
                end: { line: 0, column: 4, index: 23 },
              },
            },
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
                      loc: {
                        start: { line: 0, column: 6, index: 34 },
                        end: { line: 0, column: 7, index: 35 },
                      },
                    },
                    property: {
                      type: 'Identifier',
                      name: 'add',
                      loc: {
                        start: { line: 0, column: 6, index: 36 },
                        end: { line: 0, column: 9, index: 39 },
                      },
                    },
                    loc: {
                      start: { line: 0, column: 6, index: 34 },
                      end: { line: 0, column: 9, index: 39 },
                    },
                    computed: false,
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'b',
                      loc: {
                        start: { line: 0, column: 6, index: 40 },
                        end: { line: 0, column: 7, index: 41 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 0, column: 6, index: 34 },
                    end: { column: 16, index: 46, line: 0 },
                  },
                },
                loc: {
                  start: { line: 0, column: 5, index: 27 },
                  end: { column: 16, index: 46, line: 0 },
                },
              },
            ],
            loc: {
              start: { line: 0, column: 4, index: 25 },
              end: { line: 0, column: 8, index: 45 },
            },
          },
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 8, index: 45 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 8, index: 45 },
      },
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
          id: {
            type: 'Identifier',
            name: 'foo',
            loc: {
              start: { line: 0, column: 1, index: 10 },
              end: { line: 0, column: 4, index: 13 },
            },
          },
          async: false,
          generator: true,
          params: [
            {
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 0, column: 1, index: 14 },
                end: { line: 0, column: 2, index: 15 },
              },
            },
            {
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 0, column: 2, index: 17 },
                end: { line: 0, column: 3, index: 18 },
              },
            },
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
                      loc: {
                        start: { line: 0, column: 5, index: 29 },
                        end: { line: 0, column: 6, index: 30 },
                      },
                    },
                    property: {
                      type: 'Identifier',
                      name: 'add',
                      loc: {
                        start: { line: 0, column: 5, index: 31 },
                        end: { line: 0, column: 8, index: 34 },
                      },
                    },
                    loc: {
                      start: { line: 0, column: 5, index: 29 },
                      end: { line: 0, column: 8, index: 34 },
                    },
                    computed: false,
                  },
                  arguments: [
                    {
                      type: 'Identifier',
                      name: 'b',
                      loc: {
                        start: { line: 0, column: 5, index: 35 },
                        end: { line: 0, column: 6, index: 36 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 0, column: 5, index: 29 },
                    end: { column: 14, index: 40, line: 0 },
                  },
                },
                loc: {
                  start: { line: 0, column: 4, index: 22 },
                  end: { column: 14, index: 40, line: 0 },
                },
              },
            ],
            loc: {
              start: { line: 0, column: 3, index: 20 },
              end: { line: 0, column: 7, index: 40 },
            },
          },
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 7, index: 40 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 7, index: 40 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('arrow function', () => {
    const input = 'const a = (a,b) => {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 2, index: 7 },
                },
              },
              init: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [
                  {
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 0, column: 3, index: 11 },
                      end: { line: 0, column: 4, index: 12 },
                    },
                  },
                  {
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 0, column: 3, index: 13 },
                      end: { line: 0, column: 4, index: 14 },
                    },
                  },
                ],
                async: false,
                generator: false,
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 5, index: 19 },
                    end: { line: 0, column: 6, index: 21 },
                  },
                },
                loc: {
                  start: { line: 0, column: 3, index: 10 },
                  end: { line: 0, column: 6, index: 21 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 6, index: 21 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 6, index: 21 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 6, index: 21 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('arrow function no params', () => {
    const input = 'const app = () => {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'app',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 4, index: 9 },
                },
              },
              init: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [],
                async: false,
                generator: false,
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 5, index: 18 },
                    end: { line: 0, column: 6, index: 20 },
                  },
                },
                loc: {
                  start: { line: 0, column: 3, index: 12 },
                  end: { line: 0, column: 6, index: 20 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 6, index: 20 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 6, index: 20 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 6, index: 20 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
  it('arrow async function no params', () => {
    const input = 'const app = async() => {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'app',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 4, index: 9 },
                },
              },
              init: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [],
                async: true,
                generator: false,
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 5, index: 23 },
                    end: { line: 0, column: 6, index: 25 },
                  },
                },
                loc: {
                  start: { line: 0, column: 3, index: 12 },
                  end: { line: 0, column: 6, index: 25 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 6, index: 25 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 6, index: 25 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 6, index: 25 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('arrow async function', () => {
    const input = 'const a = async(a,b) => {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 2, index: 7 },
                },
              },
              init: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [
                  {
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 0, column: 3, index: 16 },
                      end: { line: 0, column: 4, index: 17 },
                    },
                  },
                  {
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 0, column: 3, index: 18 },
                      end: { line: 0, column: 4, index: 19 },
                    },
                  },
                ],
                async: true,
                generator: false,
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 5, index: 24 },
                    end: { line: 0, column: 6, index: 26 },
                  },
                },
                loc: {
                  start: { line: 0, column: 3, index: 10 },
                  end: { line: 0, column: 6, index: 26 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 6, index: 26 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 6, index: 26 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 6, index: 26 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('variable function', () => {
    const input = 'const a = function async(a,b) {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 2, index: 7 },
                },
              },
              init: {
                type: 'FunctionExpression',
                id: {
                  type: 'Identifier',
                  name: 'async',
                  loc: {
                    start: { line: 0, column: 4, index: 19 },
                    end: { line: 0, column: 9, index: 24 },
                  },
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 0, column: 4, index: 25 },
                      end: { line: 0, column: 5, index: 26 },
                    },
                  },
                  {
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 0, column: 4, index: 27 },
                      end: { line: 0, column: 5, index: 28 },
                    },
                  },
                ],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 5, index: 30 },
                    end: { line: 0, column: 6, index: 32 },
                  },
                },
                async: false,
                generator: false,
                loc: {
                  start: { line: 0, column: 3, index: 10 },
                  end: { line: 0, column: 6, index: 32 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 6, index: 32 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 6, index: 32 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 6, index: 32 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('variable async function', () => {
    const input = 'const a = async function async(a,b) {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 2, index: 7 },
                },
              },
              init: {
                type: 'FunctionExpression',
                id: {
                  type: 'Identifier',
                  name: 'async',
                  loc: {
                    start: { line: 0, column: 5, index: 25 },
                    end: { line: 0, column: 10, index: 30 },
                  },
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 0, column: 5, index: 31 },
                      end: { line: 0, column: 6, index: 32 },
                    },
                  },
                  {
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 0, column: 5, index: 33 },
                      end: { line: 0, column: 6, index: 34 },
                    },
                  },
                ],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 6, index: 36 },
                    end: { line: 0, column: 7, index: 38 },
                  },
                },
                async: true,
                generator: false,
                loc: {
                  start: { line: 0, column: 3, index: 10 },
                  end: { line: 0, column: 7, index: 38 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 7, index: 38 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 7, index: 38 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 7, index: 38 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
  it('variable generator function', () => {
    const input = 'const a = function *name(a,b) {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 0, column: 1, index: 6 },
                  end: { line: 0, column: 2, index: 7 },
                },
              },
              init: {
                type: 'FunctionExpression',
                id: {
                  type: 'Identifier',
                  name: 'name',
                  loc: {
                    start: { line: 0, column: 4, index: 20 },
                    end: { line: 0, column: 8, index: 24 },
                  },
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 0, column: 4, index: 25 },
                      end: { line: 0, column: 5, index: 26 },
                    },
                  },
                  {
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 0, column: 4, index: 27 },
                      end: { line: 0, column: 5, index: 28 },
                    },
                  },
                ],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  loc: {
                    start: { line: 0, column: 5, index: 30 },
                    end: { line: 0, column: 6, index: 32 },
                  },
                },
                async: false,
                generator: true,
                loc: {
                  start: { line: 0, column: 3, index: 10 },
                  end: { line: 0, column: 6, index: 32 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 6 },
                end: { line: 0, column: 6, index: 32 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 6, index: 32 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 6, index: 32 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('import declaration', () => {
    const input = `import foo, { name1, name2 as bar } from 'foo';
      import * as mod from 'mod';`
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 0, column: 1, index: 7 },
                  end: { line: 0, column: 4, index: 10 },
                },
              },
              loc: {
                start: { line: 0, column: 1, index: 7 },
                end: { line: 0, column: 4, index: 10 },
              },
            },
            {
              type: 'ImportSpecifier',
              imported: {
                type: 'Identifier',
                name: 'name1',
                loc: {
                  start: { line: 0, column: 3, index: 14 },
                  end: { line: 0, column: 8, index: 19 },
                },
              },
              local: {
                type: 'Identifier',
                name: 'name1',
                loc: {
                  start: { line: 0, column: 3, index: 14 },
                  end: { line: 0, column: 8, index: 19 },
                },
              },
              loc: {
                start: { line: 0, column: 3, index: 14 },
                end: { line: 0, column: 8, index: 19 },
              },
            },
            {
              type: 'ImportSpecifier',
              imported: {
                type: 'Identifier',
                name: 'name2',
                loc: {
                  start: { line: 0, column: 4, index: 21 },
                  end: { line: 0, column: 9, index: 26 },
                },
              },
              local: {
                type: 'Identifier',
                name: 'bar',
                loc: {
                  start: { line: 0, column: 6, index: 30 },
                  end: { line: 0, column: 9, index: 33 },
                },
              },
              loc: {
                start: { line: 0, column: 4, index: 21 },
                end: { line: 0, column: 9, index: 33 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 14, index: 46 },
          },
          source: {
            type: 'Literal',
            value: 'foo',
            loc: {
              start: { line: 0, column: 9, index: 41 },
              end: { line: 0, column: 14, index: 46 },
            },
            raw: "'foo'",
          },
        },
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'mod',
                loc: {
                  start: { line: 1, column: 3, index: 60 },
                  end: { line: 1, column: 6, index: 63 },
                },
              },
              loc: {
                start: { line: 1, column: 1, index: 55 },
                end: { line: 1, column: 6, index: 63 },
              },
            },
          ],
          loc: {
            start: { line: 1, column: 0, index: 48 },
            end: { line: 1, column: 10, index: 74 },
          },
          source: {
            type: 'Literal',
            value: 'mod',
            loc: {
              start: { line: 1, column: 5, index: 69 },
              end: { line: 1, column: 10, index: 74 },
            },
            raw: "'mod'",
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 10, index: 74 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('export ExportNamedDeclaration', () => {
    const input = "export { foo, bar as ccc } from 'foo';"
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ExportNamedDeclaration',
          specifiers: [
            {
              type: 'ExportSpecifier',
              local: {
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 0, column: 2, index: 9 },
                  end: { line: 0, column: 5, index: 12 },
                },
              },
              exported: {
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 0, column: 2, index: 9 },
                  end: { line: 0, column: 5, index: 12 },
                },
              },
              loc: {
                start: { line: 0, column: 2, index: 9 },
                end: { line: 0, column: 5, index: 12 },
              },
            },
            {
              type: 'ExportSpecifier',
              local: {
                type: 'Identifier',
                name: 'bar',
                loc: {
                  start: { line: 0, column: 3, index: 14 },
                  end: { line: 0, column: 6, index: 17 },
                },
              },
              exported: {
                type: 'Identifier',
                name: 'ccc',
                loc: {
                  start: { line: 0, column: 5, index: 21 },
                  end: { line: 0, column: 8, index: 24 },
                },
              },
              loc: {
                start: { line: 0, column: 3, index: 14 },
                end: { line: 0, column: 8, index: 24 },
              },
            },
          ],
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 13, index: 37 },
          },
          declaration: null,
          source: {
            type: 'Literal',
            value: 'foo',
            loc: {
              start: { line: 0, column: 8, index: 32 },
              end: { line: 0, column: 13, index: 37 },
            },
            raw: "'foo'",
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 13, index: 37 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
  it('export ExportAllDeclaration', () => {
    const input = "export * from 'foo';"
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ExportAllDeclaration',
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 8, index: 19 },
          },
          source: {
            type: 'Literal',
            value: 'foo',
            loc: {
              start: { line: 0, column: 3, index: 14 },
              end: { line: 0, column: 8, index: 19 },
            },
            raw: "'foo'",
          },
          exported: null,
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 8, index: 19 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
  it('export ExportDefaultDeclaration', () => {
    const input = 'export default function() {}'
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ExportDefaultDeclaration',
          declaration: {
            type: 'FunctionDeclaration',
            id: null,
            async: false,
            generator: false,
            params: [],
            body: {
              type: 'BlockStatement',
              body: [],
              loc: {
                start: { line: 0, column: 3, index: 26 },
                end: { line: 0, column: 4, index: 28 },
              },
            },
            loc: {
              start: { line: 0, column: 2, index: 15 },
              end: { line: 0, column: 4, index: 28 },
            },
          },
          loc: {
            start: { line: 0, column: 0, index: 0 },
            end: { line: 0, column: 4, index: 28 },
          },
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 0, column: 4, index: 28 },
      },
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
              id: {
                type: 'Identifier',
                name: 'basename',
                loc: {
                  start: { line: 1, column: 1, index: 5 },
                  end: { line: 1, column: 9, index: 13 },
                },
              },
              init: {
                type: 'Literal',
                value: '',
                loc: {
                  start: { line: 1, column: 3, index: 16 },
                  end: { line: 1, column: 5, index: 18 },
                },
                raw: "''",
              },
              loc: {
                start: { line: 1, column: 1, index: 5 },
                end: { line: 1, column: 5, index: 18 },
              },
            },
          ],
          loc: {
            start: { line: 1, column: 0, index: 1 },
            end: { line: 1, column: 5, index: 18 },
          },
        },
        {
          type: 'IfStatement',
          loc: {
            start: { line: 2, column: 0, index: 20 },
            end: { column: 26, index: 74, line: 2 },
          },
          test: {
            type: 'Identifier',
            name: 'baseTag',
            loc: {
              start: { line: 2, column: 1, index: 24 },
              end: { line: 2, column: 8, index: 31 },
            },
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: 'basename',
                loc: {
                  start: { line: 2, column: 2, index: 33 },
                  end: { line: 2, column: 10, index: 41 },
                },
              },
              right: {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'baseTag',
                    loc: {
                      start: { line: 2, column: 4, index: 44 },
                      end: { line: 2, column: 11, index: 51 },
                    },
                  },
                  property: {
                    type: 'Identifier',
                    name: 'getAttribute',
                    loc: {
                      start: { line: 2, column: 4, index: 52 },
                      end: { line: 2, column: 16, index: 64 },
                    },
                  },
                  loc: {
                    start: { line: 2, column: 4, index: 44 },
                    end: { line: 2, column: 16, index: 64 },
                  },
                  computed: false,
                },
                arguments: [
                  {
                    type: 'Literal',
                    value: 'href',
                    loc: {
                      start: { line: 2, column: 4, index: 65 },
                      end: { line: 2, column: 10, index: 71 },
                    },
                    raw: "'href'",
                  },
                ],
                loc: {
                  start: { line: 2, column: 4, index: 44 },
                  end: { column: 26, index: 74, line: 2 },
                },
              },
              loc: {
                start: { line: 2, column: 3, index: 42 },
                end: { column: 26, index: 74, line: 2 },
              },
            },
            loc: {
              start: { line: 2, column: 3, index: 42 },
              end: { column: 26, index: 74, line: 2 },
            },
          },
          alternate: null,
        },
      ],
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 26, index: 74, line: 2 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
})
