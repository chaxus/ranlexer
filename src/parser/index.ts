import type { Program } from '@/ast/nodeTypes'
import { Parser } from '@/parser/Parser'
import type { Token } from '@/parser/Tokenizer'
import { Tokenizer } from '@/parser/Tokenizer'

export function tokenize(code: string): Token[] {
  const tokenizer = new Tokenizer(code)
  const tokens = tokenizer.tokenize()
  return tokens
}

export function parse(code: string): Program {
  const tokens = tokenize(code)
  const parser = new Parser(tokens)
  return parser.parse()
}
