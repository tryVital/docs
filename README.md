# Vital Docs

## Quickstart

Ensure you have nodejs 18 installed and run `yarn install` to get started.
To view the docs locally run `yarn start`.

## Updating the OpenAPI specs

After deploying API changes to production, run these commands from GitHub Actions:

```bash
curl -X GET "https://api.tryvital.io/openapi.json" > docs/swagger.json
curl -X GET "https://api.tryvital.io/management/openapi.json" > docs/org-management-api.json
```

This ensures our API documentation stays in sync with production.

## Resources

For more information about mintlify see [docs](https://mintlify.com/docs)
If you have any issues running the docs locally you may find answers [here](https://mintlify.com/docs/local-testing)
