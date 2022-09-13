import { Container } from "./styles";

interface SubTitleProps {
  text: string;
}

export function SubTitle({ text }: SubTitleProps) {
  return <Container>{text}</Container>;
}
