import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const adId = req.query.id;
  if (req.method === "GET") {
    const { discord } = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id: String(adId),
      },
    });

    return res.status(200).json({
      data: discord,
    });
  }
  return res.status(405).json({ message: "Invalid method" });
}
