import type {
  BlockStatement,
  CallExpression,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  Program,
  ReturnStatement,
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
  generateCallExpression(node: CallExpression): void {
    const { start, end } = node
    if (node.callee.type === NodeType.MemberExpression) {
      this.generateMemberExpression(node.callee)
    }
    if (node.arguments) {
      this.generateFunctionParams(node.arguments)
    }
  }
  generateReturnStatement(node: ReturnStatement): void {
    const { start, end, argument } = node
    if (argument.type === NodeType.CallExpression) {
      this.code.update(start, start + 7, 'return ')
      this.generateCallExpression(argument)
    }
  }
  generateBlockStatement(node: BlockStatement): void {
    const { start, end, body } = node
    body.forEach((item) => {
      if (item.type === NodeType.ReturnStatement) {
        this.code.update(start - 1, start, '{')
        this.code.update(end, end - 1, '}')
        this.generateReturnStatement(item)
      }
    })
  }
  generateFunctionParams(params: Expression[] | Identifier[] = []):void{
    const paramsEndIndex = params.length - 1
    const paramsStartIndex = 0
    params.forEach((param, index) => {
      const { type } = param
      const paramStart = params[paramsStartIndex].start
      const paramEnd = params[paramsEndIndex].end
      if (type === NodeType.Identifier) {
        this.generateIdentifier(param)
      }
      if (index === paramsStartIndex) {
        this.code.update(paramStart - 1, paramStart, '(')
      }
      if (index === paramsEndIndex) {
        this.code.update(paramEnd, paramEnd + 1, ')')
        this.code.update(paramStart, paramEnd, ',', /\s+/g)
      }
    })
  }
  generateFunctionDeclaration(node: FunctionDeclaration): void {
    const { start, end, id, params = [], body } = node
    if (id) {
      this.code.update(
        start - this.ast.start,
        id.start - start - this.ast.start,
        'function ',
      )
      this.generateIdentifier(id)
    }
    if (params.length > 0) {
      this.generateFunctionParams(params)
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body)
    }
  }
  generateIdentifier(node: Identifier): void {
    const { start, end, type, name } = node
    this.code.update(start - this.ast.start, end, name)
  }
  generateMemberExpression(node: Expression): void {
    const { type, start, end } = node
    if (type === NodeType.MemberExpression) {
      const { object, property } = node
      if (object.type === NodeType.MemberExpression) {
        this.generateMemberExpression(object)
      }
      if (object.type === NodeType.Identifier) {
        this.generateIdentifier(object)
      }
      if (property.type === NodeType.Identifier) {
        this.generateIdentifier(property)
      }
      this.code.update(start, end, '.', /\s/g)
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
      if (type === NodeType.FunctionDeclaration) {
        return this.generateFunctionDeclaration(node)
      }
    })
    return this.code.toString()
  }
}
