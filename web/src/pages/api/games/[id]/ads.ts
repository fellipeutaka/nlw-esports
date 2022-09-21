import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";
import { convertHourStringToMinutes } from "@utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "@utils/convertMinutesToHourString";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gameId = String(req.query.id);
  if (req.method === "GET") {
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        yearsPlaying: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        useVoiceChannel: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: ads.map((ad) => ({
        ...ad,
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      })),
    });
  }
  if (req.method === "POST") {
    const hourStart = convertHourStringToMinutes(req.body.hourStart);
    const hourEnd = convertHourStringToMinutes(req.body.hourEnd);

    if (hourStart >= hourEnd) {
      return res
        .status(400)
        .json({ message: "Hour start is greater than hour end" });
    }

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: req.body.name,
        discord: req.body.discord,
        weekDays: req.body.weekDays,
        yearsPlaying: req.body.yearsPlaying,
        hourStart,
        hourEnd,
        useVoiceChannel: req.body.useVoiceChannel,
      },
    });
    return res.status(201).json({
      data: ad,
    });
  }
  return res.status(405).json({ message: "Invalid method" });
}
