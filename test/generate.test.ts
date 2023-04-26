import { describe, expect, it } from 'vitest'
import { Generate } from '@/generate/Generate'
import { NodeType } from '@/parser'
import type { Program } from '@/parser/nodeTypes'

describe('generate', () => {
  it('let a = 1;', async () => {
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
    const generate = new Generate(ast)
    expect(generate.render()).to.be.equal('let a = 1;')
  })
})
