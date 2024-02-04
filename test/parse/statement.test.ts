import { describe, expect, it } from 'vitest';
import { parse } from '@/parser';

describe('statement', () => {
  it('throw Error();', () => {
    const code = 'throw Error();';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            start: 0,
            end: 5,
            type: 'Identifier',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              start: 6,
              end: 11,
              type: 'Identifier',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('{}', () => {
    const code = '{}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'BlockStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('try {} catch(e) {} finally{}', () => {
    const code = 'try {} catch(e) {} finally{}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            start: 0,
            end: 3,
            type: 'Identifier',
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
          type: 'BlockStatement',
          start: 4,
          end: 6,
          body: [],
          loc: {
            start: { line: 1, column: 1, index: 4 },
            end: { line: 1, column: 2, index: 6 },
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              start: 7,
              end: 12,
              type: 'Identifier',
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
                type: 'Identifier',
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
          type: 'BlockStatement',
          start: 16,
          end: 18,
          body: [],
          loc: {
            start: { line: 1, column: 3, index: 16 },
            end: { line: 1, column: 4, index: 18 },
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            start: 19,
            end: 26,
            type: 'Identifier',
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
          type: 'BlockStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('for (let key in obj) {}', () => {
    const code = 'for (let key in obj) {}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ForInStatement',
          start: 0,
          end: 23,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 23 },
          },
          right: {
            start: 16,
            end: 19,
            type: 'Identifier',
            name: 'obj',
            loc: {
              start: { line: 1, column: 4, index: 16 },
              end: { line: 1, column: 7, index: 19 },
            },
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  start: 9,
                  end: 12,
                  type: 'Identifier',
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
            type: 'BlockStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('for (let i = 0;i < 10;i ++) {}', () => {
    const code = 'for (let i = 0;i < 10;i ++) {}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ForStatement',
          start: 0,
          end: 30,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 9, index: 30 },
          },
          init: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  start: 9,
                  end: 10,
                  type: 'Identifier',
                  name: 'i',
                  loc: {
                    start: { line: 1, column: 2, index: 9 },
                    end: { line: 1, column: 3, index: 10 },
                  },
                },
                init: {
                  start: 13,
                  end: 14,
                  type: 'Literal',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              operator: '<',
              left: {
                start: 15,
                end: 16,
                type: 'Identifier',
                name: 'i',
                loc: {
                  start: { line: 1, column: 4, index: 15 },
                  end: { line: 1, column: 5, index: 16 },
                },
              },
              right: {
                start: 19,
                end: 21,
                type: 'Literal',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              operator: '++',
              argument: {
                start: 22,
                end: 23,
                type: 'Identifier',
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
            type: 'BlockStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('for (const key of obj) {}', () => {
    const code = 'for (const key of obj) {}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ForOfStatement',
          start: 0,
          end: 25,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 6, index: 25 },
          },
          right: {
            start: 18,
            end: 21,
            type: 'Identifier',
            name: 'obj',
            loc: {
              start: { line: 1, column: 4, index: 18 },
              end: { line: 1, column: 7, index: 21 },
            },
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                id: {
                  start: 11,
                  end: 14,
                  type: 'Identifier',
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
            type: 'BlockStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('while (true) {}', () => {
    const code = 'while (true) {}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              start: 0,
              end: 5,
              type: 'Identifier',
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
                type: 'Identifier',
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
          type: 'BlockStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('do {} while (true)', () => {
    const code = 'do {} while (true)';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            start: 0,
            end: 2,
            type: 'Identifier',
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
          type: 'BlockStatement',
          start: 3,
          end: 5,
          body: [],
          loc: {
            start: { line: 1, column: 1, index: 3 },
            end: { line: 1, column: 2, index: 5 },
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              start: 6,
              end: 11,
              type: 'Identifier',
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
                type: 'Identifier',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('switch (v){case 1: break;default:;}', () => {
    const code = 'switch (v){case 1: break;default:;};';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'SwitchStatement',
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 4, index: 35 },
          },
          end: 35,
          start: 0,
          discriminant: {
            start: 8,
            end: 9,
            type: 'Identifier',
            name: 'v',
            loc: {
              start: { line: 1, column: 1, index: 8 },
              end: { line: 1, column: 2, index: 9 },
            },
          },
          cases: [
            {
              type: 'SwitchCase',
              start: 11,
              end: 24,
              loc: {
                start: { line: 1, column: 1, index: 11 },
                end: { line: 1, column: 5, index: 15 },
              },
              test: {
                start: 16,
                end: 17,
                type: 'Literal',
                value: '1',
                loc: {
                  start: { line: 1, column: 2, index: 16 },
                  end: { line: 1, column: 3, index: 17 },
                },
                raw: '1',
              },
              consequent: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    start: 19,
                    end: 24,
                    type: 'Identifier',
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
              type: 'SwitchCase',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('label: console.log();', () => {
    const code = 'label: console.log();';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'LabeledStatement',
          start: 0,
          end: 20,
          label: {
            start: 0,
            end: 5,
            type: 'Identifier',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  start: 7,
                  end: 14,
                  type: 'Identifier',
                  name: 'console',
                  loc: {
                    start: { line: 1, column: 1, index: 7 },
                    end: { line: 1, column: 8, index: 14 },
                  },
                },
                property: {
                  start: 15,
                  end: 18,
                  type: 'Identifier',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('with (a){}', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              start: 0,
              end: 4,
              type: 'Identifier',
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
                type: 'Identifier',
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
          type: 'BlockStatement',
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
    };
    const code = 'with (a){}';
    expect(parse(code)).toEqual(result);
  });
  it('break;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            start: 0,
            end: 5,
            type: 'Identifier',
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
    };
    const code = 'break;';
    expect(parse(code)).toEqual(result);
  });
  it('continue;', () => {
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            start: 0,
            end: 8,
            type: 'Identifier',
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
    };
    const code = 'continue;';
    expect(parse(code)).toEqual(result);
  });
  it('return;', () => {
    const code = 'return;';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ReturnStatement',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('debugger;', () => {
    const code = 'debugger;';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            start: 0,
            end: 8,
            type: 'Identifier',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('if statement', () => {
    const code = 'if (a) b = 1';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          start: 0,
          end: 12,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 5, index: 12 },
          },
          test: {
            start: 4,
            end: 5,
            type: 'Identifier',
            name: 'a',
            loc: {
              start: { line: 1, column: 1, index: 4 },
              end: { line: 1, column: 2, index: 5 },
            },
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                start: 7,
                end: 8,
                type: 'Identifier',
                name: 'b',
                loc: {
                  start: { line: 1, column: 2, index: 7 },
                  end: { line: 1, column: 3, index: 8 },
                },
              },
              right: {
                start: 11,
                end: 12,
                type: 'Literal',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('if BlockStatement', () => {
    const code = 'if (a) {b=1}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          start: 0,
          end: 12,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 3, index: 12 },
          },
          test: {
            start: 4,
            end: 5,
            type: 'Identifier',
            name: 'a',
            loc: {
              start: { line: 1, column: 1, index: 4 },
              end: { line: 1, column: 2, index: 5 },
            },
          },
          consequent: {
            type: 'BlockStatement',
            start: 7,
            end: 12,
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    start: 8,
                    end: 9,
                    type: 'Identifier',
                    name: 'b',
                    loc: {
                      start: { line: 1, column: 2, index: 8 },
                      end: { line: 1, column: 3, index: 9 },
                    },
                  },
                  right: {
                    start: 10,
                    end: 11,
                    type: 'Literal',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('member expression nested', () => {
    const code = 'a[c(e,d)[g]]()';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                start: 0,
                end: 1,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 0, index: 0 },
                  end: { line: 1, column: 1, index: 1 },
                },
              },
              property: {
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    start: 2,
                    end: 3,
                    type: 'Identifier',
                    name: 'c',
                    loc: {
                      start: { line: 1, column: 0, index: 2 },
                      end: { line: 1, column: 1, index: 3 },
                    },
                  },
                  start: 2,
                  end: 10,
                  arguments: [
                    {
                      start: 4,
                      end: 5,
                      type: 'Identifier',
                      name: 'e',
                      loc: {
                        start: { line: 1, column: 0, index: 4 },
                        end: { line: 1, column: 1, index: 5 },
                      },
                    },
                    {
                      start: 6,
                      end: 7,
                      type: 'Identifier',
                      name: 'd',
                      loc: {
                        start: { line: 1, column: 0, index: 6 },
                        end: { line: 1, column: 1, index: 7 },
                      },
                    },
                  ],
                  loc: {
                    start: { line: 1, column: 0, index: 2 },
                    end: { column: 2, index: 4, line: 1 },
                  },
                },
                property: {
                  start: 9,
                  end: 10,
                  type: 'Identifier',
                  name: 'g',
                  loc: {
                    start: { line: 1, column: 0, index: 9 },
                    end: { line: 1, column: 1, index: 10 },
                  },
                },
                loc: {
                  start: { line: 1, column: 0, index: 2 },
                  end: { line: 1, column: 1, index: 11 },
                },
                start: 2,
                end: 11,
                computed: true,
              },
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 1, index: 12 },
              },
              start: 0,
              end: 12,
              computed: true,
            },
            start: 0,
            end: 14,
            arguments: [],
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { column: 3, index: 14, line: 1 },
            },
          },
          start: 0,
          end: 14,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { column: 3, index: 14, line: 1 },
          },
        },
      ],
      start: 0,
      end: 14,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 3, index: 14, line: 1 },
      },
    };
    expect(parse(code)).toEqual(result);
  });
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
              object: {
                start: 0,
                end: 1,
                type: 'Identifier',
                name: 'a',
                loc: {
                  start: { line: 1, column: 0, index: 0 },
                  end: { line: 1, column: 1, index: 1 },
                },
              },
              property: {
                type: 'CallExpression',
                callee: {
                  start: 2,
                  end: 3,
                  type: 'Identifier',
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
              type: 'Literal',
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
    };
    const code = 'a[b()][12]';
    expect(parse(code)).toEqual(result);
  });
  it('instanceof', () => {
    const code = 'function a(){}; a instanceof Function;';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'FunctionDeclaration',
          id: {
            start: 9,
            end: 10,
            type: 'Identifier',
            name: 'a',
            loc: {
              start: { line: 1, column: 1, index: 9 },
              end: { line: 1, column: 2, index: 10 },
            },
          },
          async: false,
          generator: false,
          params: [],
          body: {
            type: 'BlockStatement',
            start: 12,
            end: 14,
            body: [],
            loc: {
              start: { line: 1, column: 1, index: 12 },
              end: { line: 1, column: 2, index: 14 },
            },
          },
          start: 0,
          end: 14,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 2, index: 14 },
          },
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            operator: 'instanceof',
            left: {
              start: 16,
              end: 17,
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 2, index: 16 },
                end: { line: 1, column: 3, index: 17 },
              },
            },
            right: {
              start: 29,
              end: 37,
              type: 'Identifier',
              name: 'Function',
              loc: {
                start: { line: 1, column: 4, index: 29 },
                end: { line: 1, column: 12, index: 37 },
              },
            },
            loc: {
              start: { line: 1, column: 3, index: 18 },
              end: { line: 1, column: 12, index: 37 },
            },
            start: 18,
            end: 37,
          },
          start: 18,
          end: 37,
          loc: {
            start: { line: 1, column: 3, index: 18 },
            end: { line: 1, column: 12, index: 37 },
          },
        },
      ],
      start: 0,
      end: 37,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 12, index: 37 },
      },
    };
    expect(parse(code)).toEqual(result);
  });
  it('const [a,b] = c;', () => {
    const code = 'const [a,b] = c;';
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
                  {
                    start: 7,
                    end: 8,
                    type: 'Identifier',
                    name: 'a',
                    loc: {
                      start: { line: 1, column: 1, index: 7 },
                      end: { line: 1, column: 2, index: 8 },
                    },
                  },
                  {
                    start: 9,
                    end: 10,
                    type: 'Identifier',
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
                type: 'Identifier',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('const {a,b} = c;', () => {
    const code = 'const {a,b} = c;';
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
                    loc: {
                      start: { line: 1, column: 1, index: 7 },
                      end: { line: 1, column: 2, index: 8 },
                    },
                    type: 'Property',
                    kind: 'init',
                    key: {
                      start: 7,
                      end: 8,
                      type: 'Identifier',
                      name: 'a',
                      loc: {
                        start: { line: 1, column: 1, index: 7 },
                        end: { line: 1, column: 2, index: 8 },
                      },
                    },
                    value: {
                      start: 7,
                      end: 8,
                      type: 'Identifier',
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
                    type: 'Property',
                    kind: 'init',
                    key: {
                      start: 9,
                      end: 10,
                      type: 'Identifier',
                      name: 'b',
                      loc: {
                        start: { line: 1, column: 1, index: 9 },
                        end: { line: 1, column: 2, index: 10 },
                      },
                    },
                    value: {
                      start: 9,
                      end: 10,
                      type: 'Identifier',
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
                type: 'Identifier',
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('ConditionalExpression', () => {
    const code = 'a ? b : c';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ConditionalExpression',
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { line: 1, column: 5, index: 9 },
            },
            start: 0,
            end: 9,
            test: {
              start: 0,
              end: 1,
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 1, index: 1 },
              },
            },
            consequent: {
              start: 4,
              end: 5,
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 1, column: 2, index: 4 },
                end: { line: 1, column: 3, index: 5 },
              },
            },
            alternate: {
              start: 8,
              end: 9,
              type: 'Identifier',
              name: 'c',
              loc: {
                start: { line: 1, column: 4, index: 8 },
                end: { line: 1, column: 5, index: 9 },
              },
            },
          },
          start: 0,
          end: 9,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 5, index: 9 },
          },
        },
      ],
      start: 0,
      end: 9,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 5, index: 9 },
      },
    };
    expect(parse(code)).toEqual(result);
  });
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
              body: {
                type: 'BlockStatement',
                start: 11,
                end: 13,
                body: [],
                loc: {
                  start: { line: 1, column: 0, index: 11 },
                  end: { line: 1, column: 2, index: 14 },
                },
              },
              async: false,
              generator: false,
              start: 1,
              end: 14,
              loc: {
                start: { line: 1, column: 0, index: 1 },
                end: { line: 1, column: 2, index: 14 },
              },
            },
            start: 1,
            end: 16,
            arguments: [],
            loc: {
              start: { line: 1, column: 0, index: 1 },
              end: { column: 4, index: 16, line: 1 },
            },
          },
          start: 1,
          end: 16,
          loc: {
            start: { line: 1, column: 0, index: 1 },
            end: { column: 4, index: 16, line: 1 },
          },
        },
      ],
      start: 0,
      end: 16,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 4, index: 16, line: 1 },
      },
    };
    const code = '(function(){})()';
    expect(parse(code)).toEqual(result);
  });
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
                callee: {
                  start: 0,
                  end: 1,
                  type: 'Identifier',
                  name: 'a',
                  loc: {
                    start: { line: 1, column: 0, index: 0 },
                    end: { line: 1, column: 1, index: 1 },
                  },
                },
                start: 0,
                end: 3,
                arguments: [],
                loc: {
                  start: { line: 1, column: 0, index: 0 },
                  end: { column: 3, index: 3, line: 1 },
                },
              },
              start: 0,
              end: 5,
              arguments: [],
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { column: 5, index: 5, line: 1 },
              },
            },
            start: 0,
            end: 7,
            arguments: [],
            loc: {
              start: { line: 1, column: 0, index: 0 },
              end: { column: 7, index: 7, line: 1 },
            },
          },
          start: 0,
          end: 7,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { column: 7, index: 7, line: 1 },
          },
        },
      ],
      start: 0,
      end: 7,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { column: 7, index: 7, line: 1 },
      },
    };
    const code = 'a()()()';
    expect(parse(code)).toEqual(result);
  });
  it('nest AssignmentExpression', () => {
    const code = '((a=b))';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              start: 2,
              end: 3,
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 0, index: 2 },
                end: { line: 1, column: 1, index: 3 },
              },
            },
            right: {
              start: 4,
              end: 5,
              type: 'Identifier',
              name: 'b',
              loc: {
                start: { line: 1, column: 0, index: 4 },
                end: { line: 1, column: 3, index: 7 },
              },
            },
            loc: {
              start: { line: 1, column: 0, index: 3 },
              end: { line: 1, column: 3, index: 7 },
            },
            start: 3,
            end: 7,
          },
          start: 3,
          end: 7,
          loc: {
            start: { line: 1, column: 0, index: 3 },
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
    };
    expect(parse(code)).toEqual(result);
  });
  it('nest AssignmentExpression and function', () => {
    const code = 'a=b=function a(){}';
    const result = {
      type: 'Program',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              start: 0,
              end: 1,
              type: 'Identifier',
              name: 'a',
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 1, index: 1 },
              },
            },
            right: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                start: 2,
                end: 3,
                type: 'Identifier',
                name: 'b',
                loc: {
                  start: { line: 1, column: 0, index: 2 },
                  end: { line: 1, column: 1, index: 3 },
                },
              },
              right: {
                type: 'FunctionExpression',
                id: {
                  start: 13,
                  end: 14,
                  type: 'Identifier',
                  name: 'a',
                  loc: {
                    start: { line: 1, column: 1, index: 13 },
                    end: { line: 1, column: 2, index: 14 },
                  },
                },
                params: [],
                body: {
                  type: 'BlockStatement',
                  start: 16,
                  end: 18,
                  body: [],
                  loc: {
                    start: { line: 1, column: 1, index: 16 },
                    end: { line: 1, column: 2, index: 18 },
                  },
                },
                async: false,
                generator: false,
                start: 4,
                end: 18,
                loc: {
                  start: { line: 1, column: 0, index: 4 },
                  end: { line: 1, column: 2, index: 18 },
                },
              },
              loc: {
                start: { line: 1, column: 0, index: 3 },
                end: { line: 1, column: 2, index: 18 },
              },
              start: 3,
              end: 18,
            },
            loc: {
              start: { line: 1, column: 0, index: 1 },
              end: { line: 1, column: 2, index: 18 },
            },
            start: 1,
            end: 18,
          },
          start: 1,
          end: 18,
          loc: {
            start: { line: 1, column: 0, index: 1 },
            end: { line: 1, column: 2, index: 18 },
          },
        },
      ],
      start: 0,
      end: 18,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 2, index: 18 },
      },
    };
    expect(parse(code)).toEqual(result);
  });
});
