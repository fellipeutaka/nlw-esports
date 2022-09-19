import { getGames } from "@services/getGames";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const games = await getGames();
    return res.status(200).json({
      data: games,
    });
  }
  return res.status(405).json({ message: "Invalid method" });
}
