import * as MagicString from 'magic-string'
import type { Module } from '@/module'
import { Graph } from '@/graph'

interface BundleOptions {
  entry: string
  external: Array<string>
}

export class Bundle {
  graph: Graph
  constructor(options: BundleOptions) {
    this.graph = new Graph({
      entry: options.entry,
      bundle: this,
      external: options.external,
    })
  }

  async build(): Promise<void> {
    return await this.graph.build()
  }

  getModuleById(id: string): Module {
    return this.graph.getModuleById(id)
  }

  addModule(module: Module): void {
    return this.graph.addModule(module)
  }
  /**
   * @description: Code generation logic, splicing module AST node, output code
   * @return {*}
   */
  render(): { code: string; map: MagicString.SourceMap } {
    const msBundle = new MagicString.Bundle({ separator: '\n' })

    this.graph.orderedModules.forEach((module) => {
      msBundle.addSource({
        content: module.render(),
      })
    })

    const map = msBundle.generateMap({ includeContent: true })
    return {
      code: msBundle.toString(),
      map,
    }
  }
}
