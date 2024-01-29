import styled from "styled-components/native";

export const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
  },
  keyboardShouldPersistTaps: "handled",
})``;
