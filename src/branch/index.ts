
import inquirer from 'inquirer'
import { git, information } from '../utils'

export const create = async () => {
	const selectedBaseBranch: { base_branch: string } = await inquirer.prompt({
		name: 'base_branch',
		type: 'input',
		message: 'Specify the base branch of the repo (press `enter` for default) : ',
		default() {
			return 'v3-development'
		}
	})

	const selectedTicketNumber: { ticket_number: number } = await inquirer.prompt({
		name: 'ticket_number',
		type: 'number',
		message: 'Write the number of your ticket : ',
		default() {
			return '1337'
		}
	})

	const branchName: { name: string } = await inquirer.prompt({
		name: 'name',
		type: 'input',
		message: 'Write the name of the new branch (Ex: `ma nouvelle branche`): ',
	})

	await git.checkout(selectedBaseBranch.base_branch)
	await git.pull(selectedBaseBranch.base_branch).then(() => information.git_pull_success(selectedBaseBranch.base_branch))
	await git.checkout(['-b', `BRC-${selectedTicketNumber.ticket_number}-${branchName.name.trim().replaceAll(' ', '-')}` ]).then(
		() => information.git_create_branch_success({ ticketNumber: selectedTicketNumber.ticket_number, branchName: branchName.name })
	)
}

export const pullAndRebaser = async () => {

	const currentBranch = await git.branch(['-a']).then(({ current }) => current)

	const selectedBaseBranch: { base_branch: string } = await inquirer.prompt({
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
	await git.rebase([selectedBaseBranch.base_branch]).then(
		() => information.git_rebase_success({ currentBranch, baseBranch: selectedBaseBranch.base_branch })
	)
}