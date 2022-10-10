import { forwardRef, HTMLProps } from "react";

type InputProps = HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    {...props}
    className={`bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 custom-outline focus:outline-violet-500 ${props.className}`}
    autoComplete="off"
  />
));

Input.displayName = "Input";
