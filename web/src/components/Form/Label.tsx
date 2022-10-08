import type { HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {}

export function Label(props: LabelProps) {
  return <label {...props} className={`font-semibold ${props.className}`} />;
}
