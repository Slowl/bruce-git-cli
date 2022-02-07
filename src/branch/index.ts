
import inquirer from 'inquirer'
import { git, information } from '../utils/index.js'

export const create = async () => {
	const selectedBaseBranch: { base_branch: string } = await inquirer.prompt({
		name: 'base_branch',
		type: 'input',
		message: 'Specify the base branch of the repo (press `enter` for default): ',
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

export const rebase = async ({ b }: { b?: string }) => {

	const baseBranch = b ?? 'v3-development'
	const currentBranch = await git.branch(['-a']).then(({ current }) => current)

	await git.checkout(baseBranch)
	await git.pull(baseBranch)
	await git.checkout(currentBranch)
	await git.rebase([baseBranch]).then(
		() => information.git_rebase_success({ currentBranch, baseBranch })
	)
}

export const push = async ({ b, f, displayMessage = true }: { b?: string; f?: boolean; displayMessage?: boolean; }) => {

	const currentBranch = await git.branch(['-a']).then(({ current }) => current)
	const branchToPush = b ?? currentBranch
	const remoteBranchExist = await git.listRemote(['origin', branchToPush]).then((response) => response)

	await git.checkout(branchToPush)
	remoteBranchExist && !f && await git.pull('origin', branchToPush)
	await git.push('origin', branchToPush, f ? ['-f'] : []).then(
		() => displayMessage && information.git_branch_push_success({ branchToPush })
	)
}

export const pullAndRebaser = async ({ currentBranch }: { currentBranch: string }) => {

	const selectedBaseBranch: { base_branch: string } = await inquirer.prompt({
		name: 'base_branch',
		type: 'input',
		message: 'Specify the branch you want to pull and rebase to (press `enter` for default): ',
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
