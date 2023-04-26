import type { Token } from '@/parser/Tokenizer'
import { TokenType } from '@/parser/Tokenizer'
import type {
  BinaryExpression,
  BlockStatement,
  CallExpression,
  ExportDeclaration,
  ExportSpecifier,
  Expression,
  ExpressionStatement,
  FunctionDeclaration,
  FunctionExpression,
  Identifier,
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  ImportSpecifiers,
  Literal,
  MemberExpression,
  Program,
  ReturnStatement,
  Statement,
  VariableDeclaration,
  VariableDeclarator,
  VariableKind,
} from '@/parser/nodeTypes'
import { FunctionType, NodeType } from '@/parser/nodeTypes'

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
    const program = this._parseProgram()
    return program
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
    if (this._checkCurrentTokenType(TokenType.Function))
      return this._parseFunctionDeclaration()
    if (this._checkCurrentTokenType(TokenType.Identifier))
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
    const isVariableDeclarationEnded = (): boolean => {
      if (this._checkCurrentTokenType(TokenType.Semicolon)) {
        return true
      }
      const nextToken = this._getNextToken()
      // Looking back at a token, if it is =, it means there is no end
      if (nextToken && nextToken.type === TokenType.Assign) {
        return false
      }
      return true
    }
    while (!isVariableDeclarationEnded()) {
      // Parse the variable name foo
      const id = this._parseIdentifier()
      let init = null
      if (this._checkCurrentTokenType(TokenType.Assign)) {
        this._goNext(TokenType.Assign)
        if (
          this._checkCurrentTokenType([
            TokenType.Number,
            TokenType.StringLiteral,
          ])
        ) {
          init = this._parseLiteral()
        } else {
          init = this._parseExpression()
        }
      }
      const declarator: VariableDeclarator = {
        type: NodeType.VariableDeclarator,
        id,
        init,
        start: id.start,
        end: init ? init.end : id.end,
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
    const { start } = this._getCurrentToken()
    this._goNext(TokenType.Return)
    const argument = this._parseExpression()
    const node: ReturnStatement = {
      type: NodeType.ReturnStatement,
      argument,
      start,
      end: argument.end,
    }
    this._skipSemicolon()
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
    return expressionStatement
  }

  // Parse the a.b.c nested structure of the object
  private _parseExpression(): Expression {
    // Check to see if it is a function expression
    if (this._checkCurrentTokenType(TokenType.Function)) {
      // Analytic function expression
      return this._parseFunctionExpression()
    }
    if (
      this._checkCurrentTokenType([TokenType.Number, TokenType.StringLiteral])
    ) {
      return this._parseLiteral()
    }
    // Get an identifier, such as a
    let expression: Expression = this._parseIdentifier()
    while (!this._isEnd()) {
      if (this._checkCurrentTokenType(TokenType.LeftParen)) {
        expression = this._parseCallExpression(expression)
      } else if (this._checkCurrentTokenType(TokenType.Dot)) {
        // Continue to analyze, a.b
        expression = this._parseMemberExpression(expression as MemberExpression)
      } else if (this._checkCurrentTokenType(TokenType.Operator)) {
        // analyze a + b
        expression = this.__parseBinaryOperatorExpression(expression)
      } else {
        break
      }
    }
    return expression
  }

  private __parseBinaryOperatorExpression(
    expression: Expression,
  ): BinaryExpression {
    const { start } = this._getCurrentToken()
    const operator = this._getCurrentToken().value!
    this._goNext(TokenType.Operator)
    const right = this._parseExpression()
    const node: BinaryExpression = {
      type: NodeType.BinaryExpression,
      operator,
      left: expression,
      right,
      start,
      end: right.end,
    }
    return node
  }

  private _parseMemberExpression(
    object: Identifier | MemberExpression,
  ): MemberExpression {
    this._goNext(TokenType.Dot)
    const property = this._parseIdentifier()
    const node: MemberExpression = {
      type: NodeType.MemberExpression,
      object,
      property,
      start: object.start,
      end: property.end,
      computed: false,
    }
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
    const { start } = this._getCurrentToken()
    this._goNext(TokenType.Function)
    let id = null
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      id = this._parseIdentifier()
    }
    const params = this._parseParams()
    const body = this._parseBlockStatement()
    const node: FunctionDeclaration = {
      type: NodeType.FunctionDeclaration,
      id,
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
    const { start } = this._getCurrentToken()
    this._goNext(TokenType.Function)
    let id = null
    if (this._checkCurrentTokenType(TokenType.Identifier)) {
      id = this._parseIdentifier()
    }
    const params = this._parseParams()
    const body = this._parseBlockStatement()
    const node: FunctionExpression = {
      type: NodeType.FunctionExpression,
      id,
      params,
      body,
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
