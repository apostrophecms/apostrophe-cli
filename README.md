# apostrophe-cli

The apostrophe-cli is a cross-platform starting point for creating and configuring [ApostropheCMS](https://github.com/apostrophecms/apostrophe) projects, providing a simple boilerplate generator and wrapping other useful functions into an easy to use command line tool.

First, install apostrophe-cli as a global NPM module:
```bash
npm install -g apostrophe-cli
```

To view the available commands in a given context, execute the newly-installed command with no arguments:
```bash
apostrophe
```

## Create a project

To create a new project with the tool:
```bash
apostrophe create-project <shortname-without-spaces>
```

This will create a local copy of our standard [Apostrophe Boilerplate](https://github.com/apostrophecms/apostrophe-boilerplate).

### options

Run `create-project` with a `--boilerplate` flag to start from a Github repository other than the standard `apostrophe-boilerplate` repo. For example, `apostrophe create-project <shortname-without-spaces> --boilerplate=https://github.com/apostrophecms/apostrophe-open-museum.git` would create a project using the [Open Museum](https://github.com/apostrophecms/apostrophe-open-museum) demo.

If you run the `create-project` command with the `--setup` flag, the command will also `npm install` the dependencies for the project and run `apostrophe-users:add` to create an admin user for the CMS, resulting in a fully bootstrapped project. This command will prompt you for a password for the admin user being created.

## Create a widget
To bootstrap the necessary files and basic configuration for a new Apostrophe widget, run the following command from within your Apostrophe project's root directory:
```bash
# "-widgets" will automatically be appended to the end of your module name
apostrophe create-widget fancy-button
```

## Create a piece
To bootstrap the necessary files and basic configuration for a new Apostrophe piece type, run the following command from within your Apostrophe project's root directory:
```bash
# be sure to use the SINGULAR version of the name of your content type
apostrophe create-piece vegetable
```

If you run the `create-piece` command with the `--pages` flag, the command will also set up a corresponding pieces-pages module with your new piece type. Similarly, you can run the `create-piece` command with the `--widgets` flag, which will also set up a corresponding pieces-widgets module along with your new piece type. These flags can be used together or separately.

```bash
apostrophe create-piece vegetable --pages --widgets
```

## Create an empty Apostrophe module
To bootstrap the necessary files and basic configuration for a brand-new Apostrophe module that doesn't extend one of the usual suspects like pieces or widgets:
```bash
apostrophe create-module <module name>
```

## Run other Apostrophe-flavored command-line tasks

To run an Apostrophe command-line task with the apostrophe-cli, which are conventionally run like this: `node app.js <namespace>:<task name>`, you may instead execute the following from any location within a project's directory:
```bash
apostrophe <namespace>:<task name>
```

The apostrophe-cli assumes the `apostrophe` namespace when executing tasks. This means that if a task is in the `apostrophe` namespace (such as the `apostrophe:reset` task), you can simply execute:
```bash
apostrophe <task name>
```

For more information on command-line tasks in Apostrophe, visit the [Command line tasks](https://docs.apostrophecms.org/apostrophe/reference/modules/apostrophe-tasks) documentation for Apostrophe.

---------------

For more documentation on Apostrophe, visit the [documentation site](https://docs.apostrophecms.org).
