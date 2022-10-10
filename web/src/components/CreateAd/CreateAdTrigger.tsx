import { Trigger } from "@radix-ui/react-dialog";
import { MagnifyingGlassPlus } from "phosphor-react";

export function CreateAdTrigger() {
  return (
    <Trigger className="py-3 px-4 rounded-md bg-violet-500 hover:bg-violet-600 flex items-center gap-3 custom-outline focus-visible:outline-violet-500 sm:text-base text-sm" id="dialog">
      <MagnifyingGlassPlus size={24} />
      Publicar anúncio
    </Trigger>
  );
}
