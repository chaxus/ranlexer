import type { Token } from '@/parser/Tokenizer'
import type { Node, Program } from '@/ast/NodeType'
import { isWhiteSpace } from '@/utils/char'

// 追加 token，追加 parser
export const ranlexerJsxPlugin = () => {
  return {
    name: 'ranlexer-jsx-plugin',
    tokenizer(
      currentChar: string,
      startIndex: number,
      source: string,
    ): Token[] {
      // JSXOpeningFragment
      // JSXClosingFragment
      // JSXText
      // JSXElement
      // JSXOpeningElement
      // JSXIdentifier
      // JSXAttribute
      // JSXIdentifier
      // StringLiteral
      // JSXExpressionContainer
      // ConditionalExpression
      return []
    },
    parser(token: Token[]): Node {
      return {
        type: '',
        start: 0,
        end: 0,
      }
    },
    generate(ast: Program): string {
      return ''
    },
  }
}
