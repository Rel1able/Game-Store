import jwt from "jsonwebtoken"
async function authenticate(req: any, res: any, next: any){
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({message: "Missing token"});

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user:any) => {
        if (err) return res.status(403).json({message: "Invalid token"});
        req.user = user;
        next();
    } )
}

export default authenticate