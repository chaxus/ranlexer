import type {
  Program,
  VariableDeclaration,
  VariableDeclarator,
} from '@/parser/nodeTypes'
import { NodeType } from '@/parser'
import { BetterString } from '@/utils/betterString'

export class Generate {
  ast: Program
  code: BetterString
  constructor(ast: Program) {
    const { start, end } = ast
    this.ast = ast
    this.code = new BetterString(end - start)
  }

  generateVariableDeclarator(node: VariableDeclarator): void {
    const { start, end, id, init } = node
    if (init) {
      if (init.type === NodeType.Literal) {
        this.code.update(
          start - this.ast.start,
          end - 1,
          `${id.name} = ${init ? init.raw : undefined}`,
        )
      }
    }
  }
  generateVariableDeclaration(node: VariableDeclaration): void {
    const { start, declarations, kind, end } = node
    this.code.update(start - this.ast.start, kind.length, kind)
    this.code.update(end - 1, end, ';')
    declarations.forEach((declaration) => {
      const { type } = declaration
      if (type === NodeType.VariableDeclarator) {
        this.generateVariableDeclarator(declaration)
      }
    })
  }
  render(): string {
    const nodes = this.ast.body
    nodes.forEach((node) => {
      const { type } = node
      if (type === NodeType.VariableDeclaration) {
        this.generateVariableDeclaration(node)
      }
    })
    return this.code.toString()
  }
}
