import React, { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

import Container from "../../components/Container";
import Header from "../../components/Header";
import { supabase } from "../../config/supabase";

export default function Home({ navigation }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchData() {
      let { data: session } = await supabase.auth.signInWithPassword({
        email: "ferbs89@gmail.com",
        password: "fer123",
      });

      setUser(session.user);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Header navigation={navigation} />
    </Container>
  );
}
