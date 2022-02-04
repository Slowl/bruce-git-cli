
import simpleGit from 'simple-git'

//#region GIT-SIMPLE
const options = {
	baseDir: process.cwd(),
	binary: 'git',
	maxConcurrentProcesses: 6,
};
export const git = simpleGit(options);
//#endregion
