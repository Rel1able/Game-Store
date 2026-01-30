import type { Request, Response } from "express";
import {prisma} from "../../lib/prisma"


async function purchaseGame(req: any, res: Response){
    try{
        const userId = req.user.id;
        const {gamesIds} = req.body;
        if (!gamesIds || !Array.isArray(gamesIds) || gamesIds.length === 0){
            return res.status(400).json({ error: "No game IDs provided" });
        }
        const data = gamesIds.map((externalGameId: string) => ({
            userId,
            externalGameId,
        }));

        const purchasedGames = await prisma.userGame.createMany({
            data,
            skipDuplicates: true
        })
        res.status(201).json({
            message: `${purchasedGames.count} game(s) added to library`
        })
    }catch(err: any){
        res.status(400).json({error: err.message})
    }
}

export {purchaseGame}