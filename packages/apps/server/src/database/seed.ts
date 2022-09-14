import { prisma } from "../lib/prisma";
import { getTopGames } from "../utils/getTopGames";

async function main() {
  await prisma.game.deleteMany();

  const data = await getTopGames();
  await prisma.game.createMany({
    data,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
