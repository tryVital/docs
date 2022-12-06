import { VitalHealth, VitalResource } from "vital-health-react-native";

VitalHealth.configure(automaticConfiguration, numberOfDaysToPull, logsEnabled)
  .then(() => {
    // HealthKit SDK is ready to use
    VitalCore.setUserId(userId);
  })
  .catch((error) => {
    // Something went wrong
  });
