import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/NodeType'
import type { Program } from '@/ast/NodeType'

describe('export', () => {
  it('export ExportNamedDeclaration declaration', () => {
    const result = "export { foo, ccc as bar } from 'foo';"
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExportNamedDeclaration,
          specifiers: [
            {
              type: NodeType.ExportSpecifier,
              local: {
                start: 9,
                end: 12,
                type: NodeType.Identifier,
                name: 'foo',
                loc: {
                  start: { line: 1, column: 2, index: 9 },
                  end: { line: 1, column: 5, index: 12 },
                },
              },
              exported: {
                start: 9,
                end: 12,
                type: NodeType.Identifier,
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
              type: NodeType.ExportSpecifier,
              local: {
                start: 14,
                end: 17,
                type: NodeType.Identifier,
                name: 'ccc',
                loc: {
                  start: { line: 1, column: 3, index: 14 },
                  end: { line: 1, column: 6, index: 17 },
                },
              },
              exported: {
                start: 21,
                end: 24,
                type: NodeType.Identifier,
                name: 'bar',
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
            type: NodeType.Literal,
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
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportAllDeclaration declaration', () => {
    const result = "export * from 'foo';"
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExportAllDeclaration,
          start: 0,
          end: 19,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 8, index: 19 },
          },
          source: {
            start: 14,
            end: 19,
            type: NodeType.Literal,
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
    expect(generate(ast)).to.be.equal(result)
  })
  it('export ExportDefaultDeclaration declaration', () => {
    const result = 'export default function() {};'
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ExportDefaultDeclaration,
          declaration: {
            type: NodeType.FunctionDeclaration,
            id: null,
            async: false,
            generator: false,
            params: [],
            body: {
              type: NodeType.BlockStatement,
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
    expect(generate(ast)).to.be.equal(result)
  })
})
