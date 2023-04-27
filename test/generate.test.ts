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

  })
  it('export declaration', () => {

  })
})
