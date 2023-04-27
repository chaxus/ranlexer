import { generate } from '@/generate'
import { NodeType } from '@/parser'
import type { MemberExpression, Program } from '@/parser/nodeTypes'

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

console.log(generate(ast))
