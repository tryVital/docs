---
title: "Privacy"
slug: "privacy"
hidden: false
---

import {
Image,
} from "@chakra-ui/react";

Privacy is at the heart of everything we do at Vital. We are committed to protecting your privacy and your data and have built our service with those values in mind.

To do this we've taken a number of precautions.

1. At any time, users can deregister their device's and delete their data from Vital, by heading to this **page** and going through our data deletion flow. At that point, we will trigger deregistration endpoint for that user, and delete all the data for that device from our servers.

2. We encrypt all data at REST and in transit. What's more is that we encrypt the data prior to storing it it in our database. To do this we use **[Evervault](https://evervault.com)**.

## How this works?

### Storing Data

When we pull data from various wearable provider's this data goes through the Evervault encryption proxy - which encrypts the data before we store it.
<Image src="/img/storing.png" />

### Retrieving Data

When you request data from the Vital API, it is decrypted via the Evervault encryption proxy before being returned.

<Image src="/img/retreiving.png" />
