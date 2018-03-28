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
    // types
    type StartersType = [{ name: string, description: string, url: string }]

    // grab starters and return them as choices for inquirer.js
    const buildChoices = (starters: StartersType) => {
      let choices: [string] | any = [] // strictNullChecks is not working! 😡
      starters.forEach(starter => {
        const choice = `${starter.name} - ${starter.description}`
        choices.push(choice)
      })
      return choices
    }

    // select the starter to start the download
    const selectStarter = (starters: StartersType) => {
      const choices = [{
        type: 'list',
        name: 'selectedStarter',
        message: 'Choose your Gatsby starter ✨',
        choices: () => buildChoices(starters) // build choices from starters 🔨
      }]

      return prompt(choices).then((answer: any) => {
        const selectedStarter: string = answer.selectedStarter

        starters.forEach(starter => {
          const choiceOpt = `${starter.name} - ${starter.description}`
          if (choiceOpt === selectedStarter) {
            this.log(`Downloading ${starter.name}...`)
            exec(`gatsby new my-awesome-starter ${starter.url}`)
            this.log('\nYour Gatsby Starter was downloaded successfully ✨')
            this.log('Happy Gatsbying! 😄')
          }
        })
      })
    }

    // run!! ✨
    selectStarter(starters)
  }
}

export = GatsbyGenerator
