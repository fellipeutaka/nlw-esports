import { HTMLProps } from "react";

interface LabelProps extends HTMLProps<HTMLLabelElement> {}

export function Label(props: LabelProps) {
  return <label className="font-semibold" {...props} />;
}
