# Contributing
This repository is open to contributions from anyone. If you have a suggestion, a bug fix, a new feature, or anything else, feel free to open an issue or a pull request. This document will guide you through the process of contributing to the project.

## Our Stack

### Nuxt
The Open5e website is built using [Nuxt (Version 3)](https://nuxt.com/) which is a Vue.js web framework. You'll likely  want [some experience with Nuxt](https://nuxt.com/docs/3.x/getting-started/introduction) under your belt before contributing. If you have any experience using a different modern front-end web frameworks (React, Angular, etc.), you'll pick up Nuxt quickly.

### Django / DRF (API)

The Open5e website is the public face of the Open5e API, which is implemented using Django and the Django REST Framework (DRF). The Open5e backend is handled in its [own repository](https://github.com/open5e/open5e-api), which is where to head if you want to help implement API feature or add new data to the dataset.

## Contribution Process
To ensure that your contribution can be accepted and merged we recommend the following process. Many of these steps can be done in parallel, and some may not be necessary depending on the size of the contribution.

### Talk to Us
The project is currently undergoing many changes, and we want to make sure that your contribution can be accepted and does not conflict with any ongoing work. This can be done via an [issue](https://github.com/open5e/open5e/issues) on this repository or by joining our [Discord](https://discord.gg/QXqF6gSVqB) and talking to us there. Good and clear communication throughout the process will help ensure that your contribution can be accepted.

It is also a good idea to check the [issues](https://github.com/open5e/open5e/issues) and [pull requests](https://github.com/open5e/open5e/pulls) to see if anyone else is working on something similar.

### Set Up Your Environment

In order to be able to contribute you will need to set up your local development environment. Follow the instructions in the [README](../README.md) to get started.

#### Using the most up-to-date version of the API
When developing for the front-end, you will want to pull your data from the most up to date version of the API (the `staging` branch). This can be done by setting up the API to run in your local environment (see the [open5e-api README](https://github.com/open5e/open5e-api/blob/staging/README.md) for instructions). The Django test server can be run in a seperate terminal tab to your Nuxt test server. Once this is running, you can set the Open5e website to pull data from the local test server

1. Create a file called `.env` in the root directory of the front-end repository.
2. Add the following environmental variable to the `.env` file:
```
API_URL="http://localhost:8000"
```


### Contribute Changes
In order to make your changes follow the steps below:

1. [Fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
2. Create a new branch for your changes
3. Make your changes
4. Test your changes
5. Commit your changes
6. Push your changes to your fork
7. [Open a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
8. Respond to any feedback. This is crucial to ensure that your changes can be merged.
9. Wait for your changes to be merged. This may take some time, so be patient. If you have not heard back in a few days, feel free to ask for an update.
10. Celebrate! 🎉
11. Update your fork
12. Delete your branch

If you have no experience working with Git or GitHub, you can find a guide on GitHub [here](https://guides.github.com/activities/hello-world/) and on Git [here](https://docs.github.com/en/get-started/using-git/about-git).