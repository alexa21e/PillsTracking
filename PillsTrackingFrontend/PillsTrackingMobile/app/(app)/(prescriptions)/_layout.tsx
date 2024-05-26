import { Stack } from "expo-router";

const PrescriptionsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default PrescriptionsLayout;
