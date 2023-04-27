import type {
  Expression,
  ExpressionStatement,
  Identifier,
  Program,
  VariableDeclaration,
  VariableDeclarator,
} from '@/parser/nodeTypes'
import { NodeType } from '@/parser'
import { RanString } from '@/utils/RanString'

export class Generate {
  ast: Program
  code: RanString
  constructor(ast: Program) {
    const { start, end } = ast
    this.ast = ast
    this.code = new RanString(end - start)
  }
  generateIdentifier(node: Identifier): void {
    const { start, end, type, name } = node
    this.code.update(start - this.ast.start, end, name)
  }
  generateMemberExpression(node: Expression): void {
    const { type, start, end } = node
    if (type === NodeType.MemberExpression) {
      const { object, property } = node
      if(object.type === NodeType.MemberExpression){
        this.generateMemberExpression(object)
      }
      if(object.type === NodeType.Identifier){
        this.generateIdentifier(object)
      }
      if(property.type === NodeType.Identifier){
        this.generateIdentifier(property)
      }
      this.code.replace(/\s/g,'.')
    }
  }
  generateExpressionStatement(node: ExpressionStatement): void {
    const { type, start, end, expression } = node
    this.generateMemberExpression(expression)
  }
  /**
   * @description: Parse literals
   * @param {VariableDeclarator} node
   */
  generateLiteral(node: VariableDeclarator): void {
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
  /**
   * @description: Analytic variable declaration
   * @param {VariableDeclaration} node
   */
  generateVariableDeclaration(node: VariableDeclaration): void {
    const { start, declarations, kind, end } = node
    this.code.update(start - this.ast.start, kind.length, kind)
    this.code.update(end - 1, end, ';')
    declarations.forEach((declaration) => {
      const { type } = declaration
      if (type === NodeType.VariableDeclarator) {
        return this.generateLiteral(declaration)
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
      if (type === NodeType.ExpressionStatement) {
        return this.generateExpressionStatement(node)
      }
    })
    return this.code.toString()
  }
}
