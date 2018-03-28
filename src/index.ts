import { Command, flags } from '@oclif/command'

import starters from './starters'

class GatsbyGenerator extends Command {
  static description = 'Generate Gatsby Starters in Seconds 🎰'

  static examples = [
    `$ gatsby-generate hello world from ./src/gatsby-generator.ts!`
  ]

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'})
  }

  async run() {
    this.log('Select your starter ✨\n')
    starters.forEach(starter => {
      this.log(`* ${starter.name}`)
    })
  }
}

export = GatsbyGenerator
