import { CaretLeft, CaretRight } from "phosphor-react";

interface AdArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick(): void;
}

export function AdArrow(props: AdArrowProps) {
  return (
    <button
      onClick={props.onClick}
      className={`w-8 h-8 absolute top-1/2 -tranlate-y-1/2 ${
        props.left ? "-left-20" : "-right-20"
      } ${props.disabled ? "text-zinc-500 cursor-not-allowed" : "text-white"}`}
      disabled={props.disabled}
    >
      {props.left ? (
        <CaretLeft size={48} fill="currentColor" />
      ) : (
        <CaretRight size={48} fill="currentColor" />
      )}
    </button>
  );
}
