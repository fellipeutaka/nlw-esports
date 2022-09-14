import { Container } from "./styles";

interface TitleProps {
  text: string;
}

export function Title({ text }: TitleProps) {
  return <Container>{text}</Container>;
}
