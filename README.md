
# gBruce - A git CLI for Bruce.work




# Requires Node.js v14+

## Start

To start the CLI just : 

```bash
  npx gbruce
```
The CLI is more useful if you couple it with an alias:

```bash
nano .zshrc
OR
nano .bashrc
```

and then add at the bottom of your file this line:

```bash
  alias aCustomAliasName="npx gbruce"
```

And now, you can simply run `aCustomAliasName` in your terminal to start the CLI.

## Documentation

After starting the CLI, you'll be prompted to choose between 2 options : 

- Create a new branch
- Commit changes


#### Create a new branch

This option will guide you step by step to checkout to your base branch (`v3-development` by default), pull from your base branch and create a new branch already formated like this: 

`BRC-XXXX-the-new-of-your-branch`


#### Commit changes

This option will guide you step by step to create a commit, pull and rebase on a selected branch (`v3-development` by default)

The commit will be formated like this : 
```
typeOfTheCommit: Scope of the Commit - Message of the commit

Jira: BRC-NumberOfYourJiraTicket
```
or concretely it will look like this:

```
feat: Invoices List - update the list with new filters and status

Jira: BRC-667
```