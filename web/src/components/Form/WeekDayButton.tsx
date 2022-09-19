import { HTMLAttributes } from "react";

import { Item as Button } from "@radix-ui/react-toggle-group";

interface WeekDayButtonProps extends HTMLAttributes<HTMLButtonElement> {
  weekDay: string;
  weekDays: string[];
  value: string;
}

export function WeekDayButton({
  title,
  weekDay,
  weekDays,
  value,
  ...rest
}: WeekDayButtonProps) {
  const isChecked = weekDays.includes(value);
  return (
    <Button
      className={`w-10 h-10 rounded ${
        isChecked ? "bg-violet-500" : "bg-zinc-900"
      }  outline focus:outline-violet-500`}
      title={title}
      type="button"
      value={value}
      {...rest}
    >
      {weekDay}
    </Button>
  );
}
