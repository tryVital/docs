---
title: "Privacy"
slug: "privacy"
hidden: false
createdAt: "2022-04-06T15:34:38.484Z"
updatedAt: "2022-04-08T15:00:34.175Z"
---
Privacy is at the heart of everything we do at Vital. We are committed to protecting your privacy and your data and have built our service with those values in mind.

To do this we've taken a number of precautions.

1. At any time, users can deregister their device's and delete their data from Vital, by heading to this **page** and going through our data deletion flow. At that point, we will trigger deregistration endpoint for that user, and delete all the data for that device from our servers.

2. We encrypt all data at REST and in transit. What's more is that we encrypt the data prior to storing it it in our database. To do this we use **[Evervault](https://evervault.com)**.

## How this works?

### Storing Data

When we pull data from various wearable provider's this data goes through the Evervault encryption proxy - which encrypts the data before we store it.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/c7c0fe0-storing.png",
        "storing.png",
        1680,
        400,
        "#bdd0ca"
      ]
    }
  ]
}
[/block]
### Retrieving Data

When you request data from the Vital API, it is decrypted via the Evervault encryption proxy before being returned.
[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/8723655-retreiving.png",
        "retreiving.png",
        1788,
        394,
        "#b7d1d0"
      ]
    }
  ]
}
[/block]