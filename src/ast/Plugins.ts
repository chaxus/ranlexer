import type { Token } from '@/parser/Tokenizer';
import type { Node, Program } from '@/ast/NodeType';

export interface Plugins {
    name: string;
    tokenizer(index: number, source: string): Token[];
    parser(token: Token[]): Node;
    generate(ast: Program): string;
  }