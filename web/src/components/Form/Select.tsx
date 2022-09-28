import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { GameAd } from "@@types/GameAd";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "@styles/select.module.css";
import { CaretDown, CaretUp, Check } from "phosphor-react";

import { Fields } from "@components/CreateAd/Dialog";

const SelectPlaceholder = (
  <span className="text-zinc-500">Selecione o game que deseja jogar</span>
);

interface SelectProps {
  setFields: Dispatch<SetStateAction<Fields>>;
}

export function Select({ setFields }: SelectProps) {
  const [gameAds, setGameAds] = useState<GameAd[]>([]);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then(({ data }) => setGameAds(data));
  }, []);

  return (
    <SelectPrimitive.Root
      name="game"
      onValueChange={(game) => setFields((state) => ({ ...state, game }))}
    >
      <SelectPrimitive.Trigger
        id="game"
        className="flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm outline focus:outline-violet-500"
      >
        <SelectPrimitive.Value placeholder={SelectPlaceholder} />
        <SelectPrimitive.Icon>
          <CaretDown size={24} className="text-zinc-400" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className={styles.content}>
          <SelectPrimitive.ScrollUpButton className="flex justify-center items-center h-8">
            <CaretUp />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-2">
            {gameAds.map((ad) => (
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
    </SelectPrimitive.Root>
  );
}
