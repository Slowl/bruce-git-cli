
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
	git_branch_push_success: ({ branchToPush }: { branchToPush: string }) => console.log(chalk.greenBright(`✓ Branch ${branchToPush} successfully pushed !`)),
	git_commit_message: (commitMessage: string) => console.log(commitMessage),
	git_commit_create_success: () => console.log(chalk.greenBright('✓ Commit successfully created !')),
	git_create_branch_success: ({ ticketNumber, branchName }: { ticketNumber: number; branchName: string}) =>
		console.log(`${chalk.greenBright('✓ Branch created')}: "BRC-${ticketNumber}-${branchName.trim().replaceAll(' ', '-')}"`),
	git_pull_success: (baseBranch: string) => console.log(chalk.greenBright(`✓ Pulled latest changes of ${baseBranch}`)),
	git_rebase_success: ({ currentBranch, baseBranch }: { currentBranch: string; baseBranch: string}) => 
		console.log(chalk.greenBright(`✓ ${currentBranch} rebased with the latest changes of ${baseBranch}`)),
	invalid_arguments: () => console.log(`${chalk.redBright('✗')} No valid action. Use the action ${chalk.greenBright('help')} to see available actions`),
	reminder_commit_push: () => console.log(chalk.cyan('Don\'t forget to push your commit !')),
	help: () => console.log(`
• gbruce -- ${chalk.greenBright('branch')}: Create a new branch with Bruce's naming convention.

• gbruce -- ${chalk.greenBright('commit')} ${chalk.redBright('[option]')}: Create a new commit with Bruce's naming convention.
		${chalk.redBright('-r')}: Pull and rebase the base branch.
		${chalk.redBright('-p')}: Push your commit.

• gbruce -- ${chalk.greenBright('rebase')} ${chalk.redBright('[option]')}: Will pull and rebase to v3-development, or another defined branch.
		${chalk.redBright('-b <name_of_a_branch')}: Define your base branch.

• gbruce -- ${chalk.greenBright('push')} ${chalk.redBright('[option]')}: Will checkout and push the commit, and the branch if it doesn't exist in remote.
		${chalk.redBright('-b <name_of_a_branch')}: Define the branch you want to push.
		${chalk.redBright('-f')}: Push --force your commit.

Check the README for more detailed informations: ${chalk.cyan('https://github.com/Slowl/bruce-git-cli')}
`)
}
//#endregion
