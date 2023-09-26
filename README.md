# SOLITAIRE

## Requirements

For development, you will only need Node.js installed on your environement.
And please go through the [DeveloperGuide](https://docs.google.com/document/d/1WRBPJQYTfw3Fmyx2XsdOVp5oZj4ZxvAv6XrZUBM_Poo/edit) before starting development.

### Node

[Node](http://nodejs.org/) is really easy to install.
You should be able to run the following command after the installation procedure
below.

[PNPM](https://pnpm.io/motivation) is an alternative package manager for Node. js which stands for “Performant NPM”. The main purpose of PNPM is to hold all the packages at a global (centralized) store and use them if needed by other projects too by creating hard links to it.

    $ node --version
    v18.17.0

    $ pnpm --version
    8.6.11

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `pnpm` might need it.

---

## Install

    $ git clone https://github.com/KGK-Live/solitaire.git
    $ cd solitaire
    $ pnpm install

## Create env file

replace the example env file with actual values. taking .env.local.example

## Backend

dependency on Backend (needs to be deployed)

## Start development server

development: pnpm dev
test: pnpm run test
generate coverage: pnpm run test --coverage
storybook: pnpm storybook
