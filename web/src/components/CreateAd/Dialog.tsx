import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

import * as Checkbox from "@radix-ui/react-checkbox";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Root as ToggleGroup } from "@radix-ui/react-toggle-group";
import { Check, GameController, MagnifyingGlassPlus } from "phosphor-react";
import { z } from "zod";

import { Select } from "@components/Form/Select";

import { Input } from "../Form/Input";
import { Label } from "../Form/Label";
import { WeekDayButton } from "../Form/WeekDayButton";

export interface Fields {
  game: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

interface ErrorMessage {
  code: string;
  inclusive: boolean;
  message: string;
  minimum: 1;
  path: string;
  type: string;
}

const schema = z.object({
  game: z.string().trim().min(1, "Jogo é obrigatório"),
  name: z.string().trim().min(1, "Nome é obrigatório!"),
  yearsPlaying: z.number(),
  discord: z
    .string()
    .trim()
    .min(1, "Discord é obrigatório!")
    .regex(/[^\@\#\:]{2,32}#\d{4}$/s, "Discord inválido!"),
  hourStart: z
    .string()
    .trim()
    .min(5, "Horário que começa é obrigatório!")
    .max(5, "Horário que começa inválido!"),
  hourEnd: z
    .string()
    .min(5, "Horário que termina é obrigatório!")
    .max(5, "Horário que termina inválido!"),
  weekDays: z
    .array(z.number())
    .nonempty("É necessário selecionar pelo menos 1 dia da semana!"),
  useVoiceChannel: z.boolean(),
});

export function Dialog() {
  const [fields, setFields] = useState<Fields>({
    game: "",
    name: "",
    yearsPlaying: 0,
    discord: "",
    hourStart: "",
    hourEnd: "",
    useVoiceChannel: false,
  });
  const [weekDays, setWeekDays] = useState<string[]>([]);

  function onInputChange(e: FormEvent<HTMLInputElement>, field: string) {
    const inputValue = (e.target as HTMLInputElement).value;
    setFields((state) => ({ ...state, [field]: inputValue }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const formData = { ...fields, weekDays: weekDays.map(Number) };
    const parse = schema.safeParse(formData);
    if (!parse.success) {
      const errorMessages = JSON.parse(parse.error.message) as ErrorMessage[];
      errorMessages.forEach((error) => {
        console.error(error);
        toast.error(error.message);
      });
    } else {
      try {
        const response = await fetch(`/api/games/${formData.game}/ads`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          //  Close dialog
          document.dispatchEvent(
            new KeyboardEvent("keydown", { key: "Escape" })
          );
          toast.success("Seu anúncio foi criado com sucesso!");
        }
      } catch (err) {
        toast.error("Ocorreu um erro! Tente novamente mais tarde.");
        console.error(err);
      }
    }
  }

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="py-3 px-4 rounded-md bg-violet-500 hover:bg-violet-600 flex items-center gap-3 outline focus:outline-violet-500 sm:text-base text-sm">
        <MagnifyingGlassPlus size={24} />
        Publicar anúncio
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-10 bg-[#2A2634] rounded-lg focus:outline-none shadow-lg shadow-black/50 animate-dialogShow">
          <DialogPrimitive.Title className="md:text-3xl text-2xl md:text-left text-center font-black">
            Publique um anúncio
          </DialogPrimitive.Title>
          <form
            className="flex flex-col gap-4 md:mt-8 mt-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="game">Qual o game?</Label>
              <Select setFields={setFields} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Seu nome (ou nickname)</Label>
              <Input
                value={fields.name}
                onChange={(e) => onInputChange(e, "name")}
                id="name"
                placeholder="Como te chamam dentro do game?"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-6 items-center">
              <div className="flex flex-col gap-2 flex-1 w-full">
                <Label htmlFor="yearsPlaying">Joga há quantos anos?</Label>
                <Input
                  value={String(fields.yearsPlaying)}
                  onChange={(e) =>
                    setFields((state) => ({
                      ...state,
                      yearsPlaying: Number(
                        (e.target as HTMLInputElement).value
                      ),
                    }))
                  }
                  type="number"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="discord">Qual seu Discord?</Label>
                <Input
                  value={fields.discord}
                  onChange={(e) => onInputChange(e, "discord")}
                  name="discord"
                  id="discord"
                  placeholder="Usuario#0000"
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-6 items-center">
              <div className="flex flex-col gap-2">
                <Label htmlFor="weekDays">Quando costuma jogar?</Label>
                <ToggleGroup
                  value={weekDays}
                  onValueChange={setWeekDays}
                  type="multiple"
                  className="flex gap-2"
                >
                  <WeekDayButton
                    weekDay="D"
                    title="Domingo"
                    value="0"
                    weekDays={weekDays}
                  />
                  <WeekDayButton
                    value="1"
                    weekDay="S"
                    title="Segunda"
                    weekDays={weekDays}
                  />
                  <WeekDayButton
                    value="2"
                    weekDay="T"
                    title="Terça"
                    weekDays={weekDays}
                  />
                  <WeekDayButton
                    value="3"
                    weekDay="Q"
                    title="Quarta"
                    weekDays={weekDays}
                  />
                  <WeekDayButton
                    value="4"
                    weekDay="Q"
                    title="Quinta"
                    weekDays={weekDays}
                  />
                  <WeekDayButton
                    value="5"
                    weekDay="S"
                    title="Sexta"
                    weekDays={weekDays}
                  />
                  <WeekDayButton
                    value="6"
                    weekDay="S"
                    title="Sábado"
                    weekDays={weekDays}
                  />
                </ToggleGroup>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="hourStart">Qual horário do dia?</Label>
                <div className="flex gap-2">
                  <Input
                    value={fields.hourStart}
                    onChange={(e) => onInputChange(e, "hourStart")}
                    className="md:w-32 w-1/2"
                    name="hourStart"
                    id="hourStart"
                    type="time"
                    placeholder="De"
                  />
                  <Input
                    value={fields.hourEnd}
                    onChange={(e) => onInputChange(e, "hourEnd")}
                    className="md:w-32 w-1/2"
                    name="hourEnd"
                    id="hourEnd"
                    type="time"
                    placeholder="Até"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox.Checkbox
                className="bg-zinc-900 w-6 h-6 p-1 rounded transition-all duration-300 outline-none focus:outline-offset-1 focus:outline-violet-500"
                name="useVoiceChannel"
                id="useVoiceChannel"
                onCheckedChange={(e) =>
                  setFields((state) => ({
                    ...state,
                    useVoiceChannel: Boolean(e),
                  }))
                }
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
