import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "@styles/select.module.css";
import { CaretDown, CaretUp, Check } from "phosphor-react";

import { useGame } from "@hooks/useGame";

export function Select() {
  const { games } = useGame();

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content className={styles.content}>
        <SelectPrimitive.ScrollUpButton className="flex justify-center items-center h-8">
          <CaretUp />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="p-2">
          {games.map((ad) => (
            <SelectPrimitive.Item
              key={ad.id}
              value={ad.id}
              className={styles.item}
            >
              <SelectPrimitive.ItemText>{ad.name}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-0 w-6 flex items-center justify-center">
                <Check />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
          ))}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex justify-center items-center h-8">
          <CaretDown />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
