import type { Token } from "@/parser/Tokenizer"
import type { Node, Program } from '@/ast/NodeType'

// 追加 token，追加 parser

export const ranlexerJsxPlugin = () => {
  return {
    name: 'ranlexer-jsx-plugin',
    tokenizer(code: string): Token[] {

      return []
    },
    parser(token: Token[]): Node {

      return {
        type: '',
        start: 0,
        end: 0
      }
    },
    generate(ast: Program): string {
      
      return ''
    }
  }
}