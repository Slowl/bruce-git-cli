#!/usr/bin/env node

import inquirer from 'inquirer'
import { create as createCommit } from './src/commit/index.js'
import { create as createBranch } from './src/branch/index.js'

let selectedAction

const initiator = async () => {
	const selectGitAction = await inquirer.prompt({
		name: 'action_type',
		type: 'list',
		message: 'What do you want to do ? ',
		choices: [
			{ name: 'Create a new branch', value: 'create_new_branch' },
			{ name: 'Commit changes', value: 'create_new_commit' }
		],
	})

	selectedAction = selectGitAction.action_type
}

await initiator()

switch (selectedAction) {
	case 'create_new_branch': {
		await createBranch()
		break
	}
	case 'create_new_commit': {
		await createCommit()
		break
	}
}

