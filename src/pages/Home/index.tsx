import React from "react";

import Container from "../../components/Container";
import Header from "../../components/Header";

export default function Home({ navigation }) {
  return (
    <Container>
      <Header navigation={navigation} />
    </Container>
  );
}
