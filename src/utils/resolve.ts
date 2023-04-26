import { dirname, extname, isAbsolute, resolve } from 'node:path'

export function removeExtension(p: string): string {
  return p.replace(extname(p), '')
}

const extensions = '.js'

const getFileType = (val: string): string => {
  return val.substring(val.lastIndexOf('.') + 1)
}
/**
 * @description: Returns the full path
 * @param {string} id
 * @param {string} importer
 */
export function defaultResolver(
  id: string,
  importer: string | null,
): string | false {
  if (getFileType(id) !== 'js') {
    id += '.js'
  }
  if (isAbsolute(id)) {
    return id
  }
  if (!id.startsWith('.')) return false
  const resolvedPath = importer ? resolve(dirname(importer), id) : resolve(id)
  return resolvedPath
}
