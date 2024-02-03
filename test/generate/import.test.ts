import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/NodeType'
import type { Program } from '@/ast/NodeType'

describe('import', () => {
  it('import namespace specifier declaration', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ImportDeclaration,
          specifiers: [
            {
              type: NodeType.ImportDefaultSpecifier,
              local: {
                start: 12,
                end: 15,
                type: NodeType.Identifier,
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
              type: NodeType.ImportSpecifier,
              imported: {
                start: 19,
                end: 24,
                type: NodeType.Identifier,
                name: 'name1',
                loc: {
                  start: { line: 2, column: 7, index: 19 },
                  end: { line: 2, column: 12, index: 24 },
                },
              },
              local: {
                start: 19,
                end: 24,
                type: NodeType.Identifier,
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
              type: NodeType.ImportSpecifier,
              imported: {
                start: 26,
                end: 31,
                type: NodeType.Identifier,
                name: 'name2',
                loc: {
                  start: { line: 2, column: 8, index: 26 },
                  end: { line: 2, column: 13, index: 31 },
                },
              },
              local: {
                start: 35,
                end: 38,
                type: NodeType.Identifier,
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
            type: NodeType.Literal,
            value: 'foo',
            loc: {
              start: { line: 2, column: 13, index: 46 },
              end: { line: 2, column: 18, index: 51 },
            },
            raw: "'foo'",
          },
        },
        {
          type: NodeType.ImportDeclaration,
          specifiers: [
            {
              type: NodeType.ImportNamespaceSpecifier,
              local: {
                start: 76,
                end: 79,
                type: NodeType.Identifier,
                name: 'mod',
                loc: {
                  start: { line: 3, column: 7, index: 76 },
                  end: { line: 3, column: 10, index: 79 },
                },
              },
              start: 71,
              end: 79,
              loc: {
                start: { line: 3, column: 5, index: 71 },
                end: { line: 3, column: 10, index: 79 },
              },
            },
          ],
          start: 64,
          end: 90,
          loc: {
            start: { line: 3, column: 4, index: 64 },
            end: { line: 3, column: 14, index: 90 },
          },
          source: {
            start: 85,
            end: 90,
            type: NodeType.Literal,
            value: 'mod',
            loc: {
              start: { line: 3, column: 9, index: 85 },
              end: { line: 3, column: 14, index: 90 },
            },
            raw: "'mod'",
          },
        },
      ],
      start: 0,
      end: 90,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 3, column: 14, index: 90 },
      },
    }
    const result = `
    import foo, { name1, name2 as bar } from 'foo';       
    import * as mod from 'mod';`
    expect(generate(ast)).to.be.equal(result)
  })
  it('import declaration', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ImportDeclaration,
          specifiers: [],
          start: 0,
          end: 26,
          loc: {
            start: { line: 1, column: 0, index: 0 },
            end: { line: 1, column: 20, index: 26 },
          },
          source: {
            start: 7,
            end: 26,
            type: NodeType.Literal,
            value: 'common/reset.scss',
            loc: {
              start: { line: 1, column: 1, index: 7 },
              end: { line: 1, column: 20, index: 26 },
            },
            raw: "'common/reset.scss'",
          },
        },
      ],
      start: 0,
      end: 26,
      loc: {
        start: { line: 0, column: 0, index: 0 },
        end: { line: 1, column: 20, index: 26 },
      },
    }
    const result = `import 'common/reset.scss';`
    expect(generate(ast)).to.be.equal(result)
  })
})
