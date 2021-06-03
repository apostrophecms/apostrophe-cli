# Changelog

## 3.0.0 - UNRELEASED

- Documents and prioritizes the existing `apos` command alias as the CLI
command.
- More colors! Command logs are no longer all an ❗️alarming❗️ shade of red. Red now means errors.

### Breaks

- The Apostrophe CLI no longer supports running core and Apostrophe module tasks. The CLI tool was providing an alias for these `apos apostrophe-users:add admin admin`. These can all still be run more directly on the command line with `node app`, e.g., `node app apostrophe-users:add admin admin`.

## 2.3.7 - 2021-06-02

### Fixes

- Updates `hosted-git-info` for a vulnerability warning.

## 2.3.6 - 2020-12-14

* Replaces `prompt` with `prompts` to fix a Node.js 14 incompatibility.
* Explicitly notes a Node.js 8+ requirement. ApostropheCMS already requires Node 8+.
* Fix circular dependency warning in Node.js 14 (updated dependencies took care of this).

## 2.3.5 - 2020-07-15

* Removes an unnecessary API call to Github that causes problems for people behind a firewall.
* Cleans up eslint errors.
* Removes `sync-request` as a dependency.
* Adds `--dev` flag to `npm update` when running `create-project` with the `--setup` flag so that devDependencies are installed.

## 2.3.4 - 2020-05-18

### Adds

* Documents and prioritizes the existing `apos` command alias as the CLI command.

## 2.3.3 - 2020-05-06

* Cleans up CLI output spacing. Also adds ESLint testing and documents the `--boilerplate` option.

## 2.3.2

* Updates the lodash version to address a reported vulnerability.

## 2.3.1

* Recognize `apostrophe-open-museum` as a default value for `shortName` so it can be autoreplaced for a new project.

## 2.3.0

* Automatically configures `disabledFileKey` for projects that have that option in `app.js` (not present in the standard apostrophe-boilerplate but we use it in our own in-house boilerplate). See the `uploadfs` documentation for the benefits.

## 2.2.0

* Automatically generates session secret, if the boilerplate has a placeholder for it (and apostrophe-boilerplate now does).

## 2.1.5

* Shortnames are not titles, data/local.js doesn't have an example worth copying in and isn't essential in dev

## 2.1.4

* Uses `npm update` rather than `npm install` so that we're not married to an ancient patchlevel of Apostrophe from the start when birthing a new project.

## 2.1.3

* Fixed pieces generator.

## 2.1.1-2.1.2

* Removed bad dependencies and bad patches.

## 2.1.0

* Added commands for widget, piece, and module creation. Updated documentation.
