
import chalk from 'chalk'
import inquirer from 'inquirer'
import { pullAndRebaser } from '../branch/index.js'
import { git } from '../utils/index.js'

export const create = async ({ r, p }: { r?: boolean, p?: boolean }) => {

	const currentBranch = await git.branch(['-a']).then(({ current }) => current)

	const selectedCommitType: {
		commit_type: 'feat' | 'fix' | 'core' | 'dependencies' | 'doc' | 'env' | 'lang' | 'style' | 'test'
	} = await inquirer.prompt({
		name: 'commit_type',
		type: 'list',
		message: 'Choose the type of your commit: ',
		choices: [
			'feat',
			'fix',
			'core',
			'dependencies',
			'doc',
			'env',
			'lang',
			'style',
			'test',
		],
		default() {
			return 'feat'
		}
	})

	const selectedTicketNumber: { ticket_number: number } = await inquirer.prompt({
		name: 'ticket_number',
		type: 'number',
		message: 'Write the number of your ticket: ',
		default() {
			return 'BRC-XXXX'
		}
	})

	const selectedCommitScope: { commit_scope: string } = await inquirer.prompt({
		name: 'commit_scope',
		type: 'input',
		message: 'Write the scope of your commited files (Ex: Invoice List): ',
	})

	const selectedCommitMessage: { commit_message: string } = await inquirer.prompt({
		name: 'commit_message',
		type: 'input',
		message: 'Write the message of your commit: ',
	})

	const userWantToPush: { should_push: boolean } = !p ? await inquirer.prompt({
		name: 'should_push',
		type: 'list',
		message: 'Do you want to push the branch?',
		choices: [
			{ name: `${chalk.greenBright('✓')} Yes`, value: true },
			{ name: `${chalk.redBright('✗')} No`, value: false }
		],
		default() {
			return { name: `${chalk.greenBright('✓')} Yes`, value: true }
		}
	}) : { should_push: true }

	const userWantToPullAndRebase: { should_pull_and_rebase: boolean } = !r ? await inquirer.prompt({
		name: 'should_pull_and_rebase',
		type: 'list',
		message: `Pull and Rebase a specific branch?`,
		choices: [
			{ name: `${chalk.greenBright('✓')} Yes`, value: true },
			{ name: `${chalk.redBright('✗')} No`, value: false }
		],
		default() {
			return { name: `${chalk.greenBright('✓')} Yes`, value: true }
		}
	}) : { should_pull_and_rebase: true }

	const gitCommitMessage = `
${selectedCommitType.commit_type}: ${selectedCommitScope.commit_scope && (`${`${selectedCommitScope.commit_scope} - `}`)}${selectedCommitMessage.commit_message}

Jira: BRC-${selectedTicketNumber.ticket_number}
`
	await git.commit(gitCommitMessage)

	userWantToPullAndRebase.should_pull_and_rebase && await pullAndRebaser({ currentBranch })
	userWantToPush.should_push && await git.push(['-u', 'origin', currentBranch])

	return { gitCommitMessage, currentBranch, isPushed: userWantToPush.should_push }
}
