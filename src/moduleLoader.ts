import { readFile } from 'node:fs/promises'
import { Module } from '@/module'
import { defaultResolver } from '@/utils/resolve'
import type { Bundle } from '@/bundle'

interface ModuleLoaderOptions {
  bundle: Bundle
  external: Array<string>
}

/**
 * @description: Call resolveId to resolve the Module path. 2. Initialize the module instance (Module object) and parse AST 3. Recursively initializes all dependent modules of a module
 * @return {ModuleLoader}
 */
export class ModuleLoader {
  bundle: Bundle
  resolveIdsMap: Map<string, string | false> = new Map()
  external: string[]
  constructor(options: ModuleLoaderOptions) {
    const { bundle, external } = options
    this.bundle = bundle
    this.external = external
  }
  /**
   * @description: Analytic module logic
   * @param {string} id
   * @param {string} importer
   * @return {string | false}
   */
  resolveId(id: string, importer: string = ''): string | false {
    const cacheKey = id + importer
    if (this.resolveIdsMap.has(cacheKey)) {
      return this.resolveIdsMap.get(cacheKey)!
    }
    const resolved = defaultResolver(id, importer)
    this.resolveIdsMap.set(cacheKey, resolved)
    return resolved
  }
  /**
   * @description: Load the module content and parse it
   * @return {Promise<Module | null>}
   */
  async fetchModule(
    id: string,
    importer: string,
    isEntry = false,
    bundle: Bundle = this.bundle,
    loader: ModuleLoader = this,
  ): Promise<Module | null> {
    const path = this.resolveId(id, importer)

    if (path === false) {
      return null
    }
    const existModule = this.bundle.getModuleById(path)
    if (existModule) {
      return existModule
    }
    const code = await readFile(path, { encoding: 'utf-8' })
    const module = new Module({
      path,
      code,
      bundle,
      loader,
      isEntry,
      external: this.external,
    })
    this.bundle.addModule(module)
    await this.fetchAllDependencies(module)
    return module
  }

  async fetchAllDependencies(module: Module): Promise<void> {
    await Promise.all(
      module.dependencies.map((dep) => {
        return this.fetchModule(dep, module.path)
      }),
    )
  }
}
