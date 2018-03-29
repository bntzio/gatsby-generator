import * as request from 'request-promise'
import { Command, flags } from '@oclif/command'
import { exec } from 'shelljs'
import { prompt } from 'inquirer'
import { red, bold } from 'chalk'

const url = 'https://raw.githubusercontent.com/bntzio/gatsby-generator/master/src/api/starters.json'

const fetchStarters = async () => {
  const opts: { url: string, method: string } = {
    url,
    method: 'get'
  }
  try {
    const response: any = await request(opts)
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

class GatsbyGenerator extends Command {
  static description = bold('Generate Gatsby Starters in Seconds 🎰')

  static examples = [
    `$ gatsby-generate`
  ]

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' })
  }

  async run() {
    // types
    type StartersType = { name: string, description: string, url: string }[]

    // grab starters and return them as choices for inquirer.js
    const buildChoices = (starters: StartersType) => {
      let choices: [string] | any = [] // strictNullChecks is not working! 😡

      starters.forEach(starter => {
        const choice = `${red.bold(starter.name + ':')} ${bold(starter.description)}`
        choices.push(choice)
      })

      return choices
    }

    // select the starter to start the download
    const selectStarter = (starters: StartersType) => {
      const choices = [{
        type: 'list',
        name: 'selectedStarter',
        message: 'Choose your Gatsby starter 🎰',
        choices: () => buildChoices(starters) // build choices from starters 🔨
      }]
      const projectName = [{
        type: 'input',
        name: 'chosenName',
        message: 'Enter your project name'
      }]

      return prompt(choices).then((answer: any) => {
        const selectedStarter: string = answer.selectedStarter

        starters.forEach(starter => {
          const choiceOpt = `${red.bold(starter.name + ':')} ${bold(starter.description)}`

          if (choiceOpt === selectedStarter) {
            return prompt(projectName).then((answers: any) => {
              if (answers.chosenName.length > 0) {
                this.log(bold(`\nDownloading ${starter.name} under ${answers.chosenName}...\n`))
                exec(`gatsby new ${answers.chosenName} ${starter.url}`)
                this.log(bold('\nYour Gatsby Starter was downloaded successfully ✨'))
                this.log(bold('Happy Gatsbying! 😄'))
              } else {
                this.log(red.bold('\n🚨 Error! ') + bold('The project name should be at least 1 character long!'))
              }
            })
          }
        })
      })
    }

    // fetch and run!! ✨
    const starters: any = fetchStarters()
    starters.then((result: StartersType | any) => {
      const parsedStarters: StartersType = JSON.parse(result).starters
      selectStarter(parsedStarters)
    }).catch((error: any) => {
      this.log(error)
    })
  }
}

export = GatsbyGenerator
