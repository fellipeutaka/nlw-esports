import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "react-toastify";

import type { MyAds, SupabaseAd } from "@@types/Ad";
import { zodResolver } from "@hookform/resolvers/zod";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Root as ToggleGroup } from "@radix-ui/react-toggle-group";
import { CaretDown, Pencil, UploadSimple } from "phosphor-react";

import { Checkbox } from "@components/Form/Checkbox";
import { ErrorMessage } from "@components/Form/ErrorMessage";
import { Select } from "@components/Form/Select";
import { useAuth } from "@hooks/useAuth";
import { useGame } from "@hooks/useGame";
import { supabase } from "@lib/supabase";
import { adSchema } from "@utils/adSchema";
import { checkIfYearsPlayingIsGreaterThanGameReleaseDate } from "@utils/checkIfYearsPlayingIsGreaterThanGameReleaseDate";
import { convertHourStringToMinutes } from "@utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "@utils/convertMinutesToHourString";
import { handleScape } from "@utils/handleScape";

import { Input } from "../Form/Input";
import { Label } from "../Form/Label";
import { WeekDayButton } from "../Form/WeekDayButton";

export interface Fields {
  game: string;
  name: string;
  yearsPlaying: number;
  description: string;
  hourStart: string;
  hourEnd: string;
  weekDays: number[];
  useVoiceChannel: boolean;
}

interface EditAdDialogProps {
  currentAd: MyAds;
}

export function EditAdDialog({ currentAd }: EditAdDialogProps) {
  const { user } = useAuth();
  const { games } = useGame();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm<Fields>({
    mode: "onBlur",
    defaultValues: {
      game: currentAd.gameId,
      name: currentAd.name,
      yearsPlaying: currentAd.yearsPlaying,
      description: currentAd.description,
      hourStart: convertMinutesToHourString(currentAd.hourStart),
      hourEnd: convertMinutesToHourString(currentAd.hourEnd),
      weekDays: currentAd.weekDays,
      useVoiceChannel: currentAd.useVoiceChannel,
    },
    resolver: zodResolver(adSchema),
  });

  const updateAd: SubmitHandler<Fields> = async (data) => {
    const hourStartInMinutes = convertHourStringToMinutes(data.hourStart);
    const hourEndInMinutes = convertHourStringToMinutes(data.hourEnd);

    if (hourStartInMinutes >= hourEndInMinutes) {
      toast.error(
        "O horário que começa não pode ser maior ou igual ao horário que termina!"
      );
      return;
    }

    const { releaseAt = "" } =
      games.find((game) => game.id === data.game) ?? {};

    if (
      checkIfYearsPlayingIsGreaterThanGameReleaseDate(
        releaseAt,
        data.yearsPlaying
      )
    ) {
      toast.error(
        "É impossível que você tenha mais horas jogadas que o jogo tem de existência!"
      );
      return;
    }

    try {
      await supabase
        .from<SupabaseAd>("Ad")
        .update({
          name: data.name,
          description: data.description,
          weekDays: data.weekDays,
          yearsPlaying: data.yearsPlaying,
          hourStart: hourStartInMinutes,
          hourEnd: hourEndInMinutes,
          useVoiceChannel: data.useVoiceChannel,
          userId: user?.id,
          gameId: data.game,
        })
        .match({ id: currentAd.id })
        .throwOnError();
      reset();
      handleScape();
      toast.success("Seu anúncio foi alterado com sucesso!");
    } catch (err) {
      toast.error("Ocorreu um erro! Tente novamente mais tarde.");
      console.error(err);
    }
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="flex items-center justify-center mt-auto py-3 col-span-2 rounded-md gap-2 bg-violet-500 hover:bg-violet-600 font-semibold custom-outline focus-visible:outline-violet-600">
        <Pencil size={24} />
        <span>Editar</span>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black/60 animate-fadeIn" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-8 px-10 bg-[#2A2634] rounded-lg focus:outline-none shadow-lg shadow-black/50 animate-dialogShow">
          <DialogPrimitive.Title className="md:text-3xl text-2xl md:text-left text-center font-black">
            Editar anúncio
          </DialogPrimitive.Title>
          <form
            className="flex flex-col gap-4 md:mt-8 mt-4"
            onSubmit={handleSubmit(updateAd)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="game">Qual o game?</Label>
              <Controller
                name="game"
                control={control}
                render={({ field: { onBlur, onChange, ref, value } }) => (
                  <SelectPrimitive.Root
                    onValueChange={onChange}
                    defaultValue={value}
                  >
                    <SelectPrimitive.Trigger
                      id="game"
                      className="flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm custom-outline focus:outline-violet-500"
                      aria-invalid={Boolean(errors.game)}
                      onBlur={onBlur}
                      ref={ref}
                    >
                      <SelectPrimitive.Value
                        placeholder={
                          <span className="text-zinc-500">
                            Selecione o game que deseja jogar
                          </span>
                        }
                      />
                      <SelectPrimitive.Icon>
                        <CaretDown size={24} className="text-zinc-400" />
                      </SelectPrimitive.Icon>
                    </SelectPrimitive.Trigger>
                    <Select />
                  </SelectPrimitive.Root>
                )}
              />

              <ErrorMessage message={errors.game?.message} />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Seu nome (ou nickname)</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Como te chamam dentro do game?"
                aria-invalid={Boolean(errors.name)}
              />
              <ErrorMessage message={errors.name?.message} />
            </div>
            <div className="flex md:flex-row flex-col gap-6 items-center">
              <div className="flex flex-col gap-2 flex-1 w-full mb-auto">
                <Label htmlFor="yearsPlaying">Joga há quantos anos?</Label>
                <Input
                  {...register("yearsPlaying", {
                    valueAsNumber: true,
                  })}
                  type="number"
                  id="yearsPlaying"
                  placeholder="Tudo bem ser ZERO"
                  aria-invalid={Boolean(errors.yearsPlaying)}
                />
                <ErrorMessage message={errors.yearsPlaying?.message} />
              </div>
              <div className="flex flex-col gap-2 w-full mb-auto">
                <Label htmlFor="description">Descrição</Label>
                <Input
                  {...register("description")}
                  id="description"
                  placeholder="Seu nível, rank ou patente"
                  aria-invalid={Boolean(errors.description)}
                />
                <ErrorMessage message={errors.description?.message} />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-6 items-center">
              <div className="flex flex-col gap-2 mb-auto">
                <Label htmlFor="weekDays">Quando costuma jogar?</Label>
                <Controller
                  name="weekDays"
                  control={control}
                  render={({ field: { onBlur, ref, value, onChange } }) => (
                    <ToggleGroup
                      onBlur={onBlur}
                      ref={ref}
                      value={value.map(String)}
                      onValueChange={(weekDays) => {
                        setValue("weekDays", weekDays.map(Number));
                        clearErrors("weekDays");
                      }}
                      onChange={onChange}
                      type="multiple"
                      className="flex gap-2"
                      aria-invalid={Boolean(errors.weekDays)}
                    >
                      <WeekDayButton
                        weekDay="D"
                        title="Domingo"
                        value="0"
                        weekDays={value.map(String)}
                      />
                      <WeekDayButton
                        value="1"
                        weekDay="S"
                        title="Segunda"
                        weekDays={value.map(String)}
                      />
                      <WeekDayButton
                        value="2"
                        weekDay="T"
                        title="Terça"
                        weekDays={value.map(String)}
                      />
                      <WeekDayButton
                        value="3"
                        weekDay="Q"
                        title="Quarta"
                        weekDays={value.map(String)}
                      />
                      <WeekDayButton
                        value="4"
                        weekDay="Q"
                        title="Quinta"
                        weekDays={value.map(String)}
                      />
                      <WeekDayButton
                        value="5"
                        weekDay="S"
                        title="Sexta"
                        weekDays={value.map(String)}
                      />
                      <WeekDayButton
                        value="6"
                        weekDay="S"
                        title="Sábado"
                        weekDays={value.map(String)}
                      />
                    </ToggleGroup>
                  )}
                />
                <ErrorMessage message={errors.weekDays?.message} />
              </div>
              <div className="flex flex-col gap-2 w-full mb-auto">
                <Label htmlFor="hourStart">Qual horário do dia?</Label>
                <div className="flex gap-2">
                  <div className="w-full">
                    <Input
                      {...register("hourStart")}
                      id="hourStart"
                      type="time"
                      placeholder="De"
                      aria-invalid={Boolean(errors.hourStart)}
                      className="w-full"
                    />
                    <ErrorMessage message={errors.hourStart?.message} />
                  </div>
                  <div className="w-full">
                    <Input
                      {...register("hourEnd")}
                      id="hourEnd"
                      type="time"
                      placeholder="Até"
                      aria-invalid={Boolean(errors.hourEnd)}
                      className="w-full"
                    />
                    <ErrorMessage message={errors.hourEnd?.message} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                defaultChecked={currentAd.useVoiceChannel}
                onCheckedChange={(e) => setValue("useVoiceChannel", Boolean(e))}
              />
              <label htmlFor="useVoiceChannel" className="text-sm">
                Costumo me conectar ao chat de voz
              </label>
            </div>
            <div className="flex justify-end items-center mt-4 gap-4">
              <DialogPrimitive.Close className="bg-zinc-500 rounded-md font-semibold py-3 px-5 hover:bg-zinc-600 custom-outline focus-visible:outline-zinc-500">
                Cancelar
              </DialogPrimitive.Close>
              <button
                type="submit"
                className="flex items-center font-semibold gap-3 bg-violet-500 rounded-md py-3 px-5 hover:bg-violet-600 custom-outline focus-visible:outline-violet-500"
              >
                <UploadSimple size={24} />
                Atualizar anúncio
              </button>
            </div>
          </form>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
