import * as Checkbox from "@radix-ui/react-checkbox";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, GameController, MagnifyingGlassPlus } from "phosphor-react";

import { Input } from "../Form/Input";
import { Label } from "../Form/Label";
import { WeekDayButton } from "../Form/WeekDayButton";

export function Dialog() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="py-3 px-4 rounded-md bg-violet-500 hover:bg-violet-600 flex items-center gap-3 outline focus:outline-violet-500">
        <MagnifyingGlassPlus size={24} />
        Publicar anúncio
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-10 bg-[#2A2634] rounded-lg focus:outline-none min-w-[488px] shadow-lg shadow-black/50 animate-dialogShow">
          <DialogPrimitive.Title className="text-3xl font-black">
            Publique um anúncio
          </DialogPrimitive.Title>
          <form className="flex flex-col gap-4 mt-8">
            <div className="flex flex-col gap-2">
              <Label htmlFor="game">Qual o game?</Label>
              <Input
                id="game"
                placeholder="Selecione o game que deseja jogar"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Seu nome (ou nickname)</Label>
              <Input id="name" placeholder="Como te chamam dentro do game?" />
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex flex-col gap-2 flex-1">
                <Label htmlFor="yearsPlaying">Joga há quantos anos?</Label>
                <Input
                  type="number"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                  min="0"
                  max="30"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="discord">Qual seu Discord?</Label>
                <Input id="discord" placeholder="Usuario#0000" />
              </div>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex flex-col gap-2">
                <Label htmlFor="weekDays">Quando costuma jogar?</Label>
                <div className="flex gap-2">
                  <WeekDayButton isChecked weekDay="D" title="Domingo" />
                  <WeekDayButton
                    isChecked={false}
                    weekDay="S"
                    title="Segunda"
                  />
                  <WeekDayButton isChecked={false} weekDay="T" title="Terça" />
                  <WeekDayButton isChecked={false} weekDay="Q" title="Quarta" />
                  <WeekDayButton isChecked={false} weekDay="Q" title="Quinta" />
                  <WeekDayButton isChecked weekDay="S" title="Sexta" />
                  <WeekDayButton isChecked weekDay="S" title="Sábado" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="hourStart">Qual horário do dia?</Label>
                <div className="flex gap-2">
                  <Input className="w-20" id="hourStart" placeholder="De" />
                  <Input className="w-20" id="hourEnd" placeholder="Até" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox.Checkbox
                className="bg-zinc-900 w-6 h-6 rounded flex items-center justify-center transition-all duration-300 outline-none focus:outline-offset-1 focus:outline-violet-500"
                defaultChecked
                id="useVoiceChannel"
              >
                <Checkbox.Indicator>
                  <Check size={16} className="text-emerald-400" />
                </Checkbox.Indicator>
              </Checkbox.Checkbox>
              <label htmlFor="useVoiceChannel" className="text-sm">
                Costumo me conectar ao chat de voz
              </label>
            </div>
            <div className="flex justify-end items-center mt-4 gap-4">
              <DialogPrimitive.Close className="bg-zinc-500 rounded-md font-semibold py-3 px-5 hover:bg-zinc-600 outline focus:outline-zinc-500">
                Cancelar
              </DialogPrimitive.Close>
              <button
                type="submit"
                className="flex items-center font-semibold gap-3 bg-violet-500 rounded-md py-3 px-5 hover:bg-violet-600 outline focus:outline-violet-500"
              >
                <GameController size={24} />
                Encontrar duo
              </button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
