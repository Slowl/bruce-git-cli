
import chalk from 'chalk'
import inquirer from 'inquirer'
import { git } from '../utils/index.js'

export const create = async () => {
	const selectedBaseBranch = await inquirer.prompt({
		name: 'base_branch',
		type: 'input',
		message: 'Specify the base branch of the repo (press `enter` for default) : ',
		default() {
			return 'v3-development'
		}
	})

	const selectedTicketNumber = await inquirer.prompt({
		name: 'ticket_number',
		type: 'number',
		message: 'Write the number of your ticket : ',
		default() {
			return '1337'
		}
	})

	const branchName = await inquirer.prompt({
		name: 'name',
		type: 'input',
		message: 'Write the name of the new branch (Ex: `ma nouvelle branche`): ',
	})

	await git.checkout(selectedBaseBranch.base_branch)
	await git.pull(selectedBaseBranch.base_branch)
	console.log(chalk.greenBright(`✓ Pulled latest version of ${selectedBaseBranch.base_branch}`))
	await git.checkout(['-b', `BRC-${selectedTicketNumber.ticket_number}-${branchName.name.trim().replaceAll(' ', '-')}` ])
	console.log(chalk.greenBright('✓ Branch created'),`: "BRC-${selectedTicketNumber.ticket_number}-${branchName.name.trim().replaceAll(' ', '-')}"`)
}

export const pullAndRebaser = async () => {

	const currentBranch = await git.branch(['-a']).then(({ current }) => current)

	const selectedBaseBranch = await inquirer.prompt({
		name: 'base_branch',
		type: 'input',
		message: 'Specify the branch you want to pull and rebase to (press `enter` for default) : ',
		default() {
			return 'v3-development'
		}
	})

	await git.checkout(selectedBaseBranch.base_branch)
	await git.pull(selectedBaseBranch.base_branch)
	await git.checkout(currentBranch)
	await git.rebase([selectedBaseBranch.base_branch])
	console.log(chalk.greenBright(`✓ ${currentBranch} rebased with the latest version of ${selectedBaseBranch.base_branch}`))
}