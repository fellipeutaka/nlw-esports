import { AuthStackParamsList } from "@@types/routes/ParamsList/Auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignIn } from "@screens/SignIn";

const { Navigator, Screen } = createNativeStackNavigator<AuthStackParamsList>();

export function Auth() {
  return (
    <Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
}
