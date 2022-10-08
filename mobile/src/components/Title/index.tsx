import { TextProps } from "react-native";

import { Container } from "./styles";

interface TitleProps extends TextProps {
  text: string;
}

export function Title({ text, ...rest }: TitleProps) {
  return <Container {...rest}>{text}</Container>;
}
