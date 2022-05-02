---
sidebar_position: 1
---

# Data Flow

When you _connect_ your user to Vital several processes are started - which very much depend
on which _provider_ your user connects to.

Firstly, Vital will try to fetch all the _historical_ (data that exists on
a user's device prior to connecting to Vital) data for that user. This process
can take several minutes so we send a Webhook event to you when that data is collected.

For all subsequent data, that being new data from a user's device, the data flow
will follow the _daily_ or _webhook_ process. For some provider's, data is pushed
to Vital via a webhook. Upon receipt of the webhook, Vital will process the data
and send a Webhook event to you. This event will signify that the data is ready to
be retrieved from our database. For other providers, Vital will pull data from
the provider's API on a schedule, multiple times a day. If new data is available,
Vital will process it and send a Webhook event to you.

To get more details of which provider's see the [Provider's Guide](/providers/Introduction#data-frequency).

For some user's they want near real-time data updates. We provider a [`refresh`](http://localhost:3000/api-reference/user#refresh-users-data) API endpoint
that will allow you to request a refresh of the data for a user at any point in time.

:::caution

Vital will only refresh data for users that have connected to Vital via a provider.
If you have not connected to Vital via a provider, you will not be able to use the refresh API.

**The refresh endpoint is a paid service.**
:::
