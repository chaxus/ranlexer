import type { Program } from '@/ast/NodeType';
import { Parser } from '@/parser/Parser';
import type { Token, TokenizerOption } from '@/parser/Tokenizer';
import { Tokenizer } from '@/parser/Tokenizer';

export function tokenize(code: string, options: TokenizerOption = {}): Token[] {
  const tokenizer = new Tokenizer(code, options);
  const tokens = tokenizer.tokenize();
  return tokens;
}

export function parse(code: string): Program {
  const tokens = tokenize(code);
  const parser = new Parser(tokens);
  return parser.parse();
}
