# apostrophe-cli

The apostrophe-cli is a crossplatform starting point for creating and configuring [Apostrophe 2](https://github.com/punkave/apostrophe) projects, providing a simple boilerplate generator and wrapping other useful functions into an easy to use commandline tool.

First, install it as a global module:
```bash
npm install -g apostrophe-cli
```

To create a new project with the tool:
```bash
apostrophe create <project name>
```

To run an Apostrophe command-line task with the apostrophe-cli, which are conventionally run `node app.js <namespace>:<task name>`, simply execute the following from any location within a project's directory:
```bash
apostrophe <namespace>:<task name>
```

The apostrophe-cli assumes the `apostrophe` namespace when executing tasks. This means that if a task is in the `apostrophe` namespace (such as the `apostrophe:reset` task), simply execute:
```bash
apostrophe <task name>
```

For more information on command-line tasks in Apostrophe, visit the [Command line tasks](http://apostrophenow.org/howtos/tasks.html) documentation for Apostrophe.

---------------

For documentation on Apostrophe, visit the [A2 documentation site](http://apostrophenow.org).