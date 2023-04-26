import type { Statement } from '@/statement'
import type { Scope } from '@/ast/Scope'
import type { Declaration } from '@/ast/Declaration'
/**
 * @description: Records reference relationships between other nodes and Declaration nodes
 */
export class Reference {
  node: any
  scope: Scope
  statement: Statement
  // The declaration information is supplemented in the section of the build dependency diagram
  declaration: Declaration | null = null
  name: string
  start: number
  end: number
  objectPaths: any[] = []
  constructor(node: any, scope: Scope, statement: Statement) {
    this.node = node
    this.scope = scope
    this.statement = statement
    this.start = node.start
    this.end = node.end
    let root = node
    this.objectPaths = []
    while (root.type === 'MemberExpression') {
      this.objectPaths.unshift(root.property)
      root = root.object
    }
    this.objectPaths.unshift(root)
    this.name = root.name
  }
}
