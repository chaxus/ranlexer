import { dirname, resolve } from 'node:path'
import type { Module } from '@/module'
import type { Statement } from '@/ast/Statement'
import { ModuleLoader } from '@/moduleLoader'
import type { Bundle } from '@/bundle'
import { keys } from '@/utils/object'

interface GraphOptions {
  entry: string
  bundle: Bundle
  external: Array<string>
}

/**
 * @description: The module depends on the implementation of the graph object
 * @return {*}
 */
export class Graph {
  entryPath: string
  basedir: string
  statements: Statement[] = []
  moduleLoader: ModuleLoader
  modules: Module[] = []
  moduleById: Record<string, Module> = {}
  resolveIds: Record<string, string> = {}
  orderedModules: Module[] = []
  bundle: Bundle
  constructor(options: GraphOptions) {
    const { entry, bundle, external } = options
    this.entryPath = resolve(entry)
    this.basedir = dirname(this.entryPath)
    this.bundle = bundle
    this.moduleLoader = new ModuleLoader({ bundle, external })
  }

  async build(): Promise<void> {
    const entryModule = await this.moduleLoader.fetchModule(
      this.entryPath,
      '',
      true,
    )
    this.modules.forEach((module) => module.bind())
    this.orderedModules = this.sortModules(entryModule!)
    entryModule!.getExports().forEach((name) => {
      const declaration = entryModule!.traceExport(name)
      declaration!.use()
    })
    this.handleNameConflict()
  }

  handleNameConflict(): void {
    const used: Record<string, true> = {}

    function getSafeName(name: string) {
      let safeName = name
      let count = 1
      while (used[safeName]) {
        safeName = `${name}$${count++}`
      }
      used[safeName] = true
      return safeName
    }

    this.modules.forEach((module) => {
      keys(module.declarations).forEach((name) => {
        const declaration = module.declarations[name]
        declaration.name = getSafeName(declaration.name!)
      })
    })
  }

  getModuleById(id: string): Module {
    return this.moduleById[id]
  }

  addModule(module: Module): void {
    if (!this.moduleById[module.id]) {
      this.moduleById[module.id] = module
      this.modules.push(module)
    }
  }

  sortModules(entryModule: Module): Module[] {
    const orderedModules: Module[] = []
    const analysisModule: Record<string, boolean> = {}
    const parent: Record<string, string> = {}
    const cyclePathList: string[][] = []
    function getCyclePath(id: string, parentId: string): string[] {
      const paths = [id]
      let currentId = parentId
      while (currentId !== id) {
        paths.push(currentId)
        // 向前回溯
        currentId = parent[currentId]
      }
      paths.push(paths[0])
      return paths.reverse()
    }
    function analyzeModule(module: Module) {
      if (analysisModule[module.id]) {
        return
      }
      for (const dependency of module.dependencyModules) {
        if (parent[dependency.id]) {
          if (!analysisModule[dependency.id]) {
            cyclePathList.push(getCyclePath(dependency.id, module.id))
          }
          continue
        }
        parent[dependency.id] = module.id
        analyzeModule(dependency)
      }
      analysisModule[module.id] = true
      orderedModules.push(module)
    }
    analyzeModule(entryModule)
    if (cyclePathList.length) {
      cyclePathList.forEach((paths) => {
        console.log(paths)
      })
      process.exit(1)
    }
    return orderedModules
  }
}
