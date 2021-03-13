import React from "react";
import { Container, Heading } from "@chakra-ui/react";

function Layout({ children }) {
  return (
    <Container>
      <Heading my={10}>Car Insurance</Heading> {children}
    </Container>
  );
}

export { Layout };
