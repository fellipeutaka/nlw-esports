import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const adId = String(req.query.id);
  if (!adId) {
    return res.status(400).json({ message: "Missing ad id" });
  }

  if (req.method === "GET") {
    const ad = await prisma.ad.findUnique({
      select: {
        discord: true,
      },
      where: {
        id: adId,
      },
    });

    if (!ad) {
      return res.status(404).json({ message: "Ad not found" });
    }

    const { discord } = ad;

    return res.status(200).json({
      data: discord,
    });
  }
  return res.status(405).json({ message: "Invalid method" });
}
