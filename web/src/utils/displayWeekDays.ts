export function displayWeekDays(weekDays: number[]) {
  if (weekDays.length === 7) {
    return "Todos os dias da semana";
  }

  const weekDaysNames = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  const newWeekDays = weekDays.map((weekDay) => weekDaysNames[weekDay]);

  return newWeekDays
    .toString()
    .replaceAll(",", ", ")
    .replace(/,([^,]*)$/, " e" + "$1");
}
