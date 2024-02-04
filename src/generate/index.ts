import { Generate } from '@/generate/Generate';
import type { Program } from '@/ast/NodeType';

export function generate(ast: Program): string {
  const generation = new Generate(ast);
  return generation.render();
}
