import { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {}

export function Input(props: InputProps) {
  console.log(props.className);

  return (
    <input
      {...props}
      className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 outline focus:outline-violet-500 ${props.className}`}
    />
  );
}
