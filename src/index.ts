import fs from 'node:fs'
import { dirname } from 'node:path'
import type { SourceMap } from 'magic-string'
import { Bundle } from '@/bundle'

export interface Options {
  input?: string
  output?: string
  external?: Array<string>
}

type Error = NodeJS.ErrnoException | null

interface Build {
  generate: () => {
    code: string
    map: SourceMap
  }
  write: () => Promise<[WriteFileInfo, WriteFileInfo] | undefined>
}

interface WriteFileInfo {
  success: boolean
  data:
    | {
        path: string
        content: string
      }
    | Error
}

const existsSync = (dirname: string) => fs.existsSync(dirname)

const createDir = (path: string) =>
  new Promise((resolve, reject) => {
    const lastPath = path.substring(0, path.lastIndexOf('/'))
    fs.mkdir(lastPath, { recursive: true }, (error) => {
      if (error) {
        reject({ success: false })
      } else {
        resolve({ success: true })
      }
    })
  })
/**
 * @description:
 * @param {string} path
 * @param {string} content
 * @param {BufferEncoding} format
 * @return {*}
 */
export const writeFile = (
  path: string,
  content: string,
  format: BufferEncoding = 'utf-8',
): Promise<WriteFileInfo> =>
  new Promise((resolve, reject) => {
    fs.writeFile(
      path,
      content,
      {
        mode: 438,
        flag: 'w+',
        encoding: format,
      },
      (err: Error) => {
        if (err) {
          reject({ success: false, data: err })
        } else {
          resolve({ success: true, data: { path, content } })
        }
      },
    )
  })

export function build(options: Options): Promise<Build> {
  const {
    input = './index.js',
    output = './dist/index.js',
    external = [],
  } = options
  const bundle = new Bundle({
    entry: input,
    external,
  })
  const generate = () => bundle.render()
  const write = async () => {
    try {
      const { code, map } = generate()
      if (!existsSync(dirname(output))) {
        await createDir(output)
      }
      return Promise.all([
        writeFile(output, code),
        writeFile(output + '.map', map.toString()),
      ])
    } catch (error) {
      console.warn('write bundle error', error)
    }
  }
  return bundle.build().then(() => {
    return { generate, write }
  })
}
