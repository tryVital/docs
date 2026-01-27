# Vital Docs

## Quickstart

- Ensure you have nodejs 18 installed and run `yarn install` to get started.
- Ensure you have mintlify installed globally by running `npm install -g mintlify`.
- To pull the latest changes from the openapi spec in production, run `wget https://api.tryvital.io/openapi.json -O ./docs/swagger.json`, or for sandbox `wget https://api.sandbox.tryvital.io/openapi.json -O ./docs/swagger.json`
- Make sure you `cd` into the `docs` directory before running `mintlify dev` to view the docs locally.

## How do changes deploy

The openapi spec in this repository is automatically synchronized with Junction's primary codebase, meaning a merge to main in the primary codebase triggers an update to the openapi spec in this repository, and a consequent deployment. The only exception to this rule is if a new endpoint is created.

## Resources

For more information about mintlify see [docs](https://mintlify.com/docs)
If you have any issues running the docs locally you may find answers [here](https://mintlify.com/docs/local-testing)
