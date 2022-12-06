import React, { useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { VitalCore } from "vital-core-react-native";
import { VitalHealth, VitalResource } from "vital-health-react-native";

const VITAL_API_KEY = "<API_KEY>";
const VITAL_ENVIRONMENT = "<sandbox | production>";
const VITAL_REGION = "<us | eu>";

const App = () => {
  useEffect(() => {
    VitalCore.configure(
      VITAL_API_KEY,
      VITAL_ENVIRONMENT,
      VITAL_REGION,
      true
    ).then(() => {
      VitalHealth.configure(true, 90, false).then(() => {
        VitalCore.setUserId("2c5879eb-7d99-468b-bb43-3fe0d71e93ba").then(() => {
          VitalHealth.askForResources([
            VitalResource.Steps,
            VitalResource.Activity,
          ]);
        });
      });
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>Hello Vital React Native Implementiation</Text>
    </SafeAreaView>
  );
};

export default App;
