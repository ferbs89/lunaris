import styled from "styled-components/native";

export const CustomScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: "center",
  },
  keyboardShouldPersistTaps: "handled",
})``;
