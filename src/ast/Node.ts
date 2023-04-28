import type { Node as ASTNode } from '@/ast/nodeTypes'
import type { Scope } from '@/ast/Scope'

export interface Node extends ASTNode {
  parent?: Node
  _scope?: Scope
}
