import { describe, expect, it } from 'vitest'
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
                start: 4,
                end: 5,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 4 },
                  end: { line: 1, column: 2, index: 5 },
                },
              },
              init: {
                start: 8,
                end: 9,
                type: 'Literal',
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
              start: 0,
              end: 3,
              type: 'Identifier',
              name: 'foo',
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 3, index: 3 },
              },
            },
            property: {
              start: 4,
              end: 7,
              type: 'Identifier',
              name: 'bar',
              loc: {
                start: { line: 1, column: 0, index: 4 },
                end: { line: 1, column: 3, index: 7 },
              },
            },
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 3, index: 7 },
            },
            start: 0,
            end: 7,
            computed: false,
          },
          start: 0,
          end: 7,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 3, index: 7 },
          },
        },
      ],
      start: 0,
      end: 7,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 3, index: 7 },
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
                start: 0,
                end: 3,
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 1, column: 0, index: 0 },
                  end: { line: 1, column: 3, index: 3 },
                },
              },
              property: {
                start: 4,
                end: 7,
                type: 'Identifier',
                name: 'bar',
                loc: {
                  start: { line: 1, column: 0, index: 4 },
                  end: { line: 1, column: 3, index: 7 },
                },
              },
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 3, index: 7 },
              },
              start: 0,
              end: 7,
              computed: false,
            },
            property: {
              start: 8,
              end: 11,
              type: 'Identifier',
              name: 'zoo',
              loc: {
                start: { line: 1, column: 0, index: 8 },
                end: { line: 1, column: 3, index: 11 },
              },
            },
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 3, index: 11 },
            },
            start: 0,
            end: 11,
            computed: false,
          },
          start: 0,
          end: 11,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 3, index: 11 },
          },
        },
      ],
      start: 0,
      end: 11,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 3, index: 11 },
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
            start: 9,
            end: 12,
            type: 'Identifier',
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
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 1, index: 13 },
                end: { line: 1, column: 2, index: 14 },
              },
            },
            {
              start: 16,
              end: 17,
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 1, column: 2, index: 16 },
                end: { line: 1, column: 3, index: 17 },
              },
            },
          ],
          body: {
            type: 'BlockStatement',
            start: 19,
            end: 39,
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      start: 28,
                      end: 29,
                      type: 'Identifier',
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 5, index: 28 },
                        end: { line: 1, column: 6, index: 29 },
                      },
                    },
                    property: {
                      start: 30,
                      end: 33,
                      type: 'Identifier',
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
                      type: 'Identifier',
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
              end: { line: 1, column: 7, index: 39 },
            },
          },
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
            start: 15,
            end: 18,
            type: 'Identifier',
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
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 2, index: 19 },
                end: { line: 1, column: 3, index: 20 },
              },
            },
            {
              start: 22,
              end: 23,
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 1, column: 3, index: 22 },
                end: { line: 1, column: 4, index: 23 },
              },
            },
          ],
          body: {
            type: 'BlockStatement',
            start: 25,
            end: 45,
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      start: 34,
                      end: 35,
                      type: 'Identifier',
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 6, index: 34 },
                        end: { line: 1, column: 7, index: 35 },
                      },
                    },
                    property: {
                      start: 36,
                      end: 39,
                      type: 'Identifier',
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
                      type: 'Identifier',
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
              end: { line: 1, column: 8, index: 45 },
            },
          },
          start: 0,
          end: 45,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 45 },
          },
        },
      ],
      start: 0,
      end: 45,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 8, index: 45 },
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
            start: 10,
            end: 13,
            type: 'Identifier',
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
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 1, index: 14 },
                end: { line: 1, column: 2, index: 15 },
              },
            },
            {
              start: 17,
              end: 18,
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 1, column: 2, index: 17 },
                end: { line: 1, column: 3, index: 18 },
              },
            },
          ],
          body: {
            type: 'BlockStatement',
            start: 20,
            end: 40,
            body: [
              {
                type: 'ReturnStatement',
                argument: {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      start: 29,
                      end: 30,
                      type: 'Identifier',
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 5, index: 29 },
                        end: { line: 1, column: 6, index: 30 },
                      },
                    },
                    property: {
                      start: 31,
                      end: 34,
                      type: 'Identifier',
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
                      type: 'Identifier',
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
              end: { line: 1, column: 7, index: 40 },
            },
          },
          start: 0,
          end: 40,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 7, index: 40 },
          },
        },
      ],
      start: 0,
      end: 40,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 7, index: 40 },
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
                start: 6,
                end: 7,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [
                  {
                    start: 11,
                    end: 12,
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 3, index: 11 },
                      end: { line: 1, column: 4, index: 12 },
                    },
                  },
                  {
                    start: 13,
                    end: 14,
                    type: 'Identifier',
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
                  type: 'BlockStatement',
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
                start: 6,
                end: 9,
                type: 'Identifier',
                name: 'app',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 4, index: 9 },
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
          end: 20,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 20 },
          },
        },
      ],
      start: 0,
      end: 20,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 20 },
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
                start: 6,
                end: 9,
                type: 'Identifier',
                name: 'app',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 4, index: 9 },
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
          end: 25,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 25 },
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
                start: 6,
                end: 7,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: 'ArrowFunctionExpression',
                id: null,
                params: [
                  {
                    start: 16,
                    end: 17,
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 3, index: 16 },
                      end: { line: 1, column: 4, index: 17 },
                    },
                  },
                  {
                    start: 18,
                    end: 19,
                    type: 'Identifier',
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
                  type: 'BlockStatement',
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
                start: 6,
                end: 7,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: 'FunctionExpression',
                id: {
                  start: 19,
                  end: 24,
                  type: 'Identifier',
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
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 4, index: 25 },
                      end: { line: 1, column: 5, index: 26 },
                    },
                  },
                  {
                    start: 27,
                    end: 28,
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 4, index: 27 },
                      end: { line: 1, column: 5, index: 28 },
                    },
                  },
                ],
                body: {
                  type: 'BlockStatement',
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
          end: 32,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 32 },
          },
        },
      ],
      start: 0,
      end: 32,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 32 },
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
                start: 6,
                end: 7,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: 'FunctionExpression',
                id: {
                  start: 25,
                  end: 30,
                  type: 'Identifier',
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
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 5, index: 31 },
                      end: { line: 1, column: 6, index: 32 },
                    },
                  },
                  {
                    start: 33,
                    end: 34,
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 5, index: 33 },
                      end: { line: 1, column: 6, index: 34 },
                    },
                  },
                ],
                body: {
                  type: 'BlockStatement',
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
          end: 38,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 7, index: 38 },
          },
        },
      ],
      start: 0,
      end: 38,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 7, index: 38 },
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
                start: 6,
                end: 7,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 1, index: 6 },
                  end: { line: 1, column: 2, index: 7 },
                },
              },
              init: {
                type: 'FunctionExpression',
                id: {
                  start: 20,
                  end: 24,
                  type: 'Identifier',
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
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 4, index: 25 },
                      end: { line: 1, column: 5, index: 26 },
                    },
                  },
                  {
                    start: 27,
                    end: 28,
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 4, index: 27 },
                      end: { line: 1, column: 5, index: 28 },
                    },
                  },
                ],
                body: {
                  type: 'BlockStatement',
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
          end: 32,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 32 },
          },
        },
      ],
      start: 0,
      end: 32,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 6, index: 32 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })

  it('import declaration', () => {
    const input = `
    import foo, { name1, name2 as bar } from 'foo';
    import * as mod from 'mod';
    `
    const ast = {
      type: 'Program',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                start: 12,
                end: 15,
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 2, column: 5, index: 12 },
                  end: { line: 2, column: 8, index: 15 },
                },
              },
              loc: {
                start: { line: 2, column: 5, index: 12 },
                end: { line: 2, column: 8, index: 15 },
              },
              start: 12,
              end: 15,
            },
            {
              type: 'ImportSpecifier',
              imported: {
                start: 19,
                end: 24,
                type: 'Identifier',
                name: 'name1',
                loc: {
                  start: { line: 2, column: 7, index: 19 },
                  end: { line: 2, column: 12, index: 24 },
                },
              },
              local: {
                start: 19,
                end: 24,
                type: 'Identifier',
                name: 'name1',
                loc: {
                  start: { line: 2, column: 7, index: 19 },
                  end: { line: 2, column: 12, index: 24 },
                },
              },
              start: 19,
              end: 24,
              loc: {
                start: { line: 2, column: 7, index: 19 },
                end: { line: 2, column: 12, index: 24 },
              },
            },
            {
              type: 'ImportSpecifier',
              imported: {
                start: 26,
                end: 31,
                type: 'Identifier',
                name: 'name2',
                loc: {
                  start: { line: 2, column: 8, index: 26 },
                  end: { line: 2, column: 13, index: 31 },
                },
              },
              local: {
                start: 35,
                end: 38,
                type: 'Identifier',
                name: 'bar',
                loc: {
                  start: { line: 2, column: 10, index: 35 },
                  end: { line: 2, column: 13, index: 38 },
                },
              },
              start: 26,
              end: 38,
              loc: {
                start: { line: 2, column: 8, index: 26 },
                end: { line: 2, column: 13, index: 38 },
              },
            },
          ],
          start: 5,
          end: 51,
          loc: {
            start: { line: 2, column: 4, index: 5 },
            end: { line: 2, column: 18, index: 51 },
          },
          source: {
            start: 46,
            end: 51,
            type: 'Literal',
            value: 'foo',
            loc: {
              start: { line: 2, column: 13, index: 46 },
              end: { line: 2, column: 18, index: 51 },
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
                start: 69,
                end: 72,
                type: 'Identifier',
                name: 'mod',
                loc: {
                  start: { line: 3, column: 7, index: 69 },
                  end: { line: 3, column: 10, index: 72 },
                },
              },
              start: 64,
              end: 72,
              loc: {
                start: { line: 3, column: 5, index: 64 },
                end: { line: 3, column: 10, index: 72 },
              },
            },
          ],
          start: 57,
          end: 83,
          loc: {
            start: { line: 3, column: 4, index: 57 },
            end: { line: 3, column: 14, index: 83 },
          },
          source: {
            start: 78,
            end: 83,
            type: 'Literal',
            value: 'mod',
            loc: {
              start: { line: 3, column: 9, index: 78 },
              end: { line: 3, column: 14, index: 83 },
            },
            raw: "'mod'",
          },
        },
      ],
      start: 0,
      end: 83,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 3, column: 14, index: 83 },
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
                start: 9,
                end: 12,
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 1, column: 2, index: 9 },
                  end: { line: 1, column: 5, index: 12 },
                },
              },
              exported: {
                start: 9,
                end: 12,
                type: 'Identifier',
                name: 'foo',
                loc: {
                  start: { line: 1, column: 2, index: 9 },
                  end: { line: 1, column: 5, index: 12 },
                },
              },
              start: 9,
              end: 12,
              loc: {
                start: { line: 1, column: 2, index: 9 },
                end: { line: 1, column: 5, index: 12 },
              },
            },
            {
              type: 'ExportSpecifier',
              local: {
                start: 14,
                end: 17,
                type: 'Identifier',
                name: 'bar',
                loc: {
                  start: { line: 1, column: 3, index: 14 },
                  end: { line: 1, column: 6, index: 17 },
                },
              },
              exported: {
                start: 21,
                end: 24,
                type: 'Identifier',
                name: 'ccc',
                loc: {
                  start: { line: 1, column: 5, index: 21 },
                  end: { line: 1, column: 8, index: 24 },
                },
              },
              start: 14,
              end: 24,
              loc: {
                start: { line: 1, column: 3, index: 14 },
                end: { line: 1, column: 8, index: 24 },
              },
            },
          ],
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 13, index: 37 },
          },
          start: 0,
          end: 37,
          declaration: null,
          source: {
            start: 32,
            end: 37,
            type: 'Literal',
            value: 'foo',
            loc: {
              start: { line: 1, column: 8, index: 32 },
              end: { line: 1, column: 13, index: 37 },
            },
            raw: "'foo'",
          },
        },
      ],
      start: 0,
      end: 37,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 13, index: 37 },
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
          start: 0,
          end: 19,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 19 },
          },
          source: {
            start: 14,
            end: 19,
            type: 'Literal',
            value: 'foo',
            loc: {
              start: { line: 1, column: 3, index: 14 },
              end: { line: 1, column: 8, index: 19 },
            },
            raw: "'foo'",
          },
          exported: null,
        },
      ],
      start: 0,
      end: 19,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 8, index: 19 },
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
              start: 26,
              end: 28,
              body: [],
              loc: {
                start: { line: 1, column: 3, index: 26 },
                end: { line: 1, column: 4, index: 28 },
              },
            },
            start: 15,
            end: 28,
            loc: {
              start: { line: 1, column: 2, index: 15 },
              end: { line: 1, column: 4, index: 28 },
            },
          },
          start: 0,
          end: 28,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 4, index: 28 },
          },
        },
      ],
      start: 0,
      end: 28,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 4, index: 28 },
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
                start: 9,
                end: 17,
                type: 'Identifier',
                name: 'basename',
                loc: {
                  start: { line: 2, column: 5, index: 9 },
                  end: { line: 2, column: 13, index: 17 },
                },
              },
              init: {
                start: 20,
                end: 22,
                type: 'Literal',
                value: '',
                loc: {
                  start: { line: 2, column: 7, index: 20 },
                  end: { line: 2, column: 9, index: 22 },
                },
                raw: "''",
              },
              start: 9,
              end: 22,
              loc: {
                start: { line: 2, column: 5, index: 9 },
                end: { line: 2, column: 9, index: 22 },
              },
            },
          ],
          start: 5,
          end: 22,
          loc: {
            start: { line: 2, column: 4, index: 5 },
            end: { line: 2, column: 9, index: 22 },
          },
        },
        {
          type: 'IfStatement',
          start: 28,
          end: 151,
          loc: {
            start: { line: 3, column: 4, index: 28 },
            end: { column: 34, index: 86, line: 3 },
          },
          test: {
            start: 32,
            end: 39,
            type: 'Identifier',
            name: 'baseTag',
            loc: {
              start: { line: 3, column: 5, index: 32 },
              end: { line: 3, column: 12, index: 39 },
            },
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                start: 41,
                end: 49,
                type: 'Identifier',
                name: 'basename',
                loc: {
                  start: { line: 3, column: 6, index: 41 },
                  end: { line: 3, column: 14, index: 49 },
                },
              },
              right: {
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    start: 52,
                    end: 59,
                    type: 'Identifier',
                    name: 'baseTag',
                    loc: {
                      start: { line: 3, column: 8, index: 52 },
                      end: { line: 3, column: 15, index: 59 },
                    },
                  },
                  property: {
                    start: 60,
                    end: 72,
                    type: 'Identifier',
                    name: 'getAttribute',
                    loc: {
                      start: { line: 3, column: 8, index: 60 },
                      end: { line: 3, column: 20, index: 72 },
                    },
                  },
                  loc: {
                    start: { line: 3, column: 8, index: 52 },
                    end: { line: 3, column: 20, index: 72 },
                  },
                  start: 52,
                  end: 72,
                  computed: false,
                },
                start: 52,
                end: 151,
                arguments: [
                  {
                    start: 73,
                    end: 79,
                    type: 'Literal',
                    value: 'href',
                    loc: {
                      start: { line: 3, column: 8, index: 73 },
                      end: { line: 3, column: 14, index: 79 },
                    },
                    raw: "'href'",
                  },
                ],
                loc: {
                  start: { line: 3, column: 8, index: 52 },
                  end: { column: 34, index: 86, line: 3 },
                },
              },
              loc: {
                start: { line: 3, column: 7, index: 50 },
                end: { column: 34, index: 86, line: 3 },
              },
              start: 50,
              end: 151,
            },
            start: 50,
            end: 151,
            loc: {
              start: { line: 3, column: 7, index: 50 },
              end: { column: 34, index: 86, line: 3 },
            },
          },
          alternate: null,
        },
      ],
      start: 0,
      end: 151,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 34, index: 86, line: 3 },
      },
    }
    expect(parse(input)).toEqual(ast)
  })
})
