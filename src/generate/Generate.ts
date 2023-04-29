import type {
  ArrayExpression,
  BlockStatement,
  CallExpression,
  ExportAllDeclaration,
  ExportDefaultDeclaration,
  ExportNamedDeclaration,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  ObjectExpression,
  Program,
  ReturnStatement,
  VariableDeclaration,
  VariableDeclarator
} from '@/ast/nodeTypes'
import { NodeType } from '@/ast/nodeTypes'
import { RanString } from '@/utils/RanString'

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
    const { start, end, body = [] } = node
    if (body.length > 0) {
      body.forEach((item) => {
        if (item.type === NodeType.ReturnStatement) {
          this.code.update(start - 1, start, '{')
          this.code.update(end, end - 1, '}')
          this.generateReturnStatement(item)
        }
      })
    } else {
      this.code.update(start, end, ' {}')
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
    const { start, end, id, params = [], body } = node
    this.code.update(start, start + 8, 'function')
    if (id) {
      this.generateIdentifier(id)
    }
    if (params.length > 0) {
      this.generateFunctionParams(params)
    } else {
      this.code.update(start + 8, start + 13, '()')
    }
    if (body.type === NodeType.BlockStatement) {
      this.generateBlockStatement(body)
    }
  }
  generateIdentifier(node: Identifier): void {
    const { start, end, type, name } = node
    this.code.update(start, end, name)
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
      if (property?.type === NodeType.Identifier) {
        this.generateIdentifier(property)
      }
      this.code.update(start, end, '.', /\s/g)
    }
  }
  generateExpressionStatement(node: ExpressionStatement): void {
    const { type, start, end, expression } = node
    this.generateMemberExpression(expression)
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
  /**
   * @description: Parse literals
   * @param {VariableDeclarator} node
   */
  generateLiteral(node: VariableDeclarator): void {
    const { start, end, id, init } = node
    if (id?.type === NodeType.Identifier) {
      this.code.update(id.start, id.end, `${id.name} = `)
    }
    if (init) {
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
    }
  }
  /**
   * @description: Analytic variable declaration
   * @param {VariableDeclaration} node
   */
  generateVariableDeclaration(node: VariableDeclaration): void {
    const { start, declarations, kind, end } = node
    this.code.update(start, kind.length, kind)
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
        return this.generateVariableDeclaration(node)
      }
      if (type === NodeType.ExpressionStatement) {
        return this.generateExpressionStatement(node)
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
    })
    return this.code.toString()
  }
}
