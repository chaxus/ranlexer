import type { Node as ASTNode } from '@/parser'
import type { Scope } from '@/ast/Scope'

export interface Node extends ASTNode {
  parent?: Node
  _scope?: Scope
}
