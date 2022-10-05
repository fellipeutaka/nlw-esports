import { MyAds } from "@@types/Ad";

import { displayHours } from "@utils/displayHours";
import { displayWeekDays } from "@utils/displayWeekDays";
import { displayYearsPlaying } from "@utils/displayYearsPlaying";

import { DeleteAdDialog } from "./Dialogs/DeleteAdDialog";
import { EditAdDialog } from "./Dialogs/EditAdDialog";

interface MyAdProps {
  data: MyAds;
}

export function MyAd({ data }: MyAdProps) {
  return (
    <div className="rounded-lg grid grid-cols-2 justify-center bg-[#2A2634] p-5 w-96 gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400">Jogo</span>
        <span className="font-bold">{data.game.name}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400">Nome</span>
        <span className="font-bold">{data.name}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400">Tempo de jogo</span>
        <span className="font-bold">
          {displayYearsPlaying(data.yearsPlaying)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400">Disponibilidade</span>
        <span className="font-bold">{displayWeekDays(data.weekDays)}</span>
        <span className="font-bold">
          {displayHours(data.hourStart, data.hourEnd)}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400">Descrição</span>
        <span className="font-bold">{data.description}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-zinc-400">Chamada de áudio?</span>
        <span
          className={`font-bold ${
            data.useVoiceChannel ? "text-emerald-400" : "text-red-600"
          }`}
        >
          {data.useVoiceChannel ? "Sim" : "Não"}
        </span>
      </div>
      <EditAdDialog data={data} />
      <DeleteAdDialog adId={data.id} />
    </div>
  );
}
