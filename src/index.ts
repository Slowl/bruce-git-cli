#!/usr/bin/env node

import { create as createCommit } from './commit/index.js'
import { create as createBranch, rebase } from './branch/index.js'
import minimist from 'minimist'
import { information } from './utils/index.js'
import { ACTION } from './types/index.js'

const action = minimist(process.argv.slice(2))._[0]
const { r, b, p } = minimist(process.argv.slice(2))

switch (action) {
	case ACTION.BRANCH: {
		await createBranch()
		break
	}
	case ACTION.COMMIT: {
		await createCommit({ r, p }).then(({ gitCommitMessage, currentBranch, isPushed }) => {
			information.git_commit_create_success()
			information.git_commit_message(gitCommitMessage)
			isPushed ? information.git_branch_push_success({ branchToPush: currentBranch }) : information.reminder_commit_push()
		})
		break
	}
	case ACTION.REBASE: {
		await rebase({ b })
		break
	}
	default: {
		information.invalid_arguments()
	}
}

