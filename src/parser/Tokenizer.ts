import {
  isAlpha,
  isColumnColon,
  isDigit,
  isUnderline,
  isWhiteSpace,
} from '@/utils/char';
import type { Loc } from '@/ast/NodeType';

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
  ArrowOperator = 'ArrowOperator',
  QuestionOperator = 'QuestionOperator',
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
  type: TokenType;
  value?: string;
  start: number;
  end: number;
  loc: {
    start: Loc;
    end: Loc;
  };
  raw?: string;
};

export interface TokenizerOption {
  plugins?: Array<any>;
}

// Token generator object, keyword mapping
const TOKENS_GENERATOR: Record<string, (...args: any[]) => Token> = {
  let(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Let,
      value: 'let',
      start: index,
      end: index + 3,
      loc: { start: loc, end: { line, column: column + 3, index: index + 3 } },
    };
  },
  const(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Const,
      value: 'const',
      start: index,
      end: index + 5,
      loc: { start: loc, end: { line, column: column + 5, index: index + 5 } },
    };
  },
  var(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Var,
      value: 'var',
      start: index,
      end: index + 3,
      loc: { start: loc, end: { line, column: column + 3, index: index + 3 } },
    };
  },
  for(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.For,
      value: 'for',
      start: index,
      end: index + 3,
      loc: { start: loc, end: { line, column: column + 3, index: index + 3 } },
    };
  },
  switch(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Switch,
      value: 'switch',
      start: index,
      end: index + 6,
      loc: { start: loc, end: { line, column: column + 6, index: index + 6 } },
    };
  },
  case(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Case,
      value: 'case',
      start: index,
      end: index + 4,
      loc: { start: loc, end: { line, column: column + 4, index: index + 4 } },
    };
  },
  if(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.If,
      value: 'if',
      start: index,
      end: index + 2,
      loc: { start: loc, end: { line, column: column + 2, index: index + 2 } },
    };
  },
  assign(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Assign,
      value: '=',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  QuestionOperator(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.QuestionOperator,
      value: '?',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  import(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Import,
      value: 'import',
      start: index,
      end: index + 6,
      loc: { start: loc, end: { line, column: column + 6, index: index + 6 } },
    };
  },
  export(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Export,
      value: 'export',
      start: index,
      end: index + 6,
      loc: { start: loc, end: { line, column: column + 6, index: index + 6 } },
    };
  },
  from(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.From,
      value: 'from',
      start: index,
      end: index + 4,
      loc: { start: loc, end: { line, column: column + 4, index: index + 4 } },
    };
  },
  as(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.As,
      value: 'as',
      start: index,
      end: index + 2,
      loc: { start: loc, end: { line, column: column + 2, index: index + 2 } },
    };
  },
  asterisk(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Asterisk,
      value: '*',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  default(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Default,
      value: 'default',
      start: index,
      end: index + 7,
      loc: { start: loc, end: { line, column: column + 7, index: index + 7 } },
    };
  },
  number(loc: Loc, value: string) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Number,
      value,
      start: index,
      end: index + value.length,
      loc: {
        start: loc,
        end: {
          line,
          column: column + value.length,
          index: index + value.length,
        },
      },
      raw: value,
    };
  },
  class(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Class,
      value: 'class',
      start: index,
      end: index + 5,
      loc: { start: loc, end: { line, column: column + 5, index: index + 5 } },
    };
  },
  function(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Function,
      value: 'function',
      start: index,
      end: index + 8,
      loc: { start: loc, end: { line, column: column + 8, index: index + 8 } },
    };
  },
  return(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Return,
      value: 'return',
      start: index,
      end: index + 6,
      loc: { start: loc, end: { line, column: column + 6, index: index + 6 } },
    };
  },
  arrowOperator(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.ArrowOperator,
      value: '=>',
      start: index,
      end: index + 2,
      loc: { start: loc, end: { line, column: column + 2, index: index + 2 } },
    };
  },
  binaryOperator(loc: Loc, value: string) {
    const { line, column, index } = loc;
    return {
      type: TokenType.BinaryOperator,
      value,
      start: index,
      end: index + value.length,
      loc: {
        start: loc,
        end: {
          line,
          column: column + value.length,
          index: index + value.length,
        },
      },
    };
  },
  updateOperator(loc: Loc, value: string) {
    const { line, column, index } = loc;
    return {
      type: TokenType.UpdateOperator,
      value,
      start: index,
      end: index + value.length,
      loc: {
        start: loc,
        end: {
          line,
          column: column + value.length,
          index: index + value.length,
        },
      },
    };
  },
  comma(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Comma,
      value: ',',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  leftParen(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.LeftParen,
      value: '(',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  rightParen(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.RightParen,
      value: ')',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  leftBracket(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.LeftBracket,
      value: '[',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  rightBracket(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.RightBracket,
      value: ']',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  leftCurly(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.LeftCurly,
      value: '{',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  rightCurly(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.RightCurly,
      value: '}',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  dot(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Dot,
      value: '.',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  semicolon(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Semicolon,
      value: ';',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  colon(loc: Loc) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Colon,
      value: ':',
      start: index,
      end: index + 1,
      loc: { start: loc, end: { line, column: column + 1, index: index + 1 } },
    };
  },
  stringLiteral(loc: Loc, value: string, raw: string) {
    const { line, column, index } = loc;
    return {
      type: TokenType.StringLiteral,
      value,
      start: index,
      end: index + value.length + 2,
      loc: {
        start: loc,
        end: {
          line,
          column: column + value.length + 2,
          index: index + value.length + 2,
        },
      },
      raw,
    };
  },
  identifier(loc: Loc, value: string) {
    const { line, column, index } = loc;
    return {
      type: TokenType.Identifier,
      value,
      start: index,
      end: index + value.length,
      loc: {
        start: loc,
        end: {
          line,
          column: column + value.length,
          index: index + value.length,
        },
      },
    };
  },
};

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
  | '?';

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
  ['?', TOKENS_GENERATOR.QuestionOperator],
]);
// Quotation token
const QUOTATION_TOKENS = ["'", '"', '`'];
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
  'of',
  '**',
  'instanceof',
  '==',
  '!=',
  '===',
  '!==',
  '>',
  '<',
  '>=',
  '<=',
];

const UPDATE_OPERATOR_TOKENS = ['++', '--'];

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
  private _tokens: Token[] = []; //  The final result is an array of tokens
  private _currentIndex: number = 0; // Scan the location of the current code snippet
  private _source: string; // The code snippet currently passed in
  private _scanMode = ScanMode.Normal; // Scan mode, and perform different operations on different types
  private _options: TokenizerOption;
  private _line: number;
  private _column: number;
  private _index: number;
  /**
   * @description: Parameters are snippets of code
   * @param {string} input
   */
  constructor(input: string, options: TokenizerOption = {}) {
    this._options = options;
    this._source = input; // Obtain source code
    this._line = 1;
    this._column = 0;
    this._index = 0;
  }
  /**
   * @description: Main program, scan string to generate token
   */
  tokenize(): Token[] {
    // scan
    while (this._currentIndex < this._source.length) {
      const currentChar = this._source[this._currentIndex];
      const startIndex = this._currentIndex;
      const startLoc: Loc = {
        line: this._line,
        column: this._column,
        index: startIndex,
      };
      // 1. Determines whether it is a delimiter
      if (isWhiteSpace(currentChar)) {
        this._currentIndex++;
        this._index++;
        this._column++;
        continue;
      }
      if (isColumnColon(currentChar)) {
        this._currentIndex++;
        this._column = 0;
        this._line++;
        this._index++;
        continue;
      }
      // exec plugins
      this._options.plugins?.forEach((element) => {
        const tokens = element.tokenizer(currentChar, startIndex, this._source);
        this._tokens.concat(tokens || []);
        if (tokens.length > 0) {
          this._currentIndex += tokens[tokens.length - 1].end - startIndex;
        }
      });
      // 2. instanceof
      if (
        BINARY_OPERATOR_TOKENS.includes(this._getNextNumberChar(9)) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(startLoc, this._getNextNumberChar(9)),
        );
        this._currentIndex += 10;
        continue;
      }
      // 3. Determine if it is a single character () {}.; *
      else if (KNOWN_SINGLE_CHAR_TOKENS.has(currentChar as SingleCharTokens)) {
        if (this._getNextNumberChar() === '=>') {
          this._tokens.push(
            TOKENS_GENERATOR.arrowOperator(startLoc, currentChar),
          );
          this._currentIndex += 2;
          continue;
        }
        const previousToken = this._getPreviousToken();
        // * Character special processing
        if (
          previousToken &&
          currentChar === '*' &&
          previousToken.type !== TokenType.Import &&
          previousToken.type !== TokenType.Export
        ) {
          // If it is not import/export, it is considered to be a binary operator to avoid miscalculation {
          this._tokens.push(TOKENS_GENERATOR.asterisk(startLoc, currentChar));
          this._currentIndex++;
          continue;
          // Otherwise, follow the * in import/export
        }
        const token = KNOWN_SINGLE_CHAR_TOKENS.get(
          currentChar as SingleCharTokens,
        )!(startLoc);
        this._tokens.push(token);
        this._currentIndex++;
      }
      // 5. Determine the binary operator
      else if (
        BINARY_OPERATOR_TOKENS.includes(this._getNextNumberChar(2)) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(startLoc, this._getNextNumberChar(2)),
        );
        this._currentIndex += 3;
        continue;
      } else if (
        BINARY_OPERATOR_TOKENS.includes(this._getNextNumberChar()) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(startLoc, this._getNextNumberChar(1)),
        );
        this._currentIndex += 2;
        continue;
      } else if (
        UPDATE_OPERATOR_TOKENS.includes(this._getNextNumberChar()) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.updateOperator(startLoc, this._getNextNumberChar()),
        );
        this._currentIndex += 2;
        continue;
      } else if (
        BINARY_OPERATOR_TOKENS.includes(currentChar) &&
        this._scanMode === ScanMode.Normal
      ) {
        this._tokens.push(
          TOKENS_GENERATOR.binaryOperator(startLoc, currentChar),
        );
        this._currentIndex++;
        continue;
      }
      // 4. Determine whether it is quoted
      else if (QUOTATION_TOKENS.includes(currentChar)) {
        // If it's quotes, scan the string variable
        this.scanStringLiteral();
        // Skip the closing quotes
        this._currentIndex++;
        continue;
      }
      // 2. Tell if it's a letter
      else if (isAlpha(currentChar)) {
        // Scan identifier
        this.scanIdentifier();
        continue;
      }
      // 6. Judge number
      else if (isDigit(currentChar)) {
        this._scanNumber();
        continue;
      }
    }
    this._resetCurrentIndex();
    // Returns the resulting token array
    return this._getTokens();
  }
  /**
   * @description: Set the scanning mode
   * @param {ScanMode} mode
   */
  private _setScanMode(mode: ScanMode) {
    this._scanMode = mode;
  }
  /**
   * @description: Reset scan mode to normal mode
   */
  private _resetScanMode() {
    this._scanMode = ScanMode.Normal;
  }
  // Scan identifier
  scanIdentifier(): void {
    this._setScanMode(ScanMode.Identifier);
    // Continue scanning until you have collected complete words
    let identifier = '';
    let currentChar = this._getCurrentChar();
    const startIndex = this._currentIndex;
    const startLoc: Loc = {
      line: this._line,
      column: this._column,
      index: startIndex,
    };
    // If it is letters, numbers, and underscores, collect them as characters
    while (
      isAlpha(currentChar) ||
      isDigit(currentChar) ||
      isUnderline(currentChar)
    ) {
      identifier += currentChar;
      this._currentIndex++;
      currentChar = this._getCurrentChar();
    }
    let token;
    // 1. The result is a keyword
    if (identifier in TOKENS_GENERATOR) {
      token =
        TOKENS_GENERATOR[identifier as keyof typeof TOKENS_GENERATOR](startLoc);
    }
    // 2. The result is an identifier
    else {
      token = TOKENS_GENERATOR['identifier'](startLoc, identifier);
    }
    // Lexical analysis adds this._tokens
    this._tokens.push(token);
    this._resetScanMode();
  }
  // Scan string variable
  scanStringLiteral(): void {
    this._setScanMode(ScanMode.StringLiteral);
    const startIndex = this._currentIndex;
    const startLoc: Loc = {
      line: this._line,
      column: this._column,
      index: startIndex,
    };
    let currentChar = this._getCurrentChar();
    // Record quotes
    const startQuotation = currentChar;
    // Keep looking for strings
    this._currentIndex++;
    let str = '';
    currentChar = this._getCurrentChar();
    while (currentChar && currentChar !== startQuotation) {
      str += currentChar;
      this._currentIndex++;
      currentChar = this._getCurrentChar();
    }
    const token = TOKENS_GENERATOR.stringLiteral(
      startLoc,
      str,
      `${startQuotation}${str}${startQuotation}`,
    );
    // Lexical analysis adds this._tokens
    this._tokens.push(token);
    this._resetScanMode();
  }
  _scanNumber(): void {
    this._setScanMode(ScanMode.Number);
    const startIndex = this._currentIndex;
    const startLoc: Loc = {
      line: this._line,
      column: this._column,
      index: startIndex,
    };
    let number = '';
    let currentChar = this._getCurrentChar();
    let isFloat = false;
    while (isDigit(currentChar) || (currentChar === '.' && !isFloat)) {
      if (currentChar === '.') {
        isFloat = true;
      }
      number += currentChar;
      this._currentIndex++;
      currentChar = this._getCurrentChar();
    }
    if (isFloat && currentChar === '.') {
      throw new Error('Unexpected character "."');
    }
    const token = TOKENS_GENERATOR.number(startLoc, number);
    // Lexical analysis adds this._tokens
    this._tokens.push(token);
    this._resetScanMode();
  }
  /**
   * @description: Returns the current character
   * @return {string}
   */
  private _getCurrentChar() {
    return this._source[this._currentIndex];
  }

  private _getNextChar(index: number = 1) {
    if (this._currentIndex + index < this._source.length) {
      return this._source[this._currentIndex + index];
    }
    return '';
  }

  private _getNextNumberChar(index: number = 1) {
    const size = this._currentIndex + index;
    if (size < this._source.length) {
      let str = '';
      for (let i = this._currentIndex; i <= size; i++) {
        str += this._source[i];
      }
      return str;
    }
    return '';
  }

  private _resetCurrentIndex() {
    this._currentIndex = 0;
  }

  private _getTokens() {
    return this._tokens;
  }
  /**
   * @description: Returns the last Token
   * @return {Token}
   */
  private _getPreviousToken() {
    // front Token
    if (this._tokens.length > 0) {
      return this._tokens[this._tokens.length - 1];
    }
    // throw new Error('Previous token not found')
  }
}
