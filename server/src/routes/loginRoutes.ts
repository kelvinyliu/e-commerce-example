import { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from "../models/User";

const router = Router()


router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return
        }

        // this is just for the example.
        const hashedPassword = await bcrypt.hash(password, 10);
        // replace with database search of email to retrieve password
        // then compare inputted and hashed to check for match.

        const exampleRetrievedUser: User = 
        {
            id: 1,
            name: "Joe",
            email: "example@example.com",
            password: hashedPassword,
            isAdmin: true,
        } 

        const matchedPass = await bcrypt.compare(password, exampleRetrievedUser.password)
        if (!matchedPass) {
            res.sendStatus(403)
            return
        }

        //debug
        // console.log(`password: ${password}, hashed: ${hashedPassword}`)

        // sign a jwt to store user data securely
        const token: string = jwt.sign(
            {
                id: exampleRetrievedUser.id,
                name: exampleRetrievedUser.name,
                email: exampleRetrievedUser.email,
                isAdmin: exampleRetrievedUser.isAdmin
            }, 
            process.env.JWT_SECRET as string,
            {
                expiresIn: '1h',
            }
        )

        res.json({token});
    } catch (error) {
        res.sendStatus(500)
    }
})


export default router