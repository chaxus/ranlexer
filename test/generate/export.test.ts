import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/nodeTypes'
import type { Program } from '@/ast/nodeTypes'

describe('export', () => {
  it('export ExportNamedDeclaration declaration', () => {
    const result = "export { foo, ccc as bar } from 'foo';"
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 37,
      body: [
        {
          type: NodeType.ExportNamedDeclaration,
          start: 0,
          end: 37,
          declaration: null,
          specifiers: [
            {
              type: NodeType.ExportSpecifier,
              start: 9,
              end: 12,
              local: {
                type: NodeType.Identifier,
                name: 'foo',
                start: 9,
                end: 12,
              },
              exported: {
                type: NodeType.Identifier,
                name: 'foo',
                start: 9,
                end: 12,
              },
            },
            {
              type: NodeType.ExportSpecifier,
              start: 14,
              end: 24,
              local: {
                type: NodeType.Identifier,
                name: 'bar',
                start: 14,
                end: 17,
              },
              exported: {
                type: NodeType.Identifier,
                name: 'ccc',
                start: 21,
                end: 24,
              },
            },
          ],
          source: {
            type: NodeType.Literal,
            start: 32,
            end: 37,
            value: 'foo',
            raw: "'foo'",
          },
        },
      ],
    }
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportAllDeclaration declaration', () => {
    const result = "export * from 'foo';"
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 19,
      body: [
        {
          type: NodeType.ExportAllDeclaration,
          start: 0,
          end: 19,
          source: {
            type: NodeType.Literal,
            start: 14,
            end: 19,
            value: 'foo',
            raw: "'foo'",
          },
          exported: null,
        },
      ],
    }
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportDefaultDeclaration declaration', () => {
    const result = 'export default function(){}'
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 28,
      body: [
        {
          type: NodeType.ExportDefaultDeclaration,
          start: 0,
          end: 28,
          declaration: {
            type: NodeType.FunctionDeclaration,
            start: 15,
            end: 28,
            id: null,
            params: [],
            body: {
              type: NodeType.BlockStatement,
              start: 26,
              end: 28,
              body: [],
            },
          },
        },
      ],
    }
    expect(generate(ast)).to.be.equal(result)
  })
})
