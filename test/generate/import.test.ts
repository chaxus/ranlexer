import { describe, expect, it } from 'vitest'
import { generate } from '@/generate'
import { NodeType } from '@/ast/NodeType'
import type { Program } from '@/ast/NodeType'

describe('import', () => {
  it('import namespace specifier declaration', () => {
    const ast: Program = {
      type: NodeType.Program,
      start: 0,
      end: 80,
      body: [
        {
          type: NodeType.ImportDeclaration,
          start: 0,
          end: 46,
          specifiers: [
            {
              type: NodeType.ImportDefaultSpecifier,
              start: 7,
              end: 10,
              local: {
                type: NodeType.Identifier,
                name: 'foo',
                start: 7,
                end: 10,
              },
            },
            {
              type: NodeType.ImportSpecifier,
              start: 14,
              end: 19,
              imported: {
                type: NodeType.Identifier,
                name: 'name1',
                start: 14,
                end: 19,
              },
              local: {
                type: NodeType.Identifier,
                name: 'name1',
                start: 14,
                end: 19,
              },
            },
            {
              type: NodeType.ImportSpecifier,
              start: 21,
              end: 33,
              imported: {
                type: NodeType.Identifier,
                name: 'name2',
                start: 21,
                end: 26,
              },
              local: {
                type: NodeType.Identifier,
                name: 'bar',
                start: 30,
                end: 33,
              },
            },
          ],
          source: {
            type: NodeType.Literal,
            start: 41,
            end: 46,
            value: 'foo',
            raw: "'foo'",
          },
        },
        {
          type: NodeType.ImportDeclaration,
          start: 54,
          end: 80,
          specifiers: [
            {
              type: NodeType.ImportNamespaceSpecifier,
              start: 61,
              end: 69,
              local: {
                type: NodeType.Identifier,
                name: 'mod',
                start: 66,
                end: 69,
              },
            },
          ],
          source: {
            type: NodeType.Literal,
            start: 75,
            end: 80,
            value: 'mod',
            raw: "'mod'",
          },
        },
      ],
    }
    const result =
      "import foo, { name1, name2 as bar } from 'foo';       import * as mod from 'mod'; "
    expect(generate(ast)).to.be.equal(result)
  })
  it('import declaration', () => {
    const ast: Program = {
      type: NodeType.Program,
      body: [
        {
          type: NodeType.ImportDeclaration,
          specifiers: [],
          start: 1,
          end: 27,
          source: {
            type: NodeType.Literal,
            value: 'common/reset.scss',
            start: 8,
            end: 27,
            raw: "'common/reset.scss'",
          },
        },
      ],
      start: 0,
      end: 27,
    }
    const result = ` import 'common/reset.scss';`
    expect(generate(ast)).to.be.equal(result)
  })
})
