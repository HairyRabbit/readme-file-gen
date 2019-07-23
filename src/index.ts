import readPkgUp from 'read-pkg-up'
import * as fs from 'fs'
import * as path from 'path'
import render from './render'
import { Package } from 'normalize-package-data';

const DEFAULT_TEMPLATE_PATH: string = `./template.txt`

interface Data extends Package {

}

export interface Options {
  template: string
}

export default async function main(options: Partial<Options> = {}) {
  const { template } = options
  const pkg = await readPkgUp({ normalize: true })
  if(undefined === pkg) throw makeConfigFileNotFoundError()
  const templatePath: string = template || path.resolve(__dirname, DEFAULT_TEMPLATE_PATH)
  const tpl: string = fs.readFileSync(templatePath, `utf-8`)

  const result: string = render<Data>(tpl, pkg.package)
  const output: string = path.resolve(path.dirname(pkg.path), `README.md`)
  fs.writeFileSync(output, result, `utf-8`)
}

function makeConfigFileNotFoundError(): Error {
  return new Error(`package.json not found`)
}
