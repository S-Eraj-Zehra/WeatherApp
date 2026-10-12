import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Weather Forecast",
        }}
      />

      <Stack.Screen
        name="form"
        options={{
          title: "Registration Form",
        }}
      />
    </Stack>
  );
}
