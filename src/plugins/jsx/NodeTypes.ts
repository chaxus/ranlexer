/*
 * @Author: chaxus nouo18@163.com
 * @LastEditors: chaxus nouo18@163.com
 * @LastEditTime: 2023-08-06 16:27:52
 * @Description: https://github.com/facebook/jsx/blob/main/AST.md
 */

import type { Expression, Literal, Node } from '@/ast/NodeType';

export enum JSXNodeType {
  JSXIdentifier = 'JSXIdentifier',
  JSXMemberExpression = 'JSXMemberExpression',
  JSXNamespacedName = 'JSXNamespacedName',
  JSXEmptyExpression = 'JSXEmptyExpression',
  JSXExpressionContainer = 'JSXExpressionContainer',
  JSXSpreadChild = 'JSXSpreadChild',
  JSXOpeningElement = 'JSXOpeningElement',
  JSXClosingElement = 'JSXClosingElement',
  JSXAttribute = 'JSXAttribute',
  SpreadElement = 'SpreadElement',
  JSXSpreadAttribute = 'JSXSpreadAttribute',
  JSXText = 'JSXText',
  JSXElement = 'JSXElement',
  JSXFragment = 'JSXFragment',
  JSXOpeningFragment = 'JSXOpeningFragment',
  JSXClosingFragment = 'JSXClosingFragment',
}

// JSX Names
export interface JSXIdentifier extends Node {
  type: JSXNodeType.JSXIdentifier;
  name: string;
}

export interface JSXMemberExpression extends Node {
  type: JSXNodeType.JSXMemberExpression;
  object: JSXMemberExpression | JSXIdentifier;
  property: JSXIdentifier;
}

export interface JSXNamespacedName extends Node {
  type: JSXNodeType.JSXNamespacedName;
  namespace: JSXIdentifier;
  name: JSXIdentifier;
}

// JSX Expression Container
export interface JSXEmptyExpression extends Node {
  type: JSXNodeType.JSXEmptyExpression;
}

export interface JSXExpressionContainer extends Node {
  type: JSXNodeType.JSXExpressionContainer;
  expression: Expression | JSXEmptyExpression;
}

export interface JSXSpreadChild extends Node {
  type: JSXNodeType.JSXSpreadChild;
  expression: Expression;
}

// JSX Boundary Tags
export interface JSXBoundaryElement extends Node {
  name: JSXIdentifier | JSXMemberExpression | JSXNamespacedName;
}

export interface JSXOpeningElement extends JSXBoundaryElement {
  type: JSXNodeType.JSXOpeningElement;
  attributes: Array<JSXAttribute | JSXSpreadAttribute>;
  selfClosing: boolean;
}

export interface JSXClosingElement extends JSXBoundaryElement {
  type: JSXNodeType.JSXClosingElement;
}

// JSX Attributes
export interface JSXAttribute extends Node {
  type: JSXNodeType.JSXAttribute;
  name: JSXIdentifier | JSXNamespacedName;
  value: Literal | JSXExpressionContainer | JSXElement | JSXFragment | null;
}

export interface SpreadElement extends Node {
  type: JSXNodeType.SpreadElement;
  argument: Expression;
}

export interface JSXSpreadAttribute extends Node {
  type: JSXNodeType.JSXSpreadAttribute;
  argument: Expression;
}

// JSX Text
export interface JSXText extends Node {
  type: JSXNodeType.JSXText;
  value: string;
  raw: string;
}

// JSX Element
export interface JSXElement extends Node {
  type: JSXNodeType.JSXElement;
  openingElement: JSXOpeningElement;
  children: Array<
    JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment
  >;
  closingElement: JSXClosingElement | null;
}

// JSX Fragment
export interface JSXFragment extends Node {
  type: JSXNodeType.JSXFragment;
  openingFragment: JSXOpeningFragment;
  children: Array<
    JSXText | JSXExpressionContainer | JSXSpreadChild | JSXElement | JSXFragment
  >;
  closingFragment: JSXClosingFragment;
}
export interface JSXOpeningFragment extends Node {
  type: JSXNodeType.JSXOpeningFragment;
}
export interface JSXClosingFragment extends Node {
  type: JSXNodeType.JSXClosingFragment;
}
