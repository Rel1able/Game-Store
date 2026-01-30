import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {prisma} from "../../lib/prisma"

async function register(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {email, password: hashedPassword}
        });
        res.json({id: user.id, email: user.email});
    }catch(err: any){
        res.status(400).json({error: err.message})
    }
};

async function login(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) return res.status(400).json({message: "Invalid credentials"});

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET as string, {
            expiresIn: "1h",
        });
        res.json({token});
    }catch(err: any){
        res.status(400).json({error: err.message});
    }
}

export {register, login}