import { describe, expect, it } from 'vitest';
import { generate } from '@/generate';
import { NodeType } from '@/ast/NodeType';
import type { MemberExpression, Program } from '@/ast/NodeType';

describe('expression', () => {
  it('member expression', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.MemberExpression,
            object: {
              start: 0,
              end: 3,
              type: NodeType.Identifier,
              name: 'foo',
              loc: {
                start: { line: 1, column: 0, index: 0 },
                end: { line: 1, column: 3, index: 3 },
              },
            },
            property: {
              start: 4,
              end: 7,
              type: NodeType.Identifier,
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
    };
    const result = 'foo.bar';
    expect(generate(ast)).to.be.equal(result);
  });
  it('nested member expression', () => {
    const result = 'foo.bar.zoo';
    const ast: Program = {
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
                end: 3,
                type: NodeType.Identifier,
                name: 'foo',
                loc: {
                  start: { line: 1, column: 0, index: 0 },
                  end: { line: 1, column: 3, index: 3 },
                },
              },
              property: {
                start: 4,
                end: 7,
                type: NodeType.Identifier,
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
              type: NodeType.Identifier,
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
    };
    expect(generate(ast)).to.be.equal(result);
  });
  it('instanceof', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.FunctionDeclaration,
          id: {
            start: 9,
            end: 10,
            type: NodeType.Identifier,
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
            type: NodeType.BlockStatement,
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
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.BinaryExpression,
            operator: 'instanceof',
            left: {
              start: 16,
              end: 17,
              type: NodeType.Identifier,
              name: 'a',
              loc: {
                start: { line: 1, column: 2, index: 16 },
                end: { line: 1, column: 3, index: 17 },
              },
            },
            right: {
              start: 29,
              end: 37,
              type: NodeType.Identifier,
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
    const code = 'function a(){}; a instanceof Function;';
    expect(generate(result)).toEqual(code);
  });
});
