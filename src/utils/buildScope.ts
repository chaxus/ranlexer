import { Scope } from '@/ast/Scope';
import type { Statement } from '@/ast/Statements';
import type {
  FunctionDeclaration,
  Node,
  VariableDeclaration,
  VariableDeclarator,
} from '@/ast/NodeType';
import { NodeType } from '@/ast/NodeType';
import { walk } from '@/utils/walk';
/**
 * @description: Build the scope chain
 * @param {Statement} statement
 * @return {*}
 */
export function buildScope(statement: Statement): void {
  const { node, scope: initialScope } = statement;
  let scope = initialScope;
  walk(node, {
    enter(node: Node) {
      // function foo () {...}
      if (node.type === NodeType.FunctionDeclaration) {
        scope.addDeclaration(node, false);
      }
      // var let const
      if (node.type === NodeType.VariableDeclaration) {
        const currentNode = node as VariableDeclaration;
        const isBlockDeclaration = currentNode.kind !== 'var';
        currentNode.declarations.forEach((declarator: VariableDeclarator) => {
          scope.addDeclaration(declarator, isBlockDeclaration);
        });
      }

      let newScope;

      // function scope
      if (node.type === NodeType.FunctionDeclaration) {
        const currentNode = node as FunctionDeclaration;
        newScope = new Scope({
          parent: scope,
          block: false,
          paramNodes: currentNode.params,
          statement,
        });
      }

      // new block state
      if (node.type === NodeType.BlockStatement) {
        newScope = new Scope({
          parent: scope,
          block: true,
          statement,
        });
      }
      if (newScope) {
        Object.defineProperty(node, '_scope', {
          value: newScope,
          configurable: true,
        });

        scope = newScope;
      }
    },
    leave(node: Node) {
      if (node._scope && scope.parent) {
        scope = scope.parent;
      }
    },
  });
}
