import type { Token } from '@/parser/Tokenizer';
import type { Plugins } from '@/ast/Plugins';
import type { Node, Program } from '@/ast/NodeType';
import { isWhiteSpace } from '@/utils/char';

// 追加 token，追加 parser
export const ranlexerJsxPlugin = (): Plugins => {
  return {
    name: 'ranlexer-jsx',
    tokenizer(
      index: number,
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
      return [];
    },
    parser(token: Token[]): Node {
      return {
        type: '',
        start: 0,
        end: 0,
        loc: {
          start: {
            index: 0,
            column: 0,
            line: 1,
          },
          end: {
            index: 0,
            column: 0,
            line: 1,
          },
        },
      };
    },
    generate(ast: Program): string {
      return '';
    },
  };
};
