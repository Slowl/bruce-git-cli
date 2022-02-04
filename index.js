#!/usr/bin/env node

import inquirer from 'inquirer'
import simpleGit from 'simple-git'
import chalk from 'chalk'

//#region CONSTANTS
const options = {
	baseDir: process.cwd(),
	binary: 'git',
	maxConcurrentProcesses: 6,
};
const git = simpleGit(options);

let commitType
let ticketNumber
let commitScope
let commitMessage
let shouldPullAndRebase
//#endregion

//#region FUNCTIONS
const commiter = async () => {

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
		type: 'input',
		message: 'Write the number of your ticket : ',
		default() {
			return 'BRC-'
		}
	})

	const selectedCommitScope = await inquirer.prompt({
		name: 'commit_scope',
		type: 'input',
		message: 'Write the scope of your commited files : ',
		default() {
			return 'Invoices List'
		}
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
			'YES',
			'NO',
		],
		default() {
			return 'YES'
		}
	})

	commitType = selectedCommitType.commit_type
	ticketNumber = selectedTicketNumber.ticket_number
	commitScope = selectedCommitScope.commit_scope
	commitMessage = selectedCommitMessage.commit_message
	shouldPullAndRebase = userWantToPullAndRebase.should_pull_and_rebase === 'YES'
}

const pullAndRebaser = async () => {
	const selectedBranchToPullAndReabse = await inquirer.prompt({
		name: 'base_branch',
		type: 'input',
		message: 'Write the branch you want to pull and rebase to : ',
		default() {
			return 'v3-development'
		}
	})

	await git.pull(selectedBranchToPullAndReabse.base_branch)
	await git.rebase(selectedBranchToPullAndReabse.base_branch)
}
//#endregion

//#region EXECUTION
await commiter()

const gitMessage = `
${commitType}: ${commitScope} - ${commitMessage}

Jira: BRC-${ticketNumber}
`
await git.commit(gitMessage)

shouldPullAndRebase && await pullAndRebaser()
//#region 
