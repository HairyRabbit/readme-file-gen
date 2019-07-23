import * as vm from 'vm'

export default function render<T>(template: string, data: T): string {
  const code = '`' + escape(template) + '`'
  const sandbox = vm.createContext(data)
  return vm.runInContext(code, sandbox)
}

function escape(value: string): string {
  return value.replace(/\`/g, `\\\``)
}
