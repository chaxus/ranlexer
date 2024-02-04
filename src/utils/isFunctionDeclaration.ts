import type { Declaration, ExportDeclaration } from '@/ast/NodeType';
import { NodeType } from '@/ast/NodeType';
/**
 * @description: Whether it is a function node
 * @param {Declaration} node
 * @return {*}
 */
export function isFunctionDeclaration(node: Declaration): boolean {
  if (!node) return false;

  return (
    // function foo() {}
    node.type === 'FunctionDeclaration' ||
    // const foo = function() {}
    (node.type === NodeType.VariableDeclarator &&
      node.init &&
      node.init.type === NodeType.FunctionExpression) ||
    // export function ...
    // export default function
    ((node.type === NodeType.ExportNamedDeclaration ||
      node.type === NodeType.ExportDefaultDeclaration) &&
      !!node.declaration &&
      node.declaration.type === NodeType.FunctionDeclaration)
  );
}
/**
 * @description: Whether to declare the node as export
 * @param {ExportDeclaration} node
 * @return {boolean}
 */
export function isExportDeclaration(node: ExportDeclaration): boolean {
  return /^Export/.test(node.type);
}
/**
 * @description: import declaration node or not
 * @param {any} node
 * @return {boolean}
 */
export function isImportDeclaration(node: any): boolean {
  return node.type === 'ImportDeclaration';
}
