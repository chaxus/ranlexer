import { isAlpha, isDigit, isUnderline, isWhiteSpace } from '@/utils/char'

// Lexical analyzer divides the code into lexical units for the convenience of subsequent syntax analysis
// Essentially, code strings are scanned character by character and then grouped according to certain syntactic rules.
/**
 * @description: Declare some necessary types
 */
export enum TokenType {
  Let = 'Let',
  Const = 'Const',
  Var = 'Var',
  Assign = 'Assign',
  Function = 'Function',
  Class = 'Class',
  Number = 'Number',
  BinaryOperator = 'BinaryOperator',
  UpdateOperator = 'UpdateOperator',
  Identifier = 'Identifier',
  LeftParen = 'LeftParen',
  RightParen = 'RightParen',
  LeftCurly = 'LeftCurly',
  For = 'For',
  Switch = 'Switch',
  Case = 'Case',
  If = 'if',
  RightCurly = 'RightCurly',
  LeftBracket = 'LeftBracket',
  RightBracket = 'RightBracket',
  Comma = 'Comma',
  Dot = 'Dot',
  Semicolon = 'Semicolon',
  Colon = 'Colon',
  StringLiteral = 'StringLiteral',
  Return = 'Return',
  Import = 'Import',
  Export = 'Export',
  Default = 'Default',
  From = 'From',
  As = 'As',
  Asterisk = 'Asterisk',
}

// Scanning mode
export enum ScanMode {
  Normal,
  Identifier, // Scan identifiers, words
  StringLiteral,
  Number,
}

// Lexical analysis, token type, value, start position, end position, text
export type Token = {
  type: TokenType
  value?: string
  start: number
  end: number
  raw?: string
}

// Token generator object, keyword mapping
const TOKENS_GENERATOR: Record<string, (...args: any[]) => Token> = {
  let(start: number) {
    return { type: TokenType.Let, value: 'let', start, end: start + 3 }
  },
  const(start: number) {
    return { type: TokenType.Const, value: 'const', start, end: start + 5 }
  },
  var(start: number) {
    return { type: TokenType.Var, value: 'var', start, end: start + 3 }
  },
  for(start: number) {
    return { type: TokenType.For, value: 'for', start, end: start + 3 }
  },
  switch(start: number) {
    return { type: TokenType.Switch, value: 'switch', start, end: start + 6 }
  },
  case(start: number) {
    return { type: TokenType.Case, value: 'case', start, end: start + 4 }
  },
  if(start: number) {
    return { type: TokenType.If, value: 'if', start, end: start + 2 }
  },
  assign(start: number) {
    return { type: TokenType.Assign, value: '=', start, end: start + 1 }
  },
  import(start: number) {
    return {
      type: TokenType.Import,
      value: 'import',
      start,
      end: start + 6,
    }
  },
  export(start: number) {
    return {
      type: TokenType.Export,
      value: 'export',
      start,
      end: start + 6,
    }
  },
  from(start: number) {
    return {
      type: TokenType.From,
      value: 'from',
      start,
      end: start + 4,
    }
  },
  as(start: number) {
    return {
      type: TokenType.As,
      value: 'as',
      start,
      end: start + 2,
    }
  },
  asterisk(start: number) {
    return {
      type: TokenType.Asterisk,
      value: '*',
      start,
      end: start + 1,
    }
  },
  default(start: number) {
    return {
      type: TokenType.Default,
      value: 'default',
      start,
      end: start + 7,
    }
  },
  number(start: number, value: string) {
    return {
      type: TokenType.Number,
      value,
      start,
      end: start + value.length,
      raw: value,
    }
  },
  class(start: number) {
    return {
      type: TokenType.Class,
      value: 'class',
      start,
      end: start + 5,
    }
  },
  function(start: number) {
    return {
      type: TokenType.Function,
      value: 'function',
      start,
      end: start + 8,
    }
  },
  return(start: number) {
    return {
      type: TokenType.Return,
      value: 'return',
      start,
      end: start + 6,
    }
  },
  binaryOperator(start: number, value: string) {
    return {
      type: TokenType.BinaryOperator,
      value,
      start,
      end: start + value.length,
    }
  },
  updateOperator(start: number, value: string) {
    return {
      type: TokenType.UpdateOperator,
      value,
      start,
      end: start + value.length,
    }
  },
  comma(start: number) {
    return {
      type: TokenType.Comma,
      value: ',',
      start,
      end: start + 1,
    }
  },
  leftParen(start: number) {
    return { type: TokenType.LeftParen, value: '(', start, end: start + 1 }
  },
  rightParen(start: number) {
    return { type: TokenType.RightParen, value: ')', start, end: start + 1 }
  },
  leftBracket(start: number) {
    return { type: TokenType.LeftBracket, value: '[', start, end: start + 1 }
  },
  rightBracket(start: number) {
    return { type: TokenType.RightBracket, value: ']', start, end: start + 1 }
  },
  leftCurly(start: number) {
    return { type: TokenType.LeftCurly, value: '{', start, end: start + 1 }
  },
  rightCurly(start: number) {
    return { type: TokenType.RightCurly, value: '}', start, end: start + 1 }
  },
  dot(start: number) {
    return { type: TokenType.Dot, value: '.', start, end: start + 1 }
  },
  semicolon(start: number) {
    return { type: TokenType.Semicolon, value: ';', start, end: start + 1 }
  },
  colon(start: number) {
    return { type: TokenType.Colon, value: ':', start, end: start + 1 }
  },
  stringLiteral(start: number, value: string, raw: string) {
    return {
      type: TokenType.StringLiteral,
      value,
      start,
      end: start + value.length + 2,
      raw,
    }
  },
  identifier(start: number, value: string) {
    return {
      type: TokenType.Identifier,
      value,
      start,
      end: start + value.length,
    }
  },
}

// Single-character token
type SingleCharTokens =
  | '('
  | ')'
  | '{'
  | '}'
  | '['
  | ']'
  | '.'
  | ';'
  | ','
  | '*'
  | '='
  | '<'
  | '>'
  | ':'

// Single-character mapping to Token generator
const KNOWN_SINGLE_CHAR_TOKENS = new Map<
  SingleCharTokens,
  (typeof TOKENS_GENERATOR)[keyof typeof TOKENS_GENERATOR]
>([
  ['(', TOKENS_GENERATOR.leftParen],
  [')', TOKENS_GENERATOR.rightParen],
  ['[', TOKENS_GENERATOR.leftBracket],
  [']', TOKENS_GENERATOR.rightBracket],
  ['{', TOKENS_GENERATOR.leftCurly],
  ['}', TOKENS_GENERATOR.rightCurly],
  ['.', TOKENS_GENERATOR.dot],
  [';', TOKENS_GENERATOR.semicolon],
  [':', TOKENS_GENERATOR.colon],
  [',', TOKENS_GENERATOR.comma],
  ['*', TOKENS_GENERATOR.asterisk],
  ['=', TOKENS_GENERATOR.assign],
])
// Quotation token
const QUOTATION_TOKENS = ["'", '"', '`']
// 操作符token
const BINARY_OPERATOR_TOKENS = [
  '+',
  '-',
  '*',
  '/',
  '%',
  '^',
  '&',
  '|',
  '~',
  '<<',
  '>>',
  'in',
  'instanceof',
  '==',
  '!=',
  '===',
  '!==',
  '>',
  '<',
  '>=',
  '<=',
]

const UPDATE_OPERATOR_TOKENS = ['++', '--']

/**
 * @description: Lexical analyzer, word divider
 * In the process of scanning characters, different characters need to be processed differently. Specific strategies are as follows:
 * 1. If the current character is a separator, such as a space, it is skipped.
 * 2. The current character is a letter, and you need to continue scanning to obtain a complete word:
 *  If the word is a syntax keyword, create a Token for the keyword
 *  Otherwise, it is treated as a normal variable name
 * 3. If the current character is a single character, such as {,}, (,), create a Token corresponding to the single character
 */
export class Tokenizer {
  private _tokens: Token[] = [] //  The final result is an array of tokens
  private _currentIndex: number = 0 // Scan the location of the current code snippet
  private _source: string // The code snippet currently passed in
  private _scanMode = ScanMode.Normal // Scan mode, and perform different operations on different types
  /**
   * @description: Parameters are snippets of code
   * @param {string} input
   */
  constructor(input: string) {
    this._source = input // Obtain source code
  }
  /**
   * @description: Main program, scan string to generate token
   */
  tokenize(): Token[] {
    // scan
    while (this._currentIndex < this._source.length) {
      const currentChar = this._source[this._currentIndex]
      const startIndex = this._currentIndex
      // 1. Determines whether it is a delimiter
      if (isWhiteSpace(currentChar)) {
        this._currentIndex++
        continue
      }
      // instanceof
      else if (
        BINARY_OPERATOR_TOKENS.includes(
          currentChar +
            this._getNextChar() +
            this._getNextChar(2) +
            this._getNextChar(3) +
            this._getNextChar(4) +
            this._getNextChar(5) +
            this._getNextChar(6) +
            this._getNextChar(7) +
            this._getNextChar(8) +
            this._getNextChar(9),
        ) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(
            startIndex,
            currentChar +
              this._getNextChar() +
              this._getNextChar() +
              this._getNextChar(2) +
              this._getNextChar(3) +
              this._getNextChar(4) +
              this._getNextChar(5) +
              this._getNextChar(6) +
              this._getNextChar(7) +
              this._getNextChar(8) +
              this._getNextChar(9),
          ),
        )
        this._currentIndex += 10
        continue
      }
      // 2. Tell if it's a letter
      else if (isAlpha(currentChar)) {
        // Scan identifier
        this.scanIdentifier()
        continue
      }
      // 3. Determine if it is a single character () {}.; *
      else if (KNOWN_SINGLE_CHAR_TOKENS.has(currentChar as SingleCharTokens)) {
        const previousToken = this._getPreviousToken()
        // * Character special processing
        if (
          previousToken &&
          currentChar === '*' &&
          previousToken.type !== TokenType.Import &&
          previousToken.type !== TokenType.Export
        ) {
          // If it is not import/export, it is considered to be a binary operator to avoid miscalculation {
          this._tokens.push(TOKENS_GENERATOR.asterisk(startIndex, currentChar))
          this._currentIndex++
          continue
          // Otherwise, follow the * in import/export
        }
        const token = KNOWN_SINGLE_CHAR_TOKENS.get(
          currentChar as SingleCharTokens,
        )!(startIndex)
        this._tokens.push(token)
        this._currentIndex++
      }
      // 5. Determine the binary operator
      else if (
        BINARY_OPERATOR_TOKENS.includes(
          currentChar + this._getNextChar() + this._getNextChar(2),
        ) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(
            startIndex,
            currentChar + this._getNextChar() + this._getNextChar(2),
          ),
        )
        this._currentIndex += 3
        continue
      } else if (
        BINARY_OPERATOR_TOKENS.includes(currentChar + this._getNextChar()) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(
            startIndex,
            currentChar + this._getNextChar(),
          ),
        )
        this._currentIndex += 2
        continue
      } else if (
        UPDATE_OPERATOR_TOKENS.includes(currentChar + this._getNextChar()) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.updateOperator(
            startIndex,
            currentChar + this._getNextChar(),
          ),
        )
        this._currentIndex += 2
        continue
      } else if (
        BINARY_OPERATOR_TOKENS.includes(currentChar) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(startIndex, currentChar),
        )
        this._currentIndex++
        continue
      }
      // 4. Determine whether it is quoted
      else if (QUOTATION_TOKENS.includes(currentChar)) {
        // If it's quotes, scan the string variable
        this.scanStringLiteral()
        // Skip the closing quotes
        this._currentIndex++
        continue
      }
      // 6. Judge number
      else if (isDigit(currentChar)) {
        this._scanNumber()
        continue
      }
    }
    this._resetCurrentIndex()
    // Returns the resulting token array
    return this._getTokens()
  }
  /**
   * @description: Set the scanning mode
   * @param {ScanMode} mode
   */
  private _setScanMode(mode: ScanMode) {
    this._scanMode = mode
  }
  /**
   * @description: Reset scan mode to normal mode
   */
  private _resetScanMode() {
    this._scanMode = ScanMode.Normal
  }
  // Scan identifier
  scanIdentifier(): void {
    this._setScanMode(ScanMode.Identifier)
    // Continue scanning until you have collected complete words
    let identifier = ''
    let currentChar = this._getCurrentChar()
    const startIndex = this._currentIndex
    // If it is letters, numbers, and underscores, collect them as characters
    while (
      isAlpha(currentChar) ||
      isDigit(currentChar) ||
      isUnderline(currentChar)
    ) {
      identifier += currentChar
      this._currentIndex++
      currentChar = this._getCurrentChar()
    }
    let token
    // 1. The result is a keyword
    if (identifier in TOKENS_GENERATOR) {
      token =
        TOKENS_GENERATOR[identifier as keyof typeof TOKENS_GENERATOR](
          startIndex,
        )
    }
    // 2. The result is an identifier
    else {
      token = TOKENS_GENERATOR['identifier'](startIndex, identifier)
    }
    // Lexical analysis adds this._tokens
    this._tokens.push(token)
    this._resetScanMode()
  }
  // Scan string variable
  scanStringLiteral(): void {
    this._setScanMode(ScanMode.StringLiteral)
    const startIndex = this._currentIndex
    let currentChar = this._getCurrentChar()
    // Record quotes
    const startQuotation = currentChar
    // Keep looking for strings
    this._currentIndex++
    let str = ''
    currentChar = this._getCurrentChar()
    while (currentChar && currentChar !== startQuotation) {
      str += currentChar
      this._currentIndex++
      currentChar = this._getCurrentChar()
    }
    const token = TOKENS_GENERATOR.stringLiteral(
      startIndex,
      str,
      `${startQuotation}${str}${startQuotation}`,
    )
    // Lexical analysis adds this._tokens
    this._tokens.push(token)
    this._resetScanMode()
  }
  _scanNumber(): void {
    this._setScanMode(ScanMode.Number)
    const startIndex = this._currentIndex
    let number = ''
    let currentChar = this._getCurrentChar()
    let isFloat = false
    while (isDigit(currentChar) || (currentChar === '.' && !isFloat)) {
      if (currentChar === '.') {
        isFloat = true
      }
      number += currentChar
      this._currentIndex++
      currentChar = this._getCurrentChar()
    }
    if (isFloat && currentChar === '.') {
      throw new Error('Unexpected character "."')
    }
    const token = TOKENS_GENERATOR.number(startIndex, number)
    // Lexical analysis adds this._tokens
    this._tokens.push(token)
    this._resetScanMode()
  }
  /**
   * @description: Returns the current character
   * @return {string}
   */
  private _getCurrentChar() {
    return this._source[this._currentIndex]
  }

  private _getNextChar(index: number = 1) {
    if (this._currentIndex + index < this._source.length) {
      return this._source[this._currentIndex + index]
    }
    return ''
  }

  private _resetCurrentIndex() {
    this._currentIndex = 0
  }

  private _getTokens() {
    return this._tokens
  }
  /**
   * @description: Returns the last Token
   * @return {Token}
   */
  private _getPreviousToken() {
    // front Token
    if (this._tokens.length > 0) {
      return this._tokens[this._tokens.length - 1]
    }
    // throw new Error('Previous token not found')
  }
}
