import type { Program } from '@/parser/nodeTypes'
import { Parser } from '@/parser/Parser'
import { Tokenizer } from '@/parser/Tokenizer'

export function parse(code: string): Program {
    const tokenizer = new Tokenizer(code)
    const tokens = tokenizer.tokenize()
    const parser = new Parser(tokens)
    return parser.parse()
}

export * from './Tokenizer'
export * from './nodeTypes'
