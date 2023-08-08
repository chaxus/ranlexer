import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/NodeType'
import type { MemberExpression, Program } from '@/ast/NodeType'

describe('expression', () => {
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
  it('instanceof', () => {
    const result: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.FunctionDeclaration,
          id: { type: NodeType.Identifier, name: 'a', start: 9, end: 10 },
          params: [],
          async: false,
          generator: false,
          body: { type: NodeType.BlockStatement, body: [], start: 12, end: 14 },
          start: 0,
          end: 14,
        },
        {
          type: NodeType.ExpressionStatement,
          expression: {
            type: NodeType.BinaryExpression,
            operator: 'instanceof',
            left: { type: NodeType.Identifier, name: 'a', start: 16, end: 17 },
            right: {
              type: NodeType.Identifier,
              name: 'Function',
              start: 29,
              end: 37,
            },
            start: 18,
            end: 37,
          },
          start: 18,
          end: 37,
        },
      ],
      start: 0,
      end: 37,
    }
    const code = 'function a(){}; a instanceof Function;'
    expect(generate(result)).toEqual(code)
  })
})
