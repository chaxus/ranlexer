import type { Statement } from '@/ast/Statements'
import { keys } from '@/utils/object'
import { Declaration } from '@/ast/Declaration'

interface ScopeOptions {
  parent?: Scope
  paramNodes?: any[]
  block?: boolean
  statement: Statement
  isTopLevel?: boolean
}
/**
 * @description: Encapsulates basic scope-related information
 * @return {*}
 */
export class Scope {
  // Parent scope
  parent?: Scope
  // In the case of function scope, parameter nodes are required
  paramNodes: any[]
  // Whether it is block-level scope
  isBlockScope?: boolean
  // The statement node corresponding to the scope
  statement: Statement
  // The variable/function declares the node, which is the core data of Scope
  declarations: Record<string, Declaration> = {}
  constructor(options: ScopeOptions) {
    const { parent, paramNodes, block, statement } = options
    this.parent = parent
    this.paramNodes = paramNodes || []
    this.statement = statement
    this.isBlockScope = !!block
    this.paramNodes.forEach(
      (node) =>
        (this.declarations[node.name] = new Declaration(
          node,
          true,
          this.statement,
        )),
    )
  }

  addDeclaration(node: any, isBlockDeclaration: boolean): void {
    // block scope & var, tracing up to the top-level scope
    if (this.isBlockScope && !isBlockDeclaration && this.parent) {
      this.parent.addDeclaration(node, isBlockDeclaration)
      return
    }
    // Otherwise, create a new Declaration node in the current scope.
    const key = node.id && node.id.name
    this.declarations[key] = new Declaration(node, false, this.statement)
  }
  /**
   * @description: Traversal Declaration node
   * @param {function} fn
   * @return {*}
   */
  eachDeclaration(fn: (name: string, dec: Declaration) => void): void {
    keys(this.declarations).forEach((key) => {
      fn(key, this.declarations[key])
    })
  }

  contains(name: string): Declaration {
    return this.findDeclaration(name)
  }

  findDeclaration(name: string): Declaration {
    return (
      this.declarations[name] ||
      (this.parent && this.parent.findDeclaration(name))
    )
  }
}
