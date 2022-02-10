
# 📦 gBruce - A git CLI for Bruce.work

A simple CLI to facilitate and automate some git actions, created and optimized for Bruce's conventions.



## Requires Node.js v14+
## INSTALLATION

#### Recommanded (with npx)

Simply start the script with: 
```bash
npx gbruce -- [action] [option]
```

The CLI is more useful when coupled with a terminal alias. To create one :

For Zsh
```bash
nano .zshrc 
```
For Bash
```bash
nano .bashrc 
```

And then, at the bottom of the file add this line:
```bash
alias aCustomAlias="npx gbruce --"
```

You can now start the CLI directly by using your alias `aCustomAlias` on any project.

---
#### Globally

You can also install the CLI as a global NPM package like so
```bash
npm install -g gbruce
```

You can now create an alias like explained above by pasting this line in the correct file
```bash
alias aCustomAlias="gbruce --"
```
---
#### Per project

Don't do it, it's useless for the moment

---

## HOW TO USE

The CLI allows 4 actions (for the moment).


#### `gbruce branch`
This action will guide you to create a branch with the good naming convention. It will:

- Automatically __checkout__ and __pull__ changes from the specified base branch (meaning you can call this action from __any__ branch).
- Create a branch up-to-date with the base branch, and correct naming convention.

---

#### `gbruce commit [option]`
This action will guide you to create a commit with the good naming convention. It will:

- Create a commit step by step with all the information needed for a __valid__ commit (or @theFreedomBanana will fuck you up).
- (optional) __Pull__ and __rebase__ the base branch specified.
- (optional) __Push__ the branch to remote (it'll add it to the remote if it's a new branch).

| Option           | Description | Value |
| :--------------: | :-----: |:-------:|
| `-r`             | To use if you want to make a rebase after the commit | false |
| `-p`             |  To use if you want to push your changes directly after the commit  | false |

---

#### `gbruce rebase [option]`

This action will make a rebase action with some automation. It will:

- __Checkout__ and __pull__ the base branch (`v3-development` by default, if no option specified).
- __Rebase__ the base branch on the current branch.

| Option           | Description | Value |
| :--------------: | :-----: |:-------:|
| `-b` `<name-of-the-base-branch>`| To use only if you want to rebase an other branch than -> | `v3-development` |

---

#### `gbruce push [option]`

This action will make a push action with some automation. It will:

- __Checkout__ on the specified branch (or stay on current branch), meaning that you can call this action __from any branch__.
- __Push__ the branch and its changes (will automatically add it to remote if the branch doesn't exist).

| Option           | Description | Value |
| :--------------: | :-----: |:-------:|
| `-b` `<name-of-the-branch-to-push>`| To use only if you want to push an other branch than -> | `<current-branch>` |
| `-f`| Specify if you want to push --force | false |

---

#### `gbruce help`

This action will show you all the available actions and their accepted argument(s)