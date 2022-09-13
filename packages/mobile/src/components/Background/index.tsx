import { ReactNode } from "react";

import bgImg from "@assets/background-galaxy.png";

import { Container } from "./styles";

interface BackgroundProps {
  children: ReactNode;
}

export function Background({ children }: BackgroundProps) {
  return (
    <Container source={bgImg} defaultSource={bgImg}>
      {children}
    </Container>
  );
}
