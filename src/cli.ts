import * as yargs from 'yargs'
import gen from './'

export default function main() {
  yargs
    .strict()
    .usage(`$0 [options]`, `Generate README.md file`)
    .help()
    .alias(`help`, `h`)
    .argv

  gen()
}
