
import chalk from 'chalk'
import inquirer from 'inquirer'
import { pullAndRebaser } from '../branch/index.js'
import { git } from '../utils/index.js'

export const create = async () => {

	const selectedCommitType = await inquirer.prompt({
		name: 'commit_type',
		type: 'list',
		message: 'Choose the type of your commit : ',
		choices: [
			'feat',
			'fix',
			'core',
			'dependencies',
			'doc',
			'env',
			'lang',
			'style',
			'test'
		],
		default() {
			return 'feat'
		}
	})

	const selectedTicketNumber = await inquirer.prompt({
		name: 'ticket_number',
		type: 'number',
		message: 'Write the number of your ticket : ',
		default() {
			return 'BRC-'
		}
	})

	const selectedCommitScope = await inquirer.prompt({
		name: 'commit_scope',
		type: 'input',
		message: 'Write the scope of your commited files (Ex: Invoice List) : ',
	})

	const selectedCommitMessage = await inquirer.prompt({
		name: 'commit_message',
		type: 'input',
		message: 'Write the message of your commit : ',
	})

	const userWantToPullAndRebase = await inquirer.prompt({
		name: 'should_pull_and_rebase',
		type: 'list',
		message: `Pull and Rebase ${chalk.blueBright('v3-development')} ?`,
		choices: [
			{ name: `${chalk.greenBright('✓')} Yes`, value: 'yes' },
			{ name: `${chalk.redBright('✗')} No`, value: 'no' }
		],
		default() {
			return { name: `${chalk.greenBright('✓')} Yes`, value: 'yes' }
		}
	})


	const gitMessage = `
		${selectedCommitType.commit_type}: ${selectedCommitScope.commit_scope} - ${selectedCommitMessage.commit_message}

		Jira: BRC-${selectedTicketNumber.ticket_number}
		`
	await git.commit(gitMessage)

	userWantToPullAndRebase.should_pull_and_rebase === 'yes' && await pullAndRebaser()

	console.log(chalk.greenBright('Commit successfully created !'))
	console.log(gitMessage)
	console.log(chalk.blue('Don\'t forget to push your commit !'))
}
