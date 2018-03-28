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

    // types
    // type QuestionType = [{ type: string, name: string, message: string }]
    type StartersType = { name: string, description: string, url: string }

    const buildChoices = (starters: [StartersType]) => {
      let choices: [string] | any = [] // strictNullChecks is not working! 😡
      starters.forEach((starter: StartersType) => {
        const choice = `${starter.name} - ${starter.description}`
        choices.push(choice)
      })
      return choices
    }

    const choices = [
      {
        type: 'list',
        name: 'selectedStarter',
        message: 'Choose your Gatsby starter ✨',
        choices: () => buildChoices(starters)
      }
    ]

    // const questions: QuestionType = [
    //   {
    //     type: 'input',
    //     name: 'name',
    //     message: `What's your name?`
    //   }
    // ]

    const mainPrompt = () => {
      return prompt(choices).then((answer: any) => {
        const starter: string = answer.selectedStarter
        this.log(`Your starter is ${starter}`)
      })
    }
    mainPrompt()

    // exec('gatsby new my-awesome-starter https://github.com/bntzio/gatsby-starter-superstylin')
    // this.log('\nDone! ✨')
  }
}

export = GatsbyGenerator
