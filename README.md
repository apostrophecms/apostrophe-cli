# Apostrophe CLI

The Apostrophe CLI is a cross-platform starting point for creating and configuring [ApostropheCMS](https://github.com/apostrophecms/apostrophe) projects, providing a simple boilerplate generator and wrapping other useful functions into an easy to use command line tool.

First, install `apostrophe-cli` as a global NPM module:
```bash
npm install -g apostrophe-cli
```

To view the available commands in a given context, execute the newly-installed command with no arguments:
```bash
apos
```

**Note:** All Apostrophe CLI commands can also be run with `apostrophe`, the legacy command, in addition to `apos`.

## Create a project

To create a new project with the tool:
```bash
apos create-project <shortname-without-spaces>
```

This will create a local copy of our standard [Apostrophe Boilerplate](https://github.com/apostrophecms/apostrophe-boilerplate).

### options

Run `create-project` with a `--boilerplate` flag to start from a Github repository other than the standard `apostrophe-boilerplate` repo. For example, `apos create-project <shortname-without-spaces> --boilerplate=https://github.com/apostrophecms/apostrophe-open-museum.git` would create a project using the [Open Museum](https://github.com/apostrophecms/apostrophe-open-museum) demo.

If you run the `create-project` command with the `--setup` flag, the command will also `npm install` the dependencies for the project and run `apostrophe-users:add` to create an admin user for the CMS, resulting in a fully bootstrapped project. This command will prompt you for a password for the admin user being created.

## Create a widget
To bootstrap the necessary files and basic configuration for a new Apostrophe widget, run the following command from within your Apostrophe project's root directory:
```bash
# "-widgets" will automatically be appended to the end of your module name
apos create-widget fancy-button
```

**Note:** You will then need to register this widget module in `app.js` so it is available in your project code. The same is true for the commands below when you create a piece module or generic module.

```javascript
// app.js
module.exports = {
  // ...
  'fancy-button-widgets': {},
  // ...
}
```


## Create a piece
To bootstrap the necessary files and basic configuration for a new Apostrophe piece type, run the following command from within your Apostrophe project's root directory:
```bash
# be sure to use the SINGULAR version of the name of your content type
apos create-piece vegetable
```

Then remember to register `'vegetables': {}` in `apps.js` above.

If you run the `create-piece` command with the `--pages` flag, the command will also set up a corresponding pieces-pages module with your new piece type. Similarly, you can run the `create-piece` command with the `--widgets` flag, which will also set up a corresponding pieces-widgets module along with your new piece type. These flags can be used together or separately.

```bash
apos create-piece vegetable --pages --widgets
```

## Create an empty Apostrophe module
To bootstrap the necessary files and basic configuration for a brand-new Apostrophe module that doesn't extend one of the usual suspects like pieces or widgets:
```bash
apos create-module <module name>
```

Remember to register the module in `apps.js` with the other module types.

## CLI analytics

To help us better understand how devs are using the CLI, you will have the option to *opt-in* to share basic usage information with the maintainers. This is limited to:
1. the command you have executed (only "create-project," "create-piece," "create-module," "create-widget," **not** any Apostrophe task commands);
2. if that command succeeded ("exec" or "error");
3. a random, anonymous user ID (IP addresses are anonymized to avoid connecting this ID with an individual).

**If you do not explicitly agree to participate, no infomation will be tracked.** Through the `universal-analytics` package, we use the option to anonymize your IP address, so we know as little as possible about you other than what is listed above. See the `sendAnalyticsEvent` utility method if you're curious how this all works.

### Why are asking to collect this information?

As we work to grow the Apostrophe community, knowing if, and how much, people are finding the CLI useful can tell us about the community's growth. It can also help us know if our work to make the CLI *more* useful for everyone is working!

---------------

For more documentation for ApostropheCMS, visit the [documentation site](https://docs.apostrophecms.org).
