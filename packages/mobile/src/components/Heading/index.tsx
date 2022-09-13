import { ViewProps } from "react-native";

import { SubTitle } from "@components/SubTitle";
import { Title } from "@components/Title";

import { Container } from "./styles";

interface HeadingProps extends ViewProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...rest }: HeadingProps) {
  return (
    <Container>
      <Title text={title} />
      <SubTitle text={subtitle} />
    </Container>
  );
}
