import { Redirect } from "expo-router";
import { Stack } from "expo-router/stack";

import Container from "@/components/Container";
import Loader from "@/components/Loader";

import { useAuth } from "@/hooks/useAuth";

export default function Layout() {
  const { user, loadingSession } = useAuth();

  if (loadingSession) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Redirect href="/login" />
      </Container>
    );
  }

  return (
    <Container>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Container>
  );
}
