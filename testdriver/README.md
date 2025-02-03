Hello! I'm going to show you how to create a new [TestDriver.ai](http://TestDriver.ai) regression test and implement it into the [TestDriver.ai](http://TestDriver.ai) github action, specifically for the Tauri API Validation app.

In the Tauri repo there is a directory called '**testdriver**' which holds all of our created [TestDriver.ai](http://TestDriver.ai) regression tests.

Right now, the file .github/workflows/test-build-windows.yml is our main [TestDriver.ai](http://TestDriver.ai) workflow for building and testing the Tauri API validation application.

[TestDriver.ai](http://TestDriver.ai) github action uses this workflow to spin up an ephemeral VM, open the app, and test it by starting up a local [TestDriver.ai](http://TestDriver.ai) agent and using our regression tests passed into the workflow file from the '**testdriver**' directory. (Reference testdrivers workflow docs [here](https://docs.testdriver.ai/continuous-integration/github-setup)).

Of course, before being able to test the API example app we need to build and install the app on our VM. Which already happens in our [prerun script](https://docs.testdriver.ai/continuous-integration/prerun-scripts) in the workflow.

In the workflow, we can see `/run` commands under the `prompt:` we use these to run our tests sequentially after the app has been built and launched ([parallel testing](https://docs.testdriver.ai/continuous-integration/parallel-testing) can also be done).

**So, how can we create more regression tests?** After [installing TestDriver.ai](https://docs.testdriver.ai/overview/installing-via-npm) on your local machine, navigate to the root of your local Tauri repo.

Once at the root, it may be beneficial to select your desired preferences for [TestDriver.ai](http://TestDriver.ai) by using `testdriverai init` ,there you can select whether to receive desktop notifications, minimize the terminal when creating tests (this helps [TestDriver.ai](http://TestDriver.ai) resolve quicker), and more.

Then use `testdriverai testdriver/[new test name].yml` to create a new test within the '**testdriver'** directory.

Now, [TestDriver.ai](http://TestDriver.ai) should start and be awaiting a prompt. So, let's open the Tauri API validation app, and place it next to our terminal, and begin creating a test.

If we give [TestDriver.ai](http://TestDriver.ai) a prompt like '**click the Communication tab in the sidebar**', [TestDriver.ai](http://TestDriver.ai) will do so, and give us something like this resulting YAML.

```
  - prompt: click the Communication tab in the sidebar
    commands:
      - command: hover-text
        text: Communication
        description: >-
          Communication tab in the sidebar of the Tauri API Validation
          application
        action: click

```

When we give another prompt, like '**click the spam button**', [TestDriver.ai](http://TestDriver.ai) will generate something like:

```
  - prompt: Click the Spam button
    commands:
      - command: hover-text
        text: Spam
        description: >-
          Spam button in the Communication section of the
          Tauri API Validation application
        action: click

```

And then automatically append it to our previously generated YAML!

([CLI commands](https://docs.testdriver.ai/reference/cli-commands) like `/undo` and `assert` are also important!)

We can do `/save` to ensure our YAML is saved. Then we can run the regression test we've just created with `/run testdriver/[new test name].yml` just like how the prompts are being run in the workflow file.

Then, if we want to implement this test into our github action workflow, all we have to do is add the `/run testdriver/[new test name].yml` under a `prompt:` in the workflow. ([workflow doc](https://docs.testdriver.ai/continuous-integration/github-setup))