import type { Token } from '@/parser/Tokenizer'
import { TokenType } from '@/parser/Tokenizer'
import type {
  ArrayExpression,
  ArrayPattern,
  ArrowFunctionExpression,
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  CallExpression,
  ConditionalExpression,
  ExportDeclaration,
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
  ImportSpecifiers,
  LabeledStatement,
  Literal,
  MemberExpression,
  ObjectExpression,
  ObjectPattern,
  Program,
  Property,
  ReturnStatement,
  Statement,
  SwitchCase,
  SwitchStatement,
  UpdateExpression,
  VariableDeclaration,
  VariableDeclarator,
  VariableKind,
} from '@/ast/NodeType'
import { FunctionType, NodeType } from '@/ast/NodeType'

/**
 * @description: parser
 * After resolving the lexical token, we can proceed to the parsing phase.
 * At this stage, we go through the tokens in turn, analyzing the code at the syntactic structure level, with the final goal of generating AST data structures.
 * The AST structure can be viewed at https://astexplorer.net/
 */
export class Parser {
  private _tokens: Token[] = []
  private _currentIndex = 0
  constructor(token: Token[]) {
    this._tokens = [...token]
  }

  parse(): Program {
    return this._parseProgram()
  }
  /**
   * @description: Parse the core logic that generates the AST
   * A Program is actually made up of statements
   * Therefore, in the _parseProgram logic, you need to scan statements and put them into the body of the Program object.
   */
  private _parseProgram(): Program {
    const program: Program = {
      type: NodeType.Program,
      body: [],
      start: 0,
      end: Infinity,
    }
    while (!this._isEnd()) {
      const node = this._parseStatement()
      program.body.push(node)
      if (this._isEnd()) {
        program.end = node.end
      }
    }
    return program
  }
  /**
   * @description: Different token types have different parsing logic
   * @return {Statement}
   */
  private _parseStatement(): Statement {
    // TokenType comes from the implementation of Tokenizer
    if (this._isFunctionDeclaration()) return this._parseFunctionDeclaration()
    if (this._checkCurrentTokenType(TokenType.Switch))
      return this._parseSwitchStatement()
    if (this._checkCurrentTokenType(TokenType.If))
      return this._parseIfStatement()
    if (this._checkCurrentTokenType(TokenType.For))
      return this._parseForStatement()
    if (
      this._checkCurrentTokenType([
        TokenType.Identifier,
        TokenType.UpdateOperator,
        TokenType.BinaryOperator,
        TokenType.LeftParen,
        TokenType.QuestionOperator,
      ])
    )
      return this._parseExpressionStatement()
    if (this._checkCurrentTokenType(TokenType.LeftCurly))
      return this._parseBlockStatement()
    if (this._checkCurrentTokenType(TokenType.Return))
      return this._parseReturnStatement()
    if (this._checkCurrentTokenType(TokenType.Import))
      return this._parseImportDeclaration()
    if (this._checkCurrentTokenType(TokenType.Export))
      return this._parseExportDeclaration()
    if (
      this._checkCurrentTokenType([
        TokenType.Let,
        TokenType.Var,
        TokenType.Const,
      ])
    )
      return this._parseVariableDeclaration()
    console.log('Unexpected token:', this._getCurrentToken())
    throw new Error('Unexpected token')
  }
  private _isFunctionDeclaration() {
    const token = this._getCurrentToken()
    const isAsyncFunction =
      token.value === 'async' && token.type === TokenType.Identifier
    return this._checkCurrentTokenType(TokenType.Function) || isAsyncFunction
  }
  private _parseIfStatement(): IfStatement {
    const { start } = this._getCurrentToken()
    this._goNext(TokenType.If)
    this._goNext(TokenType.LeftParen)
    const test = this._parseExpression()
    this._goNext(TokenType.RightParen)
    let consequent = null
    if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      consequent = this._parseBlockStatement()
    } else {
      consequent = this._parseStatement()
    }
    const ifStatement: IfStatement = {
      type: NodeType.IfStatement,
      start,
      end: consequent.end,
      test,
      consequent,
      alternate: null,
    }
    return ifStatement
  }
  private _parseSwitchStatement(): SwitchStatement {
    const { start } = this._getCurrentToken()
    this._goNext(TokenType.Switch)
    this._goNext(TokenType.LeftParen)
    const discriminant = this._parseExpression()
    this._goNext(TokenType.RightParen)
    this._goNext(TokenType.LeftCurly)
    const cases = []
    while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
      let test = null
      let end = Infinity
      const consequent = []
      const { start } = this._getCurrentToken()
      if (this._checkCurrentTokenType(TokenType.Case)) {
        this._goNext(TokenType.Case)
        test = this._parseExpression()
      } else {
        this._goNext(TokenType.Default)
        end = this._getCurrentToken().end
      }
      this._goNext(TokenType.Colon)
      while (
        !this._checkCurrentTokenType([
          TokenType.Case,
          TokenType.Default,
          TokenType.Semicolon,
        ])
      ) {
        const caseStatement = this._parseStatement()
        end = caseStatement.end
        consequent.push(caseStatement)
      }
      const switchCase: SwitchCase = {
        type: NodeType.SwitchCase,
        start,
        end,
        test,
        consequent,
      }
      cases.push(switchCase)
      this._skipSemicolon()
    }
    const { end } = this._getCurrentToken()
    this._goNext(TokenType.RightCurly)
    const switchStatement: SwitchStatement = {
      type: NodeType.SwitchStatement,
      start,
      end,
      discriminant,
      cases,
    }
    return switchStatement
  }
  private _parseForStatement(): ForStatement | ForInStatement | ForOfStatement {
    const { start } = this._getCurrentToken()
    let test: ExpressionStatement, update: ExpressionStatement, right, type
    this._goNext(TokenType.For)
    this._goNext(TokenType.LeftParen)
    const init: VariableDeclaration = this._parseVariableDeclaration()
    if (init?.declarations.length > 0 && init?.declarations[0].init) {
      test = this._parseExpressionStatement()
      this._skipSemicolon()
      update = this._parseExpressionStatement()
    } else if (this._checkCurrentTokenType(TokenType.BinaryOperator)) {
      const token = this._getCurrentToken()
      if (token.value === 'in') {
        type = NodeType.ForInStatement
      } else if (token.value === 'of') {
        type = NodeType.ForOfStatement
      } else {
        type = NodeType.ForStatement
      }
      this._goNext(TokenType.BinaryOperator)
      right = this._parseIdentifier()
    }
    this._goNext(TokenType.RightParen)
    const body = this._parseBlockStatement()
    if (type === NodeType.ForInStatement) {
      const forInStatement: ForInStatement = {
        type: NodeType.ForInStatement,
        start,
        end: body.end,
        right,
        left: init,
        body,
      }
      return forInStatement
    }
    if (type === NodeType.ForOfStatement) {
      const forOfStatement: ForOfStatement = {
        type: NodeType.ForOfStatement,
        start,
        end: body.end,
        right,
        left: init,
        body,
      }
      return forOfStatement
    }
    const forStatement: ForStatement = {
      type: NodeType.ForStatement,
      start,
      end: body.end,
      init,
      test: test!,
      update: update!,
      body,
    }
    return forStatement
  }
  private _parseObjectExpression(): ObjectExpression {
    const { start } = this._getCurrentToken()
    const properties: Property[] = []
    const objectExpression: ObjectExpression = {
      type: NodeType.ObjectExpression,
      properties,
      start,
      end: Infinity,
    }
    // Consumption "{"
    this._goNext(TokenType.LeftCurly)
    while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        // analyze ,
        this._goNext(TokenType.Comma)
      }
      // Recursive call to the Statement in the body of the _parseStatement parse function
      const node = this._parseProperty()
      properties.push(node)
    }
    objectExpression.end = this._getCurrentToken().end
    // Consumption "}"
    this._goNext(TokenType.RightCurly)
    return objectExpression
  }
  private _parseObjectPattern(): ObjectPattern {
    const { start } = this._getCurrentToken()
    const properties: Property[] = []
    const objectPattern: ObjectPattern = {
      type: NodeType.ObjectPattern,
      properties,
      start,
      end: Infinity,
    }
    // Consumption "{"
    this._goNext(TokenType.LeftCurly)
    while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        // analyze ,
        this._goNext(TokenType.Comma)
      }
      // Recursive call to the Statement in the body of the _parseStatement parse function
      const node = this._parseProperty()
      properties.push(node)
    }
    objectPattern.end = this._getCurrentToken().end
    // Consumption "}"
    this._goNext(TokenType.RightCurly)
    return objectPattern
  }
  private _parseProperty(): Property {
    const { start } = this._getCurrentToken()
    const property: Property = {
      start,
      end: Infinity,
      type: NodeType.Property,
      kind: 'init',
      key: null,
      value: null,
    }
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      property.key = this._parseIdentifier()
    }
    if (this._checkCurrentTokenType(TokenType.Colon)) {
      // analyze :
      this._goNext(TokenType.Colon)
    }
    if (
      this._checkCurrentTokenType([TokenType.Number, TokenType.StringLiteral])
    ) {
      property.value = this._parseLiteral()
    }
    if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      property.value = this._parseObjectExpression()
    }
    if (!property.value) {
      property.value = property.key
    }
    if (property.value) {
      property.end = property.value.end
    }
    return property
  }
  private _parseArrayExpression(): ArrayExpression {
    const { start } = this._getCurrentToken()
    const elements: Expression[] = []
    const arrayExpression: ArrayExpression = {
      type: NodeType.ArrayExpression,
      elements,
      start,
      end: Infinity,
    }
    // Consumption "{"
    this._goNext(TokenType.LeftBracket)
    while (!this._checkCurrentTokenType(TokenType.RightBracket)) {
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        // analyze ,
        this._goNext(TokenType.Comma)
      }
      // Recursive call to the Statement in the body of the _parseStatement parse function
      const node = this._parseExpression()
      elements.push(node)
    }
    arrayExpression.end = this._getCurrentToken().end
    // Consumption "]"
    this._goNext(TokenType.RightBracket)
    return arrayExpression
  }
  private _parseArrayPattern(): ArrayPattern {
    const { start } = this._getCurrentToken()
    const elements: Identifier[] = []
    const arrayPattern: ArrayPattern = {
      type: NodeType.ArrayPattern,
      elements,
      start,
      end: Infinity,
    }
    // Consumption "{"
    this._goNext(TokenType.LeftBracket)
    while (!this._checkCurrentTokenType(TokenType.RightBracket)) {
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        // analyze ,
        this._goNext(TokenType.Comma)
      }
      // Recursive call to the Statement in the body of the _parseStatement parse function
      const node = this._parseIdentifier()
      elements.push(node)
    }
    arrayPattern.end = this._getCurrentToken().end
    // Consumption "]"
    this._goNext(TokenType.RightBracket)
    return arrayPattern
  }
  /**
   * @description: Parse import declaration
   * @return {ImportDeclaration}
   */
  private _parseImportDeclaration(): ImportDeclaration {
    const { start } = this._getCurrentToken()
    const specifiers: ImportSpecifiers = []
    this._goNext(TokenType.Import)
    // import a
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      const local = this._parseIdentifier()
      const defaultSpecifier: ImportDefaultSpecifier = {
        type: NodeType.ImportDefaultSpecifier,
        local,
        start: local.start,
        end: local.end,
      }
      specifiers.push(defaultSpecifier)
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        this._goNext(TokenType.Comma)
      }
    }
    // import { name1 }
    if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      this._goNext(TokenType.LeftCurly)
      while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
        const specifier = this._parseIdentifier()
        let local = null
        if (this._checkCurrentTokenType(TokenType.As)) {
          this._goNext(TokenType.As)
          local = this._parseIdentifier()
        }
        const importSpecifier: ImportSpecifier = {
          type: NodeType.ImportSpecifier,
          imported: specifier,
          local: local ? local : specifier,
          start: specifier.start,
          end: local ? local.end : specifier.end,
        }
        specifiers.push(importSpecifier)
        if (this._checkCurrentTokenType(TokenType.Comma)) {
          this._goNext(TokenType.Comma)
        }
      }
      this._goNext(TokenType.RightCurly)
    }
    // import * as a
    else if (this._checkCurrentTokenType(TokenType.Asterisk)) {
      const { start } = this._getCurrentToken()
      this._goNext(TokenType.Asterisk)
      this._goNext(TokenType.As)
      const local = this._parseIdentifier()
      const importNamespaceSpecifier: ImportNamespaceSpecifier = {
        type: NodeType.ImportNamespaceSpecifier,
        local,
        start,
        end: local.end,
      }
      specifiers.push(importNamespaceSpecifier)
    }

    // from 'a'
    if (this._checkCurrentTokenType(TokenType.From)) {
      this._goNext(TokenType.From)
    }
    const source = this._parseLiteral()
    const node: ImportDeclaration = {
      type: NodeType.ImportDeclaration,
      specifiers: specifiers as ImportSpecifiers,
      start,
      end: source.end,
      source,
    }
    this._skipSemicolon()
    return node
  }
  /**
   * @description: Parse export declaration
   * @return {ExportDeclaration}
   */
  private _parseExportDeclaration(): ExportDeclaration {
    const { start } = this._getCurrentToken()
    let exportDeclaration: ExportDeclaration | undefined
    const specifiers: ExportSpecifier[] = []
    this._goNext(TokenType.Export)
    // export default
    if (this._checkCurrentTokenType(TokenType.Default)) {
      this._goNext(TokenType.Default)
      // export default a
      // export default obj.a
      if (this._checkCurrentTokenType(TokenType.Identifier)) {
        const local = this._parseExpression()
        exportDeclaration = {
          type: NodeType.ExportDefaultDeclaration,
          declaration: local,
          start: local.start,
          end: local.end,
        }
      }
      // export default function() {}
      if (this._checkCurrentTokenType(TokenType.Function)) {
        const declaration = this._parseFunctionDeclaration()
        exportDeclaration = {
          type: NodeType.ExportDefaultDeclaration,
          declaration,
          start,
          end: declaration.end,
        }
      }
      // export default class {}
      // TODO: export default { a: 1 };
    }
    // export {
    else if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      this._goNext(TokenType.LeftCurly)
      while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
        const local = this._parseIdentifier()
        let exported = local
        if (this._checkCurrentTokenType(TokenType.As)) {
          this._goNext(TokenType.As)
          exported = this._parseIdentifier()
        }
        const exportSpecifier: ExportSpecifier = {
          type: NodeType.ExportSpecifier,
          local,
          exported,
          start: local.start,
          end: exported.end,
        }
        specifiers.push(exportSpecifier)
        if (this._checkCurrentTokenType(TokenType.Comma)) {
          this._goNext(TokenType.Comma)
        }
      }
      this._goNext(TokenType.RightCurly)
      if (this._checkCurrentTokenType(TokenType.From)) {
        this._goNext(TokenType.From)
      }
      const source = this._parseLiteral()
      exportDeclaration = {
        type: NodeType.ExportNamedDeclaration,
        specifiers,
        start,
        declaration: null,
        end: source.end,
        source,
      }
    }
    // export const/let/var
    else if (
      this._checkCurrentTokenType([
        TokenType.Const,
        TokenType.Let,
        TokenType.Var,
      ])
    ) {
      const declaration = this._parseVariableDeclaration()
      exportDeclaration = {
        type: NodeType.ExportNamedDeclaration,
        declaration,
        start,
        end: declaration.end,
        specifiers: specifiers as ExportSpecifier[],
        source: null,
      }
      return exportDeclaration
    }
    // export function
    else if (this._checkCurrentTokenType(TokenType.Function)) {
      const declaration =
        this._parseFunctionDeclaration() as FunctionDeclaration
      exportDeclaration = {
        type: NodeType.ExportNamedDeclaration,
        declaration,
        start,
        end: declaration.end,
        specifiers: specifiers as ExportSpecifier[],
        source: null,
      }
    }
    // export * from 'mod'
    else {
      this._goNext(TokenType.Asterisk)
      let exported: Identifier | null = null
      if (this._checkCurrentTokenType(TokenType.As)) {
        this._goNext(TokenType.As)
        exported = this._parseIdentifier()
      }
      this._goNext(TokenType.From)
      const source = this._parseLiteral()
      exportDeclaration = {
        type: NodeType.ExportAllDeclaration,
        start,
        end: source.end,
        source,
        exported,
      }
    }
    if (!exportDeclaration) {
      throw new Error('Export declaration cannot be parsed')
    }
    this._skipSemicolon()
    return exportDeclaration!
  }
  /**
   * @description: Parse the declaration of a variable
   * Find the token corresponding to the let keyword and go to _parseVariableDeclaration
   * Parse variable names, such as foo in the sample code
   * Parse function expressions, such as function() {} in the sample code
   * We use the _parseIdentifier method to resolve variable names, and _parseFunctionExpression to resolve function expressions
   * @return {VariableDeclaration}
   */
  private _parseVariableDeclaration(): VariableDeclaration {
    // Gets the statement start location
    const { start } = this._getCurrentToken()
    // Get the let
    const kind = this._getCurrentToken().value
    this._goNext([TokenType.Let, TokenType.Var, TokenType.Const])
    const declarations = []
    let init = null
    let id = null
    const isVariableDeclarationEnded = (): boolean => {
      const currentToken = this._getCurrentToken()
      // Looking back at a token, if it is =, it means there is no end
      if (currentToken && currentToken.type === TokenType.Assign) {
        return false
      }
      if (currentToken && currentToken.type === TokenType.LeftBracket) {
        return false
      }
      if (currentToken && currentToken.type === TokenType.LeftCurly) {
        return false
      }
      if (currentToken && currentToken.type === TokenType.Identifier) {
        return false
      }
      if (currentToken && currentToken.type === TokenType.Number) {
        return false
      }
      if (currentToken && currentToken.type === TokenType.StringLiteral) {
        return false
      }
      if (currentToken && currentToken.type === TokenType.Comma) {
        return false
      }
      return true
    }
    while (!isVariableDeclarationEnded()) {
      const token = this._getCurrentToken()
      // Parse the variable name foo
      if (
        this._checkCurrentTokenType(TokenType.Identifier) &&
        token.value !== 'async'
      ) {
        id = this._parseIdentifier()
      }
      if (this._checkCurrentTokenType(TokenType.LeftBracket)) {
        id = this._parseArrayPattern()
      }
      if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
        id = this._parseObjectPattern()
      }
      if (this._checkCurrentTokenType(TokenType.Assign)) {
        this._goNext(TokenType.Assign)
      }
      if (
        this._checkCurrentTokenType([TokenType.Number, TokenType.StringLiteral])
      ) {
        init = this._parseLiteral()
      } else {
        init = this._parseExpression()
      }
      const declarator: VariableDeclarator = {
        type: NodeType.VariableDeclarator,
        id,
        init,
        start: id!.start,
        end: init ? init.end : id!.end,
      }
      declarations.push(declarator)
      if (this._checkCurrentTokenType(TokenType.Comma)) {
        this._goNext(TokenType.Comma)
      }
    }
    // Construct Declaration node
    const node: VariableDeclaration = {
      type: NodeType.VariableDeclaration,
      kind: kind as VariableKind,
      declarations,
      start,
      end: this._getPreviousToken().end,
    }
    this._skipSemicolon()
    return node
  }

  private _parseReturnStatement(): ReturnStatement {
    const { start, end } = this._getCurrentToken()
    this._goNext(TokenType.Return)
    let argument = null
    if (!this._checkCurrentTokenType(TokenType.Semicolon)) {
      argument = this._parseExpression()
    }
    const node: ReturnStatement = {
      type: NodeType.ReturnStatement,
      argument,
      start,
      end: argument ? argument.end : end,
    }
    this._skipSemicolon()
    return node
  }
  private _parseArrowFunctionExpression(): ArrowFunctionExpression {
    const { start } = this._getCurrentToken()
    let async = false
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      const { value } = this._getCurrentToken()
      if (value === 'async') {
        async = true
      }
      this._goNext(TokenType.Identifier)
    }
    const params = this._parseParams()
    this._goNext(TokenType.ArrowOperator)
    // this._goNext(TokenType.)
    const body = this._parseBlockStatement()
    const node: ArrowFunctionExpression = {
      type: NodeType.ArrowFunctionExpression,
      id: null,
      params,
      async,
      generator: false,
      body,
      start,
      end: body.end,
    }
    return node
  }
  private _parseExpressionStatement(): ExpressionStatement {
    const expression = this._parseExpression()
    const expressionStatement: ExpressionStatement = {
      type: NodeType.ExpressionStatement,
      expression,
      start: expression.start,
      end: expression.end,
    }
    this._skipSemicolon()
    return expressionStatement
  }
  private _parseConditionalExpression(
    expression: Expression,
  ): ConditionalExpression {
    const { start } = expression
    this._goNext(TokenType.QuestionOperator)
    const consequent = this._parseIdentifier()
    this._goNext(TokenType.Colon)
    const alternate = this._parseIdentifier()
    const conditionalExpression: ConditionalExpression = {
      type: NodeType.ConditionalExpression,
      start,
      end: alternate.end,
      test: expression,
      consequent,
      alternate,
    }
    return conditionalExpression
  }
  // Parse the a.b.c nested structure of the object
  private _parseExpression(): Expression {
    const token = this._getCurrentToken()
    // Check to see if it is a function expression
    if (
      this._checkCurrentTokenType(TokenType.Function) ||
      (token.type === TokenType.Identifier && token.value === 'async')
    ) {
      // Analytic function expression
      return this._parseFunctionExpression()
    }
    if (this._checkCurrentTokenType(TokenType.LeftBracket)) {
      // Analytic array expression
      return this._parseArrayExpression()
    }
    if (this._checkCurrentTokenType(TokenType.LeftCurly)) {
      // Analytic object expression
      return this._parseObjectExpression()
    }
    if (
      this._checkCurrentTokenType(TokenType.LeftParen) ||
      (token.type === TokenType.Identifier && token.value === 'async')
    ) {
      return this._parseArrowFunctionExpression()
    }
    if (
      this._checkCurrentTokenType([TokenType.Number, TokenType.StringLiteral])
    ) {
      return this._parseLiteral()
    }
    if (this._checkCurrentTokenType(TokenType.UpdateOperator)) {
      // analyze ++i
      return this._parseUpdateOperatorExpression()
    }
    // Get an identifier, such as a
    let expression: Expression | null = null
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      expression = this._parseIdentifier()
    }
    while (!this._isEnd()) {
      if (expression && this._checkCurrentTokenType(TokenType.LeftParen)) {
        expression = this._parseCallExpression(expression)
      } else if (
        this._checkCurrentTokenType([TokenType.Dot, TokenType.LeftBracket])
      ) {
        // Continue to analyze, a.b
        expression = this._parseMemberExpression(expression as MemberExpression)
      } else if (
        expression &&
        this._checkCurrentTokenType(TokenType.BinaryOperator)
      ) {
        // analyze a + b
        expression = this._parseBinaryOperatorExpression(expression)
      } else if (expression && this._checkCurrentTokenType(TokenType.Assign)) {
        // analyze a = b
        expression = this._parseAssignmentExpressionExpression(expression)
      } else if (
        this._checkCurrentTokenType(TokenType.QuestionOperator) &&
        expression
      ) {
        expression = this._parseConditionalExpression(expression)
      } else if (
        expression &&
        this._checkCurrentTokenType(TokenType.UpdateOperator)
      ) {
        // analyze i++
        expression = this._parseUpdateOperatorExpression(expression)
      } else if (
        this._checkCurrentTokenType(TokenType.Colon) &&
        expression?.type === NodeType.Identifier
      ) {
        expression = this._parseLabeledStatement(expression)
      } else {
        break
      }
    }
    return expression!
  }
  private _parseLabeledStatement(expression: Identifier): LabeledStatement {
    const { start } = expression
    this._goNext(TokenType.Colon)
    const body = this._parseExpressionStatement()
    const labeledStatement: LabeledStatement = {
      type: NodeType.LabeledStatement,
      label: expression,
      start,
      end: body.end,
      body,
    }
    return labeledStatement
  }
  private _parseAssignmentExpressionExpression(
    expression: Expression,
  ): AssignmentExpression {
    const { start } = this._getCurrentToken()
    const operator = this._getCurrentToken().value!
    if (this._checkCurrentTokenType(TokenType.Assign)) {
      this._goNext(TokenType.Assign)
    }
    const right = this._parseExpression()
    const node: AssignmentExpression = {
      type: NodeType.AssignmentExpression,
      operator,
      left: expression,
      right,
      start,
      end: right.end,
    }
    this._skipSemicolon()
    return node
  }
  private _parseUpdateOperatorExpression(
    expression?: Expression,
  ): UpdateExpression {
    const { value, start, end } = this._getCurrentToken()
    this._goNext(TokenType.UpdateOperator)
    if (expression) {
      const node: UpdateExpression = {
        type: NodeType.UpdateExpression,
        operator: value!,
        argument: expression,
        prefix: false,
        start: expression.start,
        end,
      }
      return node
    } else {
      const argument = this._parseIdentifier()
      const node: UpdateExpression = {
        type: NodeType.UpdateExpression,
        operator: value!,
        argument,
        prefix: true,
        start: start,
        end: argument.end,
      }
      return node
    }
  }
  private _parseBinaryOperatorExpression(
    expression: Expression,
  ): BinaryExpression {
    const { start } = this._getCurrentToken()
    const operator = this._getCurrentToken().value!
    if (this._checkCurrentTokenType(TokenType.BinaryOperator)) {
      this._goNext(TokenType.BinaryOperator)
    } else if (this._checkCurrentTokenType(TokenType.Assign)) {
      this._goNext(TokenType.Assign)
    } else if (this._checkCurrentTokenType(TokenType.Colon)) {
      this._goNext(TokenType.Colon)
    }
    const right = this._parseExpression()
    const node: BinaryExpression = {
      type: NodeType.BinaryExpression,
      operator,
      left: expression,
      right,
      start,
      end: right.end,
    }
    this._skipSemicolon()
    return node
  }

  private _parseMemberExpression(
    object: Identifier | MemberExpression,
  ): MemberExpression {
    const node: MemberExpression = {
      type: NodeType.MemberExpression,
      object,
      property: undefined,
      start: object.start,
      end: Infinity,
      computed: false,
    }
    if (this._checkCurrentTokenType(TokenType.Dot)) {
      this._goNext(TokenType.Dot)
      node.property = this._parseIdentifier()
      node.end = node.property.end
      node.computed = false
    }
    if (this._checkCurrentTokenType(TokenType.LeftBracket)) {
      node.computed = true
      this._goNext(TokenType.LeftBracket)
      while (!this._checkCurrentTokenType(TokenType.RightBracket)) {
        // Recursive call to the Statement in the body of the _parseStatement parse function
        node.property = this._parseExpression()
        node.end = node.property.end
      }
      this._goNext(TokenType.RightBracket)
    }
    this._skipSemicolon()
    return node
  }

  private _parseCallExpression(callee: Expression) {
    const args = this._parseParams(FunctionType.CallExpression) as Expression[]
    // Gets the end position of the last character
    const { end } = this._getPreviousToken()
    const node: CallExpression = {
      type: NodeType.CallExpression,
      callee,
      arguments: args,
      start: callee.start,
      end,
    }
    this._skipSemicolon()
    return node
  }

  private _parseFunctionDeclaration(): FunctionDeclaration {
    const { start, value } = this._getCurrentToken()
    let async = false
    if (
      this._checkCurrentTokenType(TokenType.Identifier) &&
      value === 'async'
    ) {
      async = true
      this._goNext(TokenType.Identifier)
    }
    this._goNext(TokenType.Function)
    let id = null
    let generator = false
    if (this._checkCurrentTokenType(TokenType.Asterisk)) {
      generator = true
      this._goNext(TokenType.Asterisk)
    }
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      id = this._parseIdentifier()
    }
    const params = this._parseParams()
    const body = this._parseBlockStatement()
    const node: FunctionDeclaration = {
      type: NodeType.FunctionDeclaration,
      id,
      async,
      generator,
      params,
      body,
      start,
      end: body.end,
    }
    return node
  }
  /**
   * @description: Analytic function expression
   * @return {FunctionExpression}
   */
  private _parseFunctionExpression(): FunctionExpression {
    const { start, value, type } = this._getCurrentToken()
    let async = false
    if (type === TokenType.Identifier && value === 'async') {
      this._goNext(TokenType.Identifier)
      async = true
    }
    let id = null
    let generator = false
    let nodeType = NodeType.FunctionExpression
    if (this._checkCurrentTokenType(TokenType.Function)) {
      this._goNext(TokenType.Function)
      if (this._checkCurrentTokenType(TokenType.Asterisk)) {
        generator = true
        this._goNext(TokenType.Asterisk)
      }
      if (this._checkCurrentTokenType(TokenType.Identifier)) {
        id = this._parseIdentifier()
      }
    } else {
      nodeType = NodeType.ArrowFunctionExpression
    }
    const params = this._parseParams()
    if (this._checkCurrentTokenType(TokenType.ArrowOperator)) {
      this._goNext(TokenType.ArrowOperator)
    }
    const body = this._parseBlockStatement()
    const node: FunctionExpression = {
      type: nodeType,
      id,
      params,
      body,
      async,
      generator,
      start,
      end: body.end,
    }
    return node
  }
  /**
   * @description: Analytic function parameter
   *
   */
  private _parseParams(
    mode: FunctionType = FunctionType.FunctionDeclaration,
  ): Identifier[] | Expression[] {
    // Consumption "("
    this._goNext(TokenType.LeftParen)
    const params = []
    // Parse the arguments in parentheses one by one
    while (!this._checkCurrentTokenType(TokenType.RightParen)) {
      const param =
        mode === FunctionType.FunctionDeclaration
          ? // Function declaration
            this._parseIdentifier()
          : // Function call
            this._parseExpression()
      params.push(param)
      if (!this._checkCurrentTokenType(TokenType.RightParen)) {
        this._goNext(TokenType.Comma)
      }
    }
    // Consumption ")"
    this._goNext(TokenType.RightParen)
    return params
  }
  /**
   * @description: Parse literals, const name = 'value', value is the literal
   * @return {Literal}
   */
  private _parseLiteral(): Literal {
    const token = this._getCurrentToken()
    let value: string | number | boolean = token.value!
    if (token.type === TokenType.Number) {
      value = Number(value)
    }
    const literal: Literal = {
      type: NodeType.Literal,
      value: token.value!,
      start: token.start,
      end: token.end,
      raw: token.raw!,
    }
    this._goNext(token.type)
    return literal
  }
  /**
   * @description: Parsing variable name
   * @return {Identifier}
   */
  private _parseIdentifier(): Identifier {
    const token = this._getCurrentToken()
    const identifier: Identifier = {
      type: NodeType.Identifier,
      name: token.value!,
      start: token.start,
      end: token.end,
    }
    this._goNext(TokenType.Identifier)
    return identifier
  }
  /**
   * @description: Analytic function body
   * @return {BlockStatement}
   */
  private _parseBlockStatement(): BlockStatement {
    const { start } = this._getCurrentToken()
    const blockStatement: BlockStatement = {
      type: NodeType.BlockStatement,
      body: [],
      start,
      end: Infinity,
    }
    // Consumption "{"
    this._goNext(TokenType.LeftCurly)
    while (!this._checkCurrentTokenType(TokenType.RightCurly)) {
      // Recursive call to the Statement in the body of the _parseStatement parse function
      const node = this._parseStatement()
      blockStatement.body.push(node)
    }
    blockStatement.end = this._getCurrentToken().end
    // Consumption "}"
    this._goNext(TokenType.RightCurly)
    this._skipSemicolon()
    return blockStatement
  }

  // Check whether the current token type is equal to the passed type (this._tokens[this._currentIndex])
  private _checkCurrentTokenType(type: TokenType | TokenType[]): boolean {
    if (this._isEnd()) {
      return false
    }
    const currentToken = this._tokens[this._currentIndex]
    if (Array.isArray(type)) {
      return type.includes(currentToken.type)
    } else {
      return currentToken.type === type
    }
  }

  private _skipSemicolon(): void {
    if (this._checkCurrentTokenType(TokenType.Semicolon)) {
      this._goNext(TokenType.Semicolon)
    }
  }
  /**
   * @description: Tool method that consumes the current Token and moves the scan location to the next token
   * @param {TokenType} type
   * @return {Token}
   */
  private _goNext(type: TokenType | TokenType[]): Token {
    const currentToken = this._tokens[this._currentIndex]
    // Asserts the type of the current Token and throws an error if it does not match
    if (Array.isArray(type)) {
      if (!type.includes(currentToken.type)) {
        throw new Error(
          `Expect ${type.join(',')}, but got ${currentToken.type}`,
        )
      }
    } else {
      if (currentToken.type !== type) {
        throw new Error(`Expect ${type}, but got ${currentToken.type}`)
      }
    }
    this._currentIndex++
    return currentToken
  }
  /**
   * @description: Check whether the token has been scanned
   * @return {boolean}
   */
  private _isEnd(): boolean {
    return this._currentIndex >= this._tokens.length
  }
  /**
   * @description: Gets the current token
   * @return {Token}
   */
  private _getCurrentToken(): Token {
    return this._tokens[this._currentIndex]
  }

  private _getPreviousToken(): Token {
    return this._tokens[this._currentIndex - 1]
  }

  private _getNextToken(): Token | false {
    if (this._currentIndex + 1 < this._tokens.length) {
      return this._tokens[this._currentIndex + 1]
    } else {
      return false
    }
  }
}
