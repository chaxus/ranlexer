import { keys, values } from '@/utils/object'
import type { Module } from '@/module'
import type { Statement } from '@/ast/statement'
import { Reference } from '@/ast/Reference'

export class Declaration {
  isFunctionDeclaration: boolean = false
  functionNode: any
  statement: Statement | null
  name: string | null = null
  isParam: boolean = false
  isUsed: boolean = false
  isReassigned: boolean = false
  constructor(node: any, isParam: boolean, statement: Statement | null) {
    // Consider function and variable declarations
    if (node) {
      if (node.type === 'FunctionDeclaration') {
        this.isFunctionDeclaration = true
        this.functionNode = node
      } else if (
        node.type === 'VariableDeclarator' &&
        node.init &&
        /FunctionExpression/.test(node.init.type)
      ) {
        this.isFunctionDeclaration = true
        this.functionNode = node.init
      }
    }
    this.statement = statement
    this.isParam = isParam
  }

  addReference(reference: Reference): void {
    reference.declaration = this
    this.name = reference.name
  }

  use(): void {
    // Flags that the node is in use
    this.isUsed = true
    // The corresponding statement node should also be marked
    if (this.statement) {
      this.statement.mark()
    }
  }
  // Also, you can add the render method to facilitate subsequent code generation steps
  render(): string | null {
    return this.name
  }
}

export class SyntheticDefaultDeclaration extends Declaration {
  original: Declaration | null
  exportName: string | null
  constructor(node: any, name: string, statement: Statement) {
    super(node, false, statement)
    this.original = null
    this.exportName = ''
    this.name = name
  }

  render(): string | null {
    return this.original?.render() || this.name
  }

  bind(declaration: Declaration): void {
    this.original = declaration
  }
}

export class SyntheticNamespaceDeclaration extends Declaration {
  module: Module
  originals: Record<string, Declaration> = {}
  needsNamespaceBlock: boolean = false
  constructor(module: Module) {
    super(null, false, null)
    this.module = module
    module.getExports().forEach((name) => {
      const declaration = module.traceExport(name)
      if (declaration) {
        this.originals[name] = declaration
      }
    })
  }

  addReference(reference: Reference): void {
    if (!this.needsNamespaceBlock) {
      this.needsNamespaceBlock = true
    }
    if (reference.objectPaths.length) {
      const ref = reference.objectPaths.shift()
      reference.name = ref.name
      reference.start = ref.start
      reference.end = ref.end
    }
    values(this.originals).forEach((declaration) => {
      declaration.addReference(reference)
    })
    // Must be on the final execution, because will give the reference and the current SyntheticNamespaceDeclaration binding
    super.addReference(reference)
  }

  renderBlock(intentString = '  '): string {
    const members = keys(this.originals)
      .map((name: string) => {
        const originDeclaration = this.originals[name]
        return `${intentString}${name}: ${originDeclaration.render()}`
      })
      .join(',\n')
    return `const ${this.render()} = Object.freeze({\n${members}\n});`
  }

  use(): void {
    for (const original of values(this.originals)) {
      original.use()
    }
  }
}

export { Reference }
