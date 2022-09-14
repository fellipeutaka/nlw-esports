import { Router } from "express";

import { prisma } from "./lib/prisma";
import { convertHourStringToMinutes } from "./utils/convertHourStringToMinutes";
import { convertMinutesToHourString } from "./utils/convertMinutesToHourString";

const router = Router();

router.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });
  return res.json({
    data: games,
  });
});

router.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: req.body.name,
      discord: req.body.discord,
      weekDays: req.body.weekDays,
      yearsPlaying: req.body.yearsPlaying,
      hourStart: convertHourStringToMinutes(req.body.hourStart),
      hourEnd: convertHourStringToMinutes(req.body.hourEnd),
      useVoiceChannel: req.body.useVoiceChannel,
    },
  });
  return res.status(201).json({
    data: ad,
  });
});

router.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
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

  return res.json({
    data: ads.map((ad) => ({
      ...ad,
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    })),
  });
});

router.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;

  const { discord } = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.json({
    data: discord,
  });
});

export { router };
