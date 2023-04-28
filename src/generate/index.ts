import { Generate } from '@/generate/Generate'
import type { Program } from '@/ast/nodeTypes'

export function generate(ast: Program): string {
  const generation = new Generate(ast)
  return generation.render()
}
