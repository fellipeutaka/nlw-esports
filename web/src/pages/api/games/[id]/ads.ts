import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@lib/prisma";
import { adSchema } from "@utils/adSchema";
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
    const {
      name,
      discord,
      weekDays,
      yearsPlaying,
      hourStart,
      hourEnd,
      useVoiceChannel,
    } = req.body;
    const bodyData = {
      game: gameId,
      name,
      discord,
      weekDays,
      yearsPlaying,
      hourStart,
      hourEnd,
      useVoiceChannel,
    };
    const schemaParse = adSchema.safeParse(bodyData);
    if (!schemaParse.success) {
      console.error(schemaParse.error.message);
      return res.status(400).json({ message: "Missing body params" });
    }

    const hourStartInMinutes = convertHourStringToMinutes(req.body.hourStart);
    const hourEndInMinutes = convertHourStringToMinutes(req.body.hourEnd);

    if (hourStartInMinutes >= hourEndInMinutes) {
      return res
        .status(400)
        .json({ message: "Hour start is greater than hour end" });
    }

    const ad = await prisma.ad.create({
      data: {
        gameId,
        name,
        discord,
        weekDays,
        yearsPlaying,
        hourStart: hourStartInMinutes,
        hourEnd: hourEndInMinutes,
        useVoiceChannel,
      },
    });
    return res.status(201).json({
      data: ad,
    });
  }
  return res.status(405).json({ message: "Invalid method" });
}
