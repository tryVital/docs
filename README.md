# Vital Docs

## Quickstart

- Ensure you have nodejs 18 installed and run `yarn install` to get started.
- Ensure you have mintlify installed globally by running `npm install -g mintlify`.
- To pull the latest changes from the openapi spec in production, run `wget https://api.tryvital.io/openapi.json -O ./docs/swagger.json`, or for the openapi spec in sandbox `wget https://api.sandbox.tryvital.io/openapi.json -O ./docs/swagger.json`.
- Make sure you `cd` into the `docs` directory before running `mintlify dev` to view the docs locally.

## Deployment

The openapi spec in this repository is automatically synchronized with Junction's primary codebase, meaning a merge to main in the primary codebase triggers an update to the openapi spec in this repository, and a consequent deployment. The only exception to this rule is if a new endpoint is created.

## Prose linting

PRs are checked by [Vale](https://vale.sh) for style violations (e.g. capitalised API entities, British spellings). If your PR fails the Vale check, run it locally to see the errors before pushing:

```bash
brew install vale        # one-time setup
vale docs/               # lint everything
vale docs/path/to/file.mdx  # lint a specific file
```

To suppress a false positive on a specific line:

```mdx
<!-- vale Junction.EntityCase off -->
The Team API Key header...
<!-- vale Junction.EntityCase on -->
```

Install the [Vale VS Code extension](https://marketplace.visualstudio.com/items?itemName=ChrisChinchilla.vale-vscode) to see violations inline as you write.

## Resources

For more information about mintlify see [docs](https://mintlify.com/docs)
If you have any issues running the docs locally you may find answers [here](https://mintlify.com/docs/local-testing)
