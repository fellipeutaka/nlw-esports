import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

export function Checkbox({
  defaultChecked,
  onCheckedChange,
  ...rest
}: CheckboxPrimitive.CheckboxProps) {
  return (
    <CheckboxPrimitive.Checkbox
      className="bg-zinc-900 w-6 h-6 p-1 rounded custom-outline focus-visible:outline-violet-500"
      id="useVoiceChannel"
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      {...rest}
    >
      <CheckboxPrimitive.Indicator>
        <Check size={16} className="text-emerald-400" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Checkbox>
  );
}
