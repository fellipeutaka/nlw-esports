import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
    return res.status(200).json({
      data: games,
    });
  }
  return res.status(405).json({ message: "Invalid method" });
}
