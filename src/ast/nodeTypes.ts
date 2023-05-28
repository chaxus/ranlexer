import type { Scope } from '@/ast/Scope'

export enum NodeType {
  Program = 'Program',
  Identifier = 'Identifier',
  Literal = 'Literal',
  ArrayPattern = 'ArrayPattern',
  SwitchCase = 'SwitchCase',
  Property = '"Property"',
  UnaryExpression = 'UnaryExpression',
  UpdateExpression = 'UpdateExpression',
  CallExpression = 'CallExpression',
  BinaryExpression = 'BinaryExpression',
  MemberExpression = 'MemberExpression',
  FunctionExpression = 'FunctionExpression',
  ArrayExpression = 'ArrayExpression',
  ObjectExpression = 'ObjectExpression',
  VariableDeclaration = 'VariableDeclaration',
  FunctionDeclaration = 'FunctionDeclaration',
  ExportDeclaration = 'ExportDeclaration',
  ImportDeclaration = 'ImportDeclaration',
  ExportDefaultDeclaration = 'ExportDefaultDeclaration',
  ExportNamedDeclaration = 'ExportNamedDeclaration',
  ExportAllDeclaration = 'ExportAllDeclaration',
  VariableDeclarator = 'VariableDeclarator',
  BlockStatement = 'BlockStatement',
  ExpressionStatement = 'ExpressionStatement',
  ReturnStatement = 'ReturnStatement',
  ForStatement = 'ForStatement',
  ForInStatement = 'ForInStatement',
  ForOfStatement = 'ForOfStatement',
  SwitchStatement = 'SwitchStatement',
  IfStatement = 'IfStatement',
  ImportSpecifier = 'ImportSpecifier', // import {c, d} from 'c';
  ImportDefaultSpecifier = 'ImportDefaultSpecifier', // import a from 'a';
  ImportNamespaceSpecifier = 'ImportNamespaceSpecifier', // import * as b from 'b';
  ExportSpecifier = 'ExportSpecifier',
}

export const NodeTypeStatements = [
  NodeType.BlockStatement,
  NodeType.ExpressionStatement,
  NodeType.ReturnStatement,
  NodeType.ForStatement,
  NodeType.ForInStatement,
  NodeType.ForOfStatement,
  NodeType.SwitchStatement,
  NodeType.IfStatement,
]

export const NodeTypeExpressions = [
  NodeType.ArrayExpression,
  NodeType.BinaryExpression,
  NodeType.CallExpression,
  NodeType.FunctionExpression,
  NodeType.MemberExpression,
  NodeType.ObjectExpression,
  NodeType.UnaryExpression,
  NodeType.UpdateExpression,
]

// Declaration statement
export type Statement =
  | ImportDeclaration
  | ExportDeclaration
  | VariableDeclaration
  | FunctionDeclaration
  | ExpressionStatement
  | BlockStatement
  | ReturnStatement
  | ForStatement
  | SwitchStatement
  | IfStatement
  | ForInStatement
  | ForOfStatement

// expression statement
export type Expression =
  | CallExpression
  | MemberExpression
  | Identifier
  | Literal
  | BinaryExpression
  | FunctionExpression
  | ObjectExpression
  | ArrayExpression
  | UpdateExpression

export enum FunctionType {
  FunctionDeclaration,
  CallExpression,
}

export interface Node {
  type: string
  start: number
  end: number
  _scope?: Scope
}

export interface Program extends Node {
  type: NodeType.Program
  body: Statement[]
}

export interface Literal extends Node {
  type: NodeType.Literal
  value: string
  raw: string
}

type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'

export interface UnaryExpression extends Node {
  type: NodeType.UnaryExpression
  operator: UnaryOperator
  prefix: boolean
  argument: Expression
}

type UpdateOperator = '++' | '--'

export interface UpdateExpression extends Node {
  type: NodeType.UpdateExpression
  operator: string
  argument: Expression
  prefix: boolean
}

export interface SwitchCase extends Node {
  type: NodeType.SwitchCase
  test: Expression | null
  consequent: Statement[]
}

export interface SwitchStatement extends Node {
  type: NodeType.SwitchStatement
  discriminant: Expression
  cases: SwitchCase[]
}

export interface IfStatement extends Node {
  type: NodeType.IfStatement
  test: Expression
  consequent: Statement
  alternate: Statement | null
}

export interface ForInStatement extends Node {
  type: NodeType.ForInStatement
  left: VariableDeclaration
  right: Identifier | undefined
  body: Statement
}
export interface ForOfStatement extends Node {
  type: NodeType.ForOfStatement
  left: VariableDeclaration
  right: Identifier | undefined
  body: Statement
}

export interface ForStatement extends Node {
  type: NodeType.ForStatement
  init: VariableDeclaration | Expression
  test: ExpressionStatement | undefined
  update: ExpressionStatement | undefined
  body: Statement
}

export interface Identifier extends Node {
  type: NodeType.Identifier
  name: string
}

export interface CallExpression extends Node {
  type: NodeType.CallExpression
  callee: Expression
  arguments: Expression[]
}

export interface MemberExpression extends Node {
  type: NodeType.MemberExpression
  object: Identifier | MemberExpression
  property: Identifier | Expression | undefined
  computed: boolean
}

export interface BlockStatement extends Node {
  type: NodeType.BlockStatement
  body: Statement[]
}

export interface ExpressionStatement extends Node {
  type: NodeType.ExpressionStatement
  expression: Expression
}

export interface FunctionExpression extends FunctionNode {
  type: NodeType.FunctionExpression
}

export interface Property extends Node {
  type: NodeType.Property
  key: Identifier | null
  value: Literal | Expression | null
  kind: 'init' | 'get' | 'set'
}

export interface ObjectExpression extends Node {
  type: NodeType.ObjectExpression
  properties: Property[]
}

export interface ArrayExpression extends Node {
  type: NodeType.ArrayExpression
  elements: Expression[] | null
}

export interface FunctionDeclaration extends FunctionNode {
  type: NodeType.FunctionDeclaration
  id: Identifier | null
}

export type VariableKind = 'var' | 'let' | 'const'

export interface ArrayPattern {
  type: NodeType.ArrayPattern
  start: number
  end: number
  elements: Array<Identifier>
}

export type Pattern = ArrayPattern

export interface VariableDeclarator extends Node {
  type: NodeType.VariableDeclarator
  id: Identifier | Pattern | null
  init: Expression | Literal | null
}

export interface VariableDeclaration extends Node {
  type: NodeType.VariableDeclaration
  kind: 'var' | 'let' | 'const'
  declarations: VariableDeclarator[]
}

export interface ImportSpecifier extends Node {
  type: NodeType.ImportSpecifier
  imported: Identifier
  local: Identifier
}

export interface ImportDefaultSpecifier extends Node {
  type: NodeType.ImportDefaultSpecifier
  local: Identifier
}

export interface ImportNamespaceSpecifier extends Node {
  type: NodeType.ImportNamespaceSpecifier
  local: Identifier
}

export type ImportSpecifiers = Array<
  ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier
>

export interface ImportDeclaration extends Node {
  type: NodeType.ImportDeclaration
  specifiers: ImportSpecifiers
  source: Literal
}

export type Declaration =
  | FunctionDeclaration
  | VariableDeclaration
  | ImportDeclaration
  | ExportDeclaration
  | VariableDeclarator

export interface ExportSpecifier extends Node {
  type: NodeType.ExportSpecifier
  exported: Identifier
  local: Identifier
}

export interface ExportNamedDeclaration extends Node {
  type: NodeType.ExportNamedDeclaration
  declaration: Declaration | null
  specifiers: ExportSpecifier[]
  source: Literal | null
}

export interface ExportDefaultDeclaration extends Node {
  type: NodeType.ExportDefaultDeclaration
  declaration: Declaration | Expression
}

export interface ExportAllDeclaration extends Node {
  type: NodeType.ExportAllDeclaration
  source: Literal
  exported: Identifier | null
}

export type ExportDeclaration =
  | ExportNamedDeclaration
  | ExportDefaultDeclaration
  | ExportAllDeclaration

export interface BinaryExpression extends Node {
  type: NodeType.BinaryExpression
  left: Expression
  right: Expression
  operator: string
}
export interface FunctionNode extends Node {
  id: Identifier | null
  params: Expression[] | Identifier[]
  body: BlockStatement
}

export interface ReturnStatement extends Node {
  type: NodeType.ReturnStatement
  argument: Expression | null
}
