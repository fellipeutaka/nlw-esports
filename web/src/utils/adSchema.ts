import { z } from "zod";

export const adSchema = z.object({
  game: z.string().trim().min(1, "Jogo é obrigatório!"),
  name: z.string().trim().min(1, "Nome é obrigatório!"),
  yearsPlaying: z
    .number({
      required_error: "Anos jogados é obrigatório!",
      invalid_type_error: "Anos jogados deve ser um número!",
    })
    .int("Anos jogados deve ser um número inteiro!")
    .nonnegative("Anos jogados não podem ser negativos!"),
  description: z
    .string()
    .trim()
    .min(1, "Descrição é obrigatória!")
    .max(48, "Descrição muito longa!"),
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
