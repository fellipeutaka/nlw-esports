import { HTMLAttributes } from "react";

interface WeekDayButtonProps extends HTMLAttributes<HTMLButtonElement> {
  weekDay: string;
  isChecked: boolean;
}

export function WeekDayButton({
  title,
  weekDay,
  isChecked,
  ...rest
}: WeekDayButtonProps) {
  return (
    <button
      className={`w-10 h-10 rounded ${
        isChecked ? "bg-violet-500" : "bg-zinc-900"
      }  outline focus:outline-violet-500`}
      title={title}
      type="button"
      {...rest}
    >
      {weekDay}
    </button>
  );
}
