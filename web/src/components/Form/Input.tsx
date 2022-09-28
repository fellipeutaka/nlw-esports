import { HTMLProps } from "react";

type InputProps = HTMLProps<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 outline focus:outline-violet-500 ${props.className}`}
    />
  );
}
