---
sidebar_position: 1
---

# iOS

## 1. Intro

The iOS SDK is split into three main components: VitalCore, VitalHealthKit and VitalDevices. VitalCore holds common components to both VitalHealthKit and VitalDevices. Among other things, it has the network layer that allows us to send data from a device to a server.

---

## 2. Installation

We use SPM (Swift Package Manager) to manage dependencies. We will soon have the SDK publicly available.

---

## 3. Initial Setup

To use our SDK, start by setting up `VitalNetworkClient`:

```swift
import VitalCore

VitalNetworkClient.configure(
    clientId: "xyz",
    clientSecret: "zyx",
    environment: .sandbox(.us)
)
```

If you don't follow this step, when you try to push data to the server, the app will crash. If you are not comfortable about storing a plain `clientId` and `clientSecret` in your app, you can:

1. Use obfuscation.
2. Create an endpoint from which the clients can fetch these values.

We found [this](https://nshipster.com/secrets/) article quite helpful.

---

Among other capabilities, there are two main topics you should be aware:

1. `userId`.
2. Connected source.

### 1. `userId`

A `userId` serves as a unique identifier of your user in Vital. You create one by sending us an id representing that user in your system (e.g. `white_bear`, `12832001`, `b5d36dbe-b745-11ec-b909-0242ac120002`, etc). We do advise against the use of PII (Personal Identifiable Information). It should also be unique across the users that belong to your team. You can create a `userId` like this:

```swift
let result = try await VitalNetworkClient.shared.user.create(
    .init(clientUserId: "white_bear"),
    setUserIdOnSuccess: false
)
```

A `userId` is an `UUID4`. Once you have a `userId`, you need to set it:

```swift
VitalNetworkClient.setUserId(result.userId)
```

<br/>

:::note

By default, when you create a `userId`, we call `VitalNetworkClient.setUserId` on your behalf. If you don't want this to happen call `VitalNetworkClient.setUserId(result.userId, setUserIdOnSuccess: false)`.

:::

### 2. Connected Source

A connected source is a link between a provider (e.g. Omron) and your user. When you push information, it is expected that a connected source exists for that user and the source of information you are using. If it doesn't exist, the request will fail.

Example: You want to push Ben's Omron data. Two things need to exist: 1) Ben is a user in Vital. 2) A connected source linking Ben's user to Omron.

To achieve this from the SDK you can simply:

```swift
let payload = CreateConnectedSourceRequest(userId: result.userId, connectedSource: .omron)
let result = try await VitalNetworkClient.shared.user.createConnectedSource(payload)
```

With these two things in place, you can now push Ben's Omron data.

---

## 4. VitalDevices

VitalDevices connects your app to other devices via bluetooth. Currently we support glucose meters and blood pressure readers.

You start by fetching all devices supported:

```swift
/// Get the brands
let brands = DevicesManager.brands()

/// Each brand has devices
let devices = DevicesManager.devices(for: brands[0])
```

Based on the `device`, you start scanning your surroundings to find it. This approach filters out devices we are not interested in:

```swift
let device = devices[0]

let manager = DevicesManager()
let publisher: AnyPublisher<ScannedDevice, Never> = manager.search(for: device)
```

You can observe the publisher (e.g. via `sink`) until you find a device. Once you find a device you create a reader:

```swift
let scannedDevice: ScannedDevice = ...

if scannedDevice.kind == .bloodPressure {
    let reader: BloodPressureReadable = manager.bloodPressureReader(for: scannedDevice)
}

if scannedDevice.kind == .glucoseMeter {
    let reader: GlucoseMeterReadable = manager.glucoseMeter(for: scannedDevice)
}
```

Depending on the flow of your app, and/or the device you are working with, you can either just pair, or pair and read. The "just" pair might be needed for devices that can only pair while in pairing mode. The devices we tested were able to pair and read while not in pairing mode, but your experience might be different.

For blood pressure monitors:

```swift
let reader: BloodPressureReadable = manager.bloodPressureReader(for: scannedDevice)

let justPair: AnyPublisher<Void, Error> = reader.pair(device: scannedDevice)
let pairAndRead: AnyPublisher<[BloodPressureSample], Error> = reader.read(device: scannedDevice)
```

And for glucose meters:

```swift
let reader: GlucoseMeterReadable = manager.glucoseMeter(for: scannedDevice)

let justPair: AnyPublisher<Void, Error> = reader.pair(device: scannedDevice)
let pairAndRead: AnyPublisher<[QuantitySample], Error> = reader.read(device: scannedDevice)
```

Finally, you can monitor the connection to the device itself via:

```swift
let monitorDevice: AnyPublisher<Bool, Never> = manager.monitorConnection(for: device)
```

<br/>

:::note

When you finish scanning for a device, you need to terminate the scanning. If you don't do this, you won't be able to connect and extract data from the device. You can achieve this by holding onto a `Cancellable` (via `sink`) and call `cancel()`. Or by using a more declarative approach (e.g. `publisher.first()`).
:::

---

## 5. Sending data via VitalNetwork

For the most part, you won't need to instantiate model objects. VitalHealthKit and VitalDevices will generate these models on your behalf. For VitalDevices in particular, you are responsible for sending the data explicitly via `VitalNetworkClient.shared.<domain>`.

### 1. Summaries

```swift
let sample = QuantitySample(
    value: 10,
    startDate: .init(),
    endDate: .init(),
    type: "fingerprick",
    unit: "mg/dl"
)

let patch = GlucosePatch(glucose: [sample])

try await VitalNetworkClient.shared.summary.post(
      resource: .glucose(patch, .daily, .omron)
)
```

It's important to notice two things in the above snippet:

1. We set the stage of data as `.daily`. If you are sending old data, please use `.historical` instead. This distinction is used for the Webhooks. If you are not sure if `.historical` data makes sense, you can stick with `.daily`. A `.daily` will always generate a webhook with the full payload of data. For more information, please read the [Webhook Flow](https://vital-docs.readme.io/docs/webhook-data-flow)
2. The provider (`.omron`) must match an existing connected source for that user. This means that if there's no connected source linking the user and `.omron`, the request will fail.

## 6. VitalHealthKit

Still in progress. :)
