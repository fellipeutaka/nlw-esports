import { prisma } from "@lib/prisma";

export async function getGames() {
  return await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
}
