---
title: "Vital Link"
slug: "vital-link-1"
excerpt: "Use Vital Link to connect your users wearables account's with our API"
hidden: false
createdAt: "2022-04-06T14:09:17.782Z"
updatedAt: "2022-04-08T14:59:42.432Z"
---

### Introduction to Link

Once you have your first user you are now ready to use _Vital Link_. _Vital Link_ is the client-side component your users will interact with. They will use it to **connect their wearables accounts to Vital** and allow you to access their account data via the Vital API.

Vital Link is easily integrated in your application via our [Python and React libraries](https://vital-docs.readme.io/docs/libraries).

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/4094267-e958f1b49a52741589a81aa188a1d7b9115cf73b-3864x2496.png",
"e958f1b49a52741589a81aa188a1d7b9115cf73b-3864x2496.png",
3864,
2496,
"#e4e5e5"
],
"caption": "Example Vital Link Flow via the widget. (From left to right) The flow starts with an agreement page, the user selects the wearable account and then authenticates."
}
]
}
[/block]

### Vital Link Flow

The Vital Link flow is the process that connects your user's wearables accounts to the Vital API.

**1.** The Link flow starts by creating a temporary `link_token`. Using the `user_id` you created previously, you can generate the `link_token` by calling the `/link/token` endpoint.

<!-- _Parameters:_
[block:html]
{
"html": "<div class=\"wide\">\n <div class=\"inline\">\n <div class=\"padded big\">user_id</div>\n </div>\n <div class=\"inline gray\">\n <div class=\"padded\">string</div>\n </div>\n <div class=\"padded lightgray\">\n Unique key to lookup Vital user\n </div>\n</div>\n\n<style>\n .inline {\n display: inline-block;\n margin: 10;\n }\n .wide {\n width: 100%;\n border-top: 1px solid lightgray;\n border-bottom: 1px solid lightgray;\n }\n .big {\n \tfont-size: 14px;\n font-weight: 900;\n }\n .padded {\n font-size: 12px;\n padding: 10px;\n }\n .gray {\n color: gray; \n }\n .lightgray {\n color: lightgray; \n }\n p {\n font-family: \"Inter\", sans-serif !important;\n }\n .rdmd-html{\n font-family: \"Inter\", sans-serif !important;\n }\n</style>\n\n"
}
[/block] -->

[block:code]
{
"codes": [
{
"code": "from vital import Client\n\nclient = Client(\n client_id, \n client_secret, \n environment=\"sandbox\"\n)\n \ntoken = client.Link.create(user_id, \"oura\")",
"language": "python"
},
{
"code": "const { VitalClient } = require(\"Vital\");\n\nconst client = new VitalClient({\n client_id: <CLIENT_ID>,\n client_secret: <CLIENT_SECRET>,\n environment: \"sandbox\",\n});\n \nconst resp = await client.Link.create(client_user_id, \"oura\")",
"language": "javascript"
}
]
}
[/block]

[block:code]
{
"codes": [
{
"code": "{\n \"link_token\": \"dGVzdCB0ZXN0IHRlc3Q=...\"\n}",
"language": "json",
"name": "Response"
}
]
}
[/block]
**2.** Use the `link_token` to open a temporary link for your user. We provide a [Vital Link](https://www.npmjs.com/package/@tryvital/vital-link) react-hook to launch this link from your frontend. Once your user has launched the link component, we will handle authentication with their chosen provider.

<!-- [block:html]
{
"html": "<div class=\"wide\">\n <div class=\"inline\">\n <div class=\"padded big\">link_token</div>\n </div>\n <div class=\"inline gray\">\n <div class=\"padded\">string</div>\n </div>\n <div class=\"padded lightgray\">\n A temporary token used to generate a link for user's to access the Vital Link component.\n </div>\n</div>\n\n<style>\n .inline {\n display: inline-block;\n margin: 10;\n }\n .wide {\n width: 100%;\n border-top: 1px solid lightgray;\n border-bottom: 1px solid lightgray;\n }\n .big {\n \tfont-size: 14px;\n font-weight: 900;\n }\n .padded {\n font-size: 12px;\n padding: 10px;\n }\n .gray {\n color: gray; \n }\n .lightgray {\n color: lightgray; \n }\n p {\n font-family: \"Inter\", sans-serif !important;\n }\n .rdmd-html{\n font-family: \"Inter\", sans-serif !important;\n }\n</style>\n\n\n"
}
[/block] -->

<!-- [block:code]
{
  "codes": [
    {
      "code": "import 'react-app-polyfill/ie11';\nimport * as React from 'react';\nimport * as ReactDOM from 'react-dom';\nimport { useCallback } from 'react';\n\nimport { useVitalLink } from '@tryvital/vital-link';\nimport { useState } from 'react';\n\nconst API_URL = process.env.API_URL ? process.env.API_URL : \"http://localhost:3001\"\n\nconst getTokenFromBackend = async (userKey: string, env: string) => {\n  const resp = await fetch(<backend_url>);\n  return await resp.json();\n};\n  \nconst App = props => {\n  const userId = '560596b9-924b-4af9-a670...'; // user_id\n  const [isLoading, setLoading] = useState(false);\n\n  const onSuccess = useCallback(metadata => {\n    // Device is now connected.\n  }, []);\n\n  const onExit = useCallback(metadata => {\n    // User has quit the link flow.\n  }, []);\n\n  const onError = useCallback(metadata => {\n    // Error encountered in connecting device.\n  }, []);\n\n  const config = {\n    onSuccess,\n    onExit,\n    onError,\n    env: \"sandbox\"\n  };\n\n  const { open, ready, error } = useVitalLink(config);\n\n  const handleVitalOpen = async () => {\n    setLoading(true);\n    const token = await getTokenFromBackend(userKey, \"sandbox\");\n    open(token);\n    setLoading(false);\n  };\n\n  return (\n    <button\n      type=\"button\"\n      className=\"button\"\n      onClick={handleVitalOpen}\n      disabled={isLoading || !ready}\n    >\n      Open Vital Link\n    </button>\n  );\n};\n\nReactDOM.render(<App />, document.getElementById('root'));",
      "language": "javascript",
      "name": "React"
    }
  ]
}
[/block] -->

**3.** If successful, the `onSuccess` callback will be triggered and your user's account is will be connected to Vital. The Vital backend will then start to pull data from the connected account and listen to any new readings from the user's device.
