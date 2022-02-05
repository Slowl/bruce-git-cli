#!/usr/bin/env node

import inquirer from 'inquirer'
import { create as createCommit } from './commit'
import { create as createBranch } from './branch'
import { information } from './utils'
import { SELECTED_ACTION } from './types'

let selectedAction!: SELECTED_ACTION

const initiator = async () => {
	const selectGitAction = await inquirer.prompt({
		name: 'action_type',
		type: 'list',
		message: 'What do you want to do ? ',
		choices: [
			{ name: 'Create a new branch', value: SELECTED_ACTION.CREATE_NEW_BRANCH },
			{ name: 'Commit changes', value: SELECTED_ACTION.CREATE_NEW_COMMIT }
		],
	})

	selectedAction = selectGitAction.action_type
}

await initiator()

switch (selectedAction) {
	case SELECTED_ACTION.CREATE_NEW_BRANCH: {
		await createBranch()
		break
	}
	case SELECTED_ACTION.CREATE_NEW_COMMIT: {
		await createCommit().then((commitMessage) => (
			information.git_commit_create_success,
			information.git_commit_message(commitMessage),
			information.reminder_commit_push
		))
		break
	}
}

