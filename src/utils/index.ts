
import chalk from 'chalk'
import simpleGit from 'simple-git'

//#region GIT-SIMPLE
export const git = simpleGit({
	baseDir: process.cwd(),
	binary: 'git',
	maxConcurrentProcesses: 6,
});
//#endregion

//#endregion INFORMATION MESSAGE
export const information = {
	git_commit_message: (commitMessage: string) => console.log(commitMessage),
	git_commit_create_success: () => console.log(chalk.greenBright('Commit successfully created !')),
	git_create_branch_success: ({ ticketNumber, branchName }: { ticketNumber: number; branchName: string}) =>
		console.log(`${chalk.greenBright('✓ Branch created')}: "BRC-${ticketNumber}-${branchName.trim().replaceAll(' ', '-')}"`),
	git_pull_success: (baseBranch: string) => console.log(chalk.greenBright(`✓ Pulled latest changes of ${baseBranch}`)),
	git_rebase_success: ({ currentBranch, baseBranch }: { currentBranch: string; baseBranch: string}) => 
		console.log(chalk.greenBright(`✓ ${currentBranch} rebased with the latest changes of ${baseBranch}`)),
	invalid_choice: () => console.log('No valid choice'),
	reminder_commit_push: () =>console.log(chalk.cyan('Don\'t forget to push your commit !'))
}
//#endregion
