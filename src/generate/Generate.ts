import type {
  ArrayExpression,
  ArrayPattern,
  ArrowFunctionExpression,
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  CallExpression,
  ExportAllDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  ForInStatement,
  ForOfStatement,
  ForStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  IfStatement,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  LabeledStatement,
  MemberExpression,
  ObjectExpression,
  ObjectPattern,
  Program,
  ReturnStatement,
  Statement,
  SwitchStatement,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
} from '@/ast/NodeType'
import { NodeType, NodeTypeStatements } from '@/ast/NodeType'
import { RanString } from '@/utils/betterString'

type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false)

type StatementFunction<T extends Statement = Statement> = IsEqual<
  T,
  Statement
> extends true
  ? T extends T
    ? (node: T) => void
    : never
  : (node: T) => void

type GenerateStatement = StatementFunction<Statement>

export class Generate {
  ast: Program
  code: RanString
  constructor(ast: Program) {
    const { start, end } = ast
    this.ast = ast
    this.code = new RanString(end - start)
  }
  generateExportDefaultDeclaration(node: ExportDefaultDeclaration): void {
    const { start, end, declaration } = node
    this.code.update(start, start + 15, `export default `)
    if (declaration.type === NodeType.FunctionDeclaration) {
      this.generateFunctionDeclaration(declaration)
    }
  }
  generateExportAllDeclaration(node: ExportAllDeclaration): void {
    const { start, end, exported, source } = node
    this.code.update(start, end, `export * from ${source.raw};`)
  }
  generateExportSpecifier(node: ExportSpecifier): void {
    const { start, end, exported, local } = node
    if (exported.name === local.name) {
      this.code.update(start, end, local.name)
    } else {
      this.code.update(start, end, `${exported.name} as ${local.name}`)
    }
  }
  generateExportNamedDeclaration(node: ExportNamedDeclaration): void {
    const { start, end, specifiers = [], source } = node
    this.code.update(start, start + 7, 'export ')
    const size = specifiers.length - 1
    let flag = true
    specifiers.forEach((specifier, index) => {
      const { type, end, start } = specifier
      if (type === NodeType.ExportSpecifier) {
        this.generateExportSpecifier(specifier)
        if (flag) {
          flag = false
          this.code.update(start - 2, start, '{ ')
        }
      }
      if (index < size) {
        this.code.update(end, end + 1, ',')
      }
    })
    if (!flag) {
      flag = true
      this.code.update(specifiers[size].end, specifiers[size].end + 2, ' }')
    }
    if (source) {
      this.code.update(source.start - 5, source.end, `from ${source.raw};`)
    }
  }
  generateImportDefaultSpecifier(node: ImportDefaultSpecifier): void {
    const { start, end, local } = node
    if (local.type === NodeType.Identifier) {
      this.generateIdentifier(local)
    }
  }
  generateImportSpecifier(node: ImportSpecifier): void {
    const { start, end, imported, local } = node
    if (imported.name === local.name) {
      this.code.update(start, end, local.name)
    } else {
      this.code.update(start, end, `${imported.name} as ${local.name}`)
    }
  }
  generateImportNamespaceSpecifier(node: ImportNamespaceSpecifier): void {
    const { start, end, local } = node
    this.code.update(start, end, `* as ${local.name}`)
  }
  generateImportDeclaration(node: ImportDeclaration): void {
    const { specifiers = [], source, start } = node
    this.code.update(start, start + 7, 'import ')
    const size = specifiers.length - 1
    // 1. flag true indicates the beginning of the open parenthesis
    // and false indicates the end of the close parenthesis
    let flag = true
    specifiers.forEach((specifier, index) => {
      const { type, start, end } = specifier
      if (type === NodeType.ImportDefaultSpecifier) {
        this.generateImportDefaultSpecifier(specifier)
        // 2. ImportDefaultSpecifier does not require parentheses
        // 3. Close the parenthesis if ImportDefaultSpecifier is encountered
        if (!flag) {
          flag = true
          this.code.update(end - 2, end, ' }')
        }
      }
      // 4. ImportSpecifier need parenthesis
      // 5. The first ImportSpecifier adds an open bracket
      if (type === NodeType.ImportSpecifier) {
        this.generateImportSpecifier(specifier)
        if (flag) {
          flag = false
          this.code.update(start - 2, start, '{ ')
        }
      }
      if (type === NodeType.ImportNamespaceSpecifier) {
        this.generateImportNamespaceSpecifier(specifier)
      }
      if (index < size) {
        this.code.update(end, end + 1, ',')
      }
    })
    // 6. if the specifiers are consumed and flag is false, add an open parenthesis
    if (!flag) {
      flag = true
      this.code.update(specifiers[size].end, specifiers[size].end + 2, ' }')
    }
    if (source) {
      if (size < 0) {
        this.code.update(source.start, source.end, `${source.raw};`)
      } else {
        this.code.update(source.start - 5, source.end, `from ${source.raw};`)
      }
    }
  }
  generateCallExpression(node: CallExpression): void {
    const { start, end } = node
    if (node.callee.type === NodeType.MemberExpression) {
      this.generateMemberExpression(node.callee)
    } else if (node.callee.type === NodeType.Identifier) {
      this.generateIdentifier(node.callee)
    } else if (node.callee.type === NodeType.CallExpression) {
      this.generateCallExpression(node.callee)
    } else if (node.callee.type === NodeType.FunctionExpression) {
      this.code.update(start - 1, start, '(')
      this.generateFunctionExpression(node.callee)
      this.code.update(node.callee.end - 1, node.callee.end, ')')
    }
    if (node.arguments?.length > 0) {
      this.generateFunctionParams(node.arguments)
    } else {
      this.code.update(node.callee.end, node.callee.end + 2, '()')
    }
  }
  generateReturnStatement(node: ReturnStatement): void {
    const { start, end, argument } = node
    if (argument?.type === NodeType.CallExpression) {
      this.code.update(start, start + 7, 'return ')
      this.generateCallExpression(argument)
    } else {
      this.code.update(start, end, 'return')
    }
  }
  generateBlockStatement(node: BlockStatement): void {
    const { start, end, body = [] } = node
    if (body.length > 0) {
      this.code.update(start, start + 1, '{')
      body.forEach((item) => {
        if (item.type === NodeType.ReturnStatement) {
          this.generateReturnStatement(item)
        }
        if (item.type === NodeType.ExpressionStatement) {
          this.generateExpressionStatement(item)
        }
      })
      this.code.update(end - 1, end, '}')
    } else {
      this.code.update(start, end, '{}')
    }
  }
  generateFunctionParams(params: Expression[] | Identifier[] = []): void {
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
    const { start, end, id, params = [], body, async, generator } = node
    if (async) {
      this.code.update(start, start + 14, 'async function')
    } else {
      this.code.update(start, start + 8, 'function')
    }
    if (id) {
      if (generator) {
        this.code.update(id?.start - 1, id?.start, '*')
      }
      this.generateIdentifier(id)
    }
    if (params.length > 0) {
      this.generateFunctionParams(params)
    } else {
      if (id) {
        this.code.update(id.end, id.end + 2, '()')
      } else {
        this.code.update(start + 8, start + 13, '()')
      }
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body)
    }
    this.code.update(end, end + 1, ';')
  }
  generateIdentifier(node: Identifier): void {
    const { start, end, type, name } = node
    this.code.update(start, end, name)
  }
  generateMemberExpression(node: MemberExpression): void {
    const { type, start, end, computed } = node
    if (type === NodeType.MemberExpression) {
      const { object, property } = node
      if (object.type === NodeType.MemberExpression) {
        this.generateMemberExpression(object)
      }
      if (object.type === NodeType.Identifier) {
        this.generateIdentifier(object)
      }
      if (object.type === NodeType.CallExpression) {
        this.generateCallExpression(object)
      }
      if (property?.type === NodeType.Literal) {
        this.code.update(property.start, property.end, property.raw)
      }
      if (property?.type === NodeType.Identifier) {
        this.generateIdentifier(property)
      }
      if (property?.type === NodeType.CallExpression) {
        this.generateCallExpression(property)
      }
      if (property?.type === NodeType.MemberExpression) {
        this.generateMemberExpression(property)
      }
      if (computed && property) {
        this.code.update(property.start - 1, property.start, '[')
        this.code.update(end - 1, end, ']')
      } else {
        this.code.update(start, end, '.', /\s/g)
      }
    }
  }
  generateExpressionStatement(node: ExpressionStatement): void {
    const { type, start, end, expression } = node
    if (expression.type === NodeType.MemberExpression) {
      this.generateMemberExpression(expression)
    }
    if (expression.type === NodeType.Identifier) {
      this.generateIdentifier(expression)
    }
    if (expression.type === NodeType.CallExpression) {
      this.generateCallExpression(expression)
    }
    if (expression.type === NodeType.BinaryExpression) {
      this.generateBinaryExpression(expression)
    }
    if (expression.type === NodeType.UpdateExpression) {
      this.generateUpdateExpression(expression)
    }
    if (expression.type === NodeType.AssignmentExpression) {
      this.generateAssignmentExpression(expression)
    }
    if (this.code.toString().length < end - start) {
      let str = ';'
      while (str.length + this.code.toString().length < end - start) {
        str += ' '
      }
      this.code.update(this.code.toString().length, end, str)
    }
  }
  generateAssignmentExpression(node: AssignmentExpression): void {
    const { left, right, operator } = node
    if (left.type === NodeType.Identifier) {
      this.generateIdentifier(left)
    }
    this.code.addSpaceBothSlide(left.end, right.start - 1, operator)
    if (right.type === NodeType.Identifier) {
      this.generateIdentifier(right)
    }
    if (right.type === NodeType.AssignmentExpression) {
      this.generateAssignmentExpression(right)
    }
    if (right.type === NodeType.FunctionExpression) {
      this.generateFunctionExpression(right)
    }
  }
  generateUpdateExpression(node: UpdateExpression): void {
    const { type, operator, argument, prefix, start, end } = node
    if (argument.type === NodeType.Identifier) {
      this.generateIdentifier(argument)
    }
    if (prefix) {
      this.code.update(start, start + operator.length, operator)
    } else {
      this.code.update(argument.end, argument.end + operator.length, operator)
    }
  }
  generateBinaryExpression(node: BinaryExpression): void {
    const { type, operator, left, right, start, end } = node
    if (left.type === NodeType.Identifier) {
      this.generateIdentifier(left)
    }
    if (right.type === NodeType.Identifier) {
      this.generateIdentifier(right)
    }
    if (right.type === NodeType.Literal) {
      this.code.update(right.start, right.end, right.raw)
    }
    if (right.type === NodeType.CallExpression) {
      this.generateCallExpression(right)
    }
    const distance = right.start - left.end
    let str = `${operator}`
    while (str.length + 2 <= distance) {
      str = ' ' + str + ' '
    }
    while (str.length < distance) {
      str = str + ' '
    }
    this.code.update(left.end, right.start, str)
    this.code.update(end, end + 1, ';')
  }
  generateArrayExpression(node: ArrayExpression): void {
    this.code.update(node.start, node.start + 1, '[')
    const size = node.elements?.length || 0
    node.elements?.forEach((element, index) => {
      const { type } = element
      if (type === NodeType.Literal) {
        this.code.update(element.start, element.end, element.raw)
      }
      if (type === NodeType.ArrayExpression) {
        this.generateArrayExpression(element)
      }
      if (type === NodeType.Identifier) {
        this.code.update(element.start, element.end, element.name)
      }
      if (type === NodeType.ObjectExpression) {
        this.generateObjectExpression(element)
      }
      if (index + 1 < size) {
        this.code.update(element.end, element.end + 1, ',')
      }
    })
    this.code.update(node.end - 1, node.end, ']')
  }
  generateObjectExpression(node: ObjectExpression): void {
    const { properties = [], start, end } = node
    this.code.update(start, start + 1, '{')
    const size = properties.length
    properties.forEach((property, index) => {
      const { start, end, key, value } = property
      if (key?.type === NodeType.Identifier) {
        this.code.update(key.start, key.end, key.name)
        this.code.update(key.end, key.end + 1, ':')
      }
      if (value?.type === NodeType.Literal) {
        this.code.update(value.start, value.end, value.raw)
      }
      if (value?.type === NodeType.Identifier) {
        this.code.update(value.start, value.end, value.name)
      }
      if (value?.type === NodeType.ObjectExpression) {
        this.generateObjectExpression(value)
      }
      if (index + 1 < size) {
        this.code.update(end, end + 1, ',')
      }
    })
    this.code.update(end - 1, end, '}')
  }
  generateArrayPattern(node: ArrayPattern) {
    this.code.update(node.start, node.start + 1, '[')
    const size = node.elements?.length || 0
    node.elements?.forEach((element, index) => {
      const { type } = element
      if (type === NodeType.Identifier) {
        this.code.update(element.start, element.end, element.name)
      }
      if (index + 1 < size) {
        this.code.update(element.end, element.end + 1, ',')
      }
    })
    this.code.update(node.end - 1, node.end, ']')
  }
  generateObjectPattern(node: ObjectPattern) {
    const { properties = [], start, end } = node
    this.code.update(start, start + 1, '{')
    const size = properties.length
    properties.forEach((property, index) => {
      const { start, end, key, value } = property
      if (key?.type === NodeType.Identifier) {
        this.code.update(key.start, key.end, key.name)
        this.code.update(key.end, key.end + 1, ':')
      }
      if (value?.type === NodeType.Literal) {
        this.code.update(value.start, value.end, value.raw)
      }
      if (value?.type === NodeType.Identifier) {
        this.code.update(value.start, value.end, value.name)
      }
      if (value?.type === NodeType.ObjectExpression) {
        this.generateObjectExpression(value)
      }
      if (index + 1 < size) {
        this.code.update(end, end + 1, ',')
      }
    })
    this.code.update(end - 1, end, '}')
  }
  /**
   * @description: Parse literals
   * @param {VariableDeclarator} node
   */
  generateLiteral(node: VariableDeclarator): void {
    const { start, end, id, init } = node
    if (id?.type === NodeType.Identifier) {
      this.code.update(id.start, id.end, id.name)
    }
    if (id?.type === NodeType.ArrayPattern) {
      this.generateArrayPattern(id)
    }
    if (id?.type === NodeType.ObjectPattern) {
      this.generateObjectPattern(id)
    }
    if (init && id) {
      this.code.addSpaceBothSlide(id.end, init?.start, '=')
      if (init.type === NodeType.Literal) {
        this.code.update(init.start, init.end, init.raw)
      }
      if (init.type === NodeType.Identifier) {
        this.code.update(init.start, init.end, init.name)
      }
      if (init.type === NodeType.ArrayExpression) {
        this.generateArrayExpression(init)
      }
      if (init.type === NodeType.ObjectExpression) {
        this.generateObjectExpression(init)
      }
      if (init.type === NodeType.ArrowFunctionExpression) {
        this.generateArrowFunctionExpressionExpression(init)
      }
      if (init.type === NodeType.FunctionExpression) {
        this.generateFunctionExpression(init)
      }
    }
  }
  generateFunctionExpression(node: FunctionExpression): void {
    const { start, end, id, params = [], body, async, generator } = node
    if (async) {
      this.code.update(start, start + 14, 'async function')
    } else {
      this.code.update(start, start + 8, 'function')
    }
    if (id) {
      if (generator) {
        this.code.update(id?.start - 1, id?.start, '*')
      }
      this.generateIdentifier(id)
    }
    if (params.length > 0) {
      this.generateFunctionParams(params)
    } else {
      if (id) {
        this.code.update(id.end, id.end + 2, '()')
      } else {
        this.code.update(start + 8, start + 13, '()')
      }
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body)
    }
    this.code.update(end, end + 1, ';')
  }
  generateArrowFunctionExpressionExpression(
    node: ArrowFunctionExpression | FunctionExpression,
  ): void {
    const { params = [], id, start, end, body, async } = node
    let arrowStart = start
    if (async) {
      this.code.update(start, start + 5, 'async')
      arrowStart += 5
    }
    if (params.length > 0) {
      this.generateFunctionParams(params)
      arrowStart = params[params.length - 1].end + 1
    } else {
      this.code.update(arrowStart, arrowStart + 2, '()')
      arrowStart += 2
    }
    const arrowEnd = body.start
    this.code.addSpaceBothSlide(arrowStart, arrowEnd, '=>')
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body)
    }
  }
  /**
   * @description: Analytic variable declaration
   * @param {VariableDeclaration} node
   */
  generateVariableDeclaration(node: VariableDeclaration): void {
    const { start, declarations, kind, end } = node
    this.code.update(start, start + kind.length, kind)
    this.code.update(end, end + 1, ';')
    declarations.forEach((declaration) => {
      const { type } = declaration
      if (type === NodeType.VariableDeclarator) {
        return this.generateLiteral(declaration)
      }
    })
  }
  generateForInStatement(node: ForInStatement): void {
    const { type, left, right, body, start, end } = node
    this.code.update(start, start + 4, 'for(')
    if (type === NodeType.ForInStatement) {
      const { declarations = [] } = left
      this.code.update(left.start, left.start + left.kind.length, left.kind)
      declarations.forEach((item: VariableDeclarator) => {
        if (item.type === NodeType.VariableDeclarator) {
          this.generateLiteral(item)
        }
      })
      this.code.update(left.end, left.end + 4, ' in ')
      if (right?.type === NodeType.Identifier) {
        this.generateIdentifier(right)
        this.code.update(right.end, right.end + 1, ')')
      }
      if (body.type === NodeType.BlockStatement) {
        this.generateBlockStatement(body)
      }
    }
  }
  generateForStatement(node: ForStatement): void {
    const { type, init, update, test, body, start, end } = node
    this.code.update(start, start + 4, 'for(')
    if (init.type === NodeType.VariableDeclaration) {
      this.generateVariableDeclaration(init)
    }
    if (update?.type === NodeType.ExpressionStatement) {
      this.generateExpressionStatement(update)
      this.code.update(update.end, update.end + 1, ')')
    }
    if (test?.type === NodeType.ExpressionStatement) {
      this.generateExpressionStatement(test)
      this.code.update(test.end, test.end + 1, ';')
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body)
    }
  }
  generateSwitchStatement(node: SwitchStatement): void {
    const { start, end, type, discriminant, cases = [] } = node
    this.code.update(start, start + 6, 'switch')
    this.code.update(discriminant.start - 1, discriminant.start, '(')
    if (discriminant.type === NodeType.Identifier) {
      this.generateIdentifier(discriminant)
    }
    this.code.update(discriminant.end, discriminant.end + 2, '){')
    cases.forEach((item) => {
      const { type, start, end, test, consequent = [] } = item
      if (test?.type === NodeType.Literal) {
        this.code.update(start, start + 4, 'case')
        this.code.update(test.start, test.end, test.raw)
        this.code.update(test.end, test.end + 1, ':')
      } else {
        this.code.update(start, start + 8, 'default:')
      }
      consequent.forEach((exp) => {
        if (exp.type === NodeType.ExpressionStatement) {
          this.generateExpressionStatement(exp)
        }
      })
      this.code.update(end, end + 1, ';')
    })
    this.code.update(end - 1, end, '}')
  }
  generateIfStatement(node: IfStatement): void {
    const { start, end, test, consequent, alternate } = node
    this.code.update(start, start + 2, 'if')
    this.code.update(test.start - 1, test.start, '(')
    if (test.type === NodeType.Identifier) {
      this.generateIdentifier(test)
    }
    this.code.update(test.end, test.end + 1, ')')
    if (consequent.type === NodeType.ExpressionStatement) {
      this.generateExpressionStatement(consequent)
    }
    if (consequent.type === NodeType.BlockStatement) {
      this.generateBlockStatement(consequent)
    }
  }
  generateForOfStatement(node: ForOfStatement): void {
    const { type, left, right, body, start, end } = node
    this.code.update(start, start + 4, 'for(')
    if (type === NodeType.ForOfStatement) {
      const { declarations = [] } = left
      this.code.update(left.start, left.start + left.kind.length, left.kind)
      declarations.forEach((item: VariableDeclarator) => {
        if (item.type === NodeType.VariableDeclarator) {
          this.generateLiteral(item)
        }
      })
      this.code.update(left.end, left.end + 4, ' of ')
      if (right?.type === NodeType.Identifier) {
        this.generateIdentifier(right)
        this.code.update(right.end, right.end + 1, ')')
      }
      if (body.type === NodeType.BlockStatement) {
        this.generateBlockStatement(body)
      }
    }
  }
  generateLabeledStatement(node: LabeledStatement): void {
    const { type, label, body, start, end } = node
    if (label.type === NodeType.Identifier) {
      this.code.update(label.start, label.end, label.name)
      this.code.update(label.end, label.end + 1, ':')
    }
    this.generateExpressionStatement(body)
  }
  render(): string {
    const nodes = this.ast.body
    nodes.forEach((node) => {
      const { type } = node
      if (type === NodeType.VariableDeclaration) {
        return this.generateVariableDeclaration(node)
      }
      if (type === NodeType.FunctionDeclaration) {
        return this.generateFunctionDeclaration(node)
      }
      if (type === NodeType.ImportDeclaration) {
        return this.generateImportDeclaration(node)
      }
      if (type === NodeType.ExportNamedDeclaration) {
        return this.generateExportNamedDeclaration(node)
      }
      if (type === NodeType.ExportAllDeclaration) {
        return this.generateExportAllDeclaration(node)
      }
      if (type === NodeType.ExportDefaultDeclaration) {
        return this.generateExportDefaultDeclaration(node)
      }
      if (type === NodeType.ExpressionStatement) {
        return this.generateExpressionStatement(node)
      }
      if (type === NodeType.BlockStatement) {
        return this.generateBlockStatement(node)
      }
      if (type === NodeType.ForInStatement) {
        return this.generateForInStatement(node)
      }
      if (type === NodeType.ForOfStatement) {
        return this.generateForOfStatement(node)
      }
      if (type === NodeType.ForStatement) {
        return this.generateForStatement(node)
      }
      if (type === NodeType.SwitchStatement) {
        return this.generateSwitchStatement(node)
      }
      if (type === NodeType.IfStatement) {
        return this.generateIfStatement(node)
      }
      if (type === NodeType.ReturnStatement) {
        return this.generateReturnStatement(node)
      }
      if (type === NodeType.LabeledStatement) {
        return this.generateLabeledStatement(node)
      }
    })
    return this.code.toString()
  }
}
