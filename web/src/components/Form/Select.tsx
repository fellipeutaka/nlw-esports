import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GameAd } from "@@types/GameAd";
import * as SelectPrimitive from "@radix-ui/react-select";
import styles from "@styles/select.module.css";
import { CaretDown, CaretUp, Check } from "phosphor-react";

import { supabase } from "@lib/supabase";

export function Select() {
  const [gameAds, setGameAds] = useState<GameAd[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from<GameAd>("Game")
          .select("*")
          .order("name", {
            ascending: true,
          })
          .throwOnError();
        if (data) {
          setGameAds(data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Ocorreu um erro ao buscar os jogos!");
      }
    })();
  }, []);

  return (
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
  );
}
