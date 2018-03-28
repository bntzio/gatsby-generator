import { Command, flags } from '@oclif/command'
import { exec } from 'shelljs'
import { prompt } from 'inquirer'

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

    // this.log('\nDownloading Superstylin...')

    type QuestionType = [{ type: string, name: string, message: string }]
    const questions: QuestionType = [
      {
        type: 'input',
        name: 'name',
        message: `What's your name?`
      }
    ]

    const mainPrompt = (questions: QuestionType) => {
      return prompt(questions).then((answers: { name: string }) => {
        const name: string = answers.name
        this.log(`Your name is ${name}`)
      })
    }
    mainPrompt(questions)

    // exec('gatsby new my-awesome-starter https://github.com/bntzio/gatsby-starter-superstylin')
    // this.log('\nDone! ✨')
  }
}

export = GatsbyGenerator
